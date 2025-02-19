<template>
  <DxDiagram
    id="diagram"
    ref="diagram"
    @request-edit-operation="onRequestEditOperation"
    @request-layout-update="onRequestLayoutUpdate"
  >
    <DxCustomShape
      :category="'items'"
      :type="'root'"
      :base-type="'octagon'"
      :default-text="'Development'"
    />
    <DxCustomShape
      :category="'items'"
      :type="'team'"
      :base-type="'ellipse'"
      :title="'Team'"
      :default-text="'Team Name'"
    />
    <DxCustomShape
      :category="'items'"
      :type="'employee'"
      :base-type="'rectangle'"
      :title="'Employee'"
      :default-text="'Employee Name'"
    />
    <DxNodes
      :data-source="orgItemsDataSource"
      :key-expr="'ID'"
      :text-expr="'Name'"
      :type-expr="'Type'"
      :parent-key-expr="'ParentID'"
      :style-expr="itemStyleExpr"
    >
      <DxAutoLayout
        :type="'tree'"
      />
    </DxNodes>
    <DxContextToolbox
      :shape-icons-per-row="2"
      :width="100"
      :shapes="['team', 'employee']"
    />
    <DxToolbox
      :shape-icons-per-row="2"
    >
      <DxGroup
        :title="'Items'"
        :shapes="['team', 'employee']"
      />
    </DxToolbox>
    <DxPropertiesPanel
      :visibility="'disabled'"
    />
  </DxDiagram>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  DxDiagram,
  DxCustomShape,
  DxNodes,
  DxAutoLayout,
  DxContextToolbox,
  DxToolbox,
  DxPropertiesPanel,
  DxGroup,
} from 'devextreme-vue/diagram';
import notify from 'devextreme/ui/notify';
import ArrayStore from 'devextreme/data/array_store';
import service from './data.js';

const orgItemsDataSource = new ArrayStore({
  key: 'ID',
  data: service.getOrgItems(),
});
const diagram = ref();

const itemStyleExpr = ({ Type }) => ({
  fill: {
    root: '#ffcfc3',
    team: '#b7e3fe',
  }[Type] || '#bbefcb',
}
);
function showToast(text) {
  notify({
    position: {
      at: 'top', my: 'top', of: '#diagram', offset: '0 4',
    },
    message: text,
    type: 'warning',
    delayTime: 2000,
  });
}
function onRequestLayoutUpdate(e) {
  for (let i = 0; i < e.changes.length; i += 1) {
    if (e.changes[i].type === 'remove') {
      e.allowed = true;
    } else if (e.changes[i].data.ParentID !== undefined
      && e.changes[i].data.ParentID !== null) {
      e.allowed = true;
    }
  }
}
function onRequestEditOperation(e) {
  let i;

  if (e.operation === 'addShape') {
    if (e.args.shape.type !== 'employee' && e.args.shape.type !== 'team') {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('You can add only a \'Team\' or \'Employee\' shape.');
      }
      e.allowed = false;
    }
  } else if (e.operation === 'deleteShape') {
    if (e.args.shape.type === 'root') {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('You cannot delete the \'Development\' shape.');
      }
      e.allowed = false;
    }
    if (e.args.shape.type === 'team') {
      const connectorIds = e.args.shape.attachedConnectorIds;
      for (i = 0; i < connectorIds.length; i += 1) {
        if (diagram.value.instance.getItemById(connectorIds[i]).toId !== e.args.shape.id) {
          if (e.reason !== 'checkUIElementAvailability') {
            showToast('You cannot delete a \'Team\' shape that has a child shape.');
          }
          e.allowed = false;
          break;
        }
      }
    }
  } else if (e.operation === 'resizeShape') {
    if (e.args.newSize.width < 1 || e.args.newSize.height < 0.75) {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('The shape size is too small.');
      }
      e.allowed = false;
    }
  } else if (e.operation === 'changeConnection') {
    const shapeType = e.args.newShape && e.args.newShape.type;
    if (shapeType === 'root' && e.args.connectorPosition === 'end') {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('The \'Development\' shape cannot have an incoming connection.');
      }
      e.allowed = false;
    }
    if (shapeType === 'employee' && e.args.connectorPosition === 'start') {
      e.allowed = false;
    }
  } else if (e.operation === 'changeConnectorPoints') {
    if (e.args.newPoints.length > 2) {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('You cannot add points to a connector.');
      }
      e.allowed = false;
    }
  } else if (e.operation === 'beforeChangeShapeText') {
    if (e.args.shape.type === 'root') {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('You cannot change the \'Development\' shape\'s text.');
      }
      e.allowed = false;
    }
  } else if (e.operation === 'changeShapeText') {
    if (e.args.text === '') {
      if (e.reason !== 'checkUIElementAvailability') {
        showToast('A shape text cannot be empty.');
      }
      e.allowed = false;
    }
  } else if (e.operation === 'beforeChangeConnectorText') {
    e.allowed = false;
  }
}
</script>
<style scoped>
    #diagram {
      height: 600px;
    }
</style>
