<template>
  <div>
    <DxTreeView
      id="treeview"
      :items="products"
      :width="500"
      :search-enabled="true"
      :search-mode="searchMode"
    />
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Search mode</span>
        <DxSelectBox
          :items="options"
          :input-attr="{ 'aria-label': 'Search Mode' }"
          v-model:value="searchMode"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DxTreeView from 'devextreme-vue/tree-view';
import DxSelectBox from 'devextreme-vue/select-box';
import { products } from './data.js';

const options = ['contains', 'startswith', 'equals'];
const searchMode = ref('contains');
</script>
<style scoped>
#treeview {
  height: 400px;
}

.options {
  padding: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 260px;
  top: 0;
  background-color: #f5f5f5;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.option > .dx-selectbox {
  display: inline-block;
  vertical-align: middle;
  max-width: 350px;
  width: 100%;
  margin-top: 5px;
}
</style>
