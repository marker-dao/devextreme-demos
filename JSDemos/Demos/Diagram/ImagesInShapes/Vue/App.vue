<template>
  <DxDiagram
    id="diagram"
    ref="diagram"
  >
    <DxNodes
      :data-source="orgItemsDataSource"
      :image-url-expr="'picture'"
    >
      <DxAutoLayout
        :type="'tree'"
        :orientation="'horizontal'"
      />
    </DxNodes>
    <DxEdges :data-source="orgLinksDataSource"/>
    <DxToolbox>
      <DxGroup
        :category="'general'"
        :title="'General'"
      />
      <DxGroup
        :category="'orgChart'"
        :title="'Organizational Chart'"
        :expanded="true"
      />
    </DxToolbox>
  </DxDiagram>
</template>
<script setup lang="ts">
import {
  DxDiagram, DxNodes, DxAutoLayout, DxEdges, DxToolbox, DxGroup,
} from 'devextreme-vue/diagram';
import ArrayStore from 'devextreme/data/array_store';
import service from './data.js';

const orgItemsDataSource = new ArrayStore({
  key: 'id',
  data: service.getOrgItems(),
});
const orgLinksDataSource = new ArrayStore({
  key: 'id',
  data: service.getOrgLinks(),
});
</script>
<style scoped>
    #diagram {
      height: 900px;
    }
</style>
