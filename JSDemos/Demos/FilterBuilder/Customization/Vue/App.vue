<template>
  <div>
    <DxFilterBuilder
      :fields="fields"
      :value="filter"
      :group-operations="groupOperations"
      @initialized="updateTexts"
      @value-changed="updateTexts"
    >
      <DxCustomOperation
        :calculate-filter-expression="calculateFilterExpression"
        name="anyof"
        caption="Is any of"
        icon="check"
        editor-template="editorComponentTemplate"
      />
      <template #editorComponentTemplate="{ data: conditionInfo }">
        <EditorComponent :condition-info="conditionInfo"/>
      </template>
    </DxFilterBuilder>
    <div class="results">
      <div>
        <b>Value</b>
        <pre>{{ filterText }}</pre>
      </div>
      <div>
        <b>DataSource&apos;s filter expression</b>
        <pre>{{ dataSourceText }}</pre>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DxFilterBuilder, { DxCustomOperation } from 'devextreme-vue/filter-builder';
import { filter, fields } from './data.js';
import { formatValue } from './helpers.js';
import EditorComponent from './EditorComponent.vue';

const filterText = ref('');
const groupOperations = ['and', 'or'];
const dataSourceText = ref('');

function updateTexts(e) {
  filterText.value = formatValue(e.component.option('value'));
  dataSourceText.value = formatValue(e.component.getFilterExpression());
}
function calculateFilterExpression(filterValue, field) {
  return filterValue && filterValue.length
    && Array.prototype.concat.apply([], filterValue.map((value) => [[field.dataField, '=', value], 'or'])).slice(0, -1);
}
</script>
<style scoped>
.results {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}

.results > div {
  flex-basis: 49%;
  max-width: 50%;
  background-color: rgba(191, 191, 191, 0.15);
  position: relative;
}

.results b {
  position: absolute;
  top: -25px;
}

.results pre {
  padding: 10px 20px;
  height: 100%;
  font-size: 13px;
  overflow: auto;
  box-sizing: border-box;
}

.dx-tagbox {
  min-width: 150px;
}

.dx-filterbuilder {
  background-color: transparent;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  padding: 15px;
  margin: 24px;
}

.dx-filterbuilder .dx-numberbox {
  width: 80px;
}
</style>
