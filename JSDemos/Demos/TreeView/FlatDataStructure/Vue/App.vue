<template>
  <div class="form">
    <DxTreeView
      id="simple-treeview"
      :items="products"
      :width="300"
      data-structure="plain"
      parent-id-expr="categoryId"
      key-expr="ID"
      display-expr="name"
      @item-click="selectItem"
    />
    <div
      v-if="currentItem.price"
      id="product-details"
    >
      <img
        :alt="currentItem.name"
        :src="currentItem.icon"
      >
      <div class="name">{{ currentItem.name }}</div>
      <div class="price">{{ "$" + currentItem.price }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DxTreeView from 'devextreme-vue/tree-view';
import service from './data.js';

const products = service.getProducts();
const currentItem = ref(products[0]);

function selectItem({ itemData }) {
  currentItem.value = itemData;
}
</script>
<style scoped>
#simple-treeview,
#product-details {
  display: inline-block;
}

#product-details {
  vertical-align: top;
  width: 400px;
  height: 420px;
  margin-left: 20px;
}

#product-details > img {
  border: none;
  height: 300px;
  width: 400px;
}

#product-details > .name {
  text-align: center;
  font-size: 20px;
}

#product-details > .price {
  text-align: center;
  font-size: 24px;
}

.dark #product-details > div {
  color: #f0f0f0;
}

.hidden {
  visibility: hidden;
}
</style>
