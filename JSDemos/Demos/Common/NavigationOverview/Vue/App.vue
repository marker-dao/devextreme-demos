<template>
  <div class="container">
    <div class="left-content">
      <DxTreeView
        :data-source="continents"
        :select-by-click="true"
        selection-mode="single"
        @item-selection-changed="changeSelection"
      />
    </div>
    <div class="right-content">
      <div class="title-container">
        <img
          alt="country flag"
          :src="countryData.flag"
          class="flag"
        >
        <div>
          <div class="country-name">{{ countryData.fullName }}</div>
          <div>{{ countryData.description }}</div>
        </div>
      </div>

      <div class="stats">
        <div>
          <div class="sub-title">Area, km<sup>2</sup></div>
          <div class="stat-value">{{ countryData.area }}</div>
        </div>
        <div>
          <div class="sub-title">Population</div>
          <div class="stat-value">{{ countryData.population }}</div>
        </div>
        <div>
          <div class="sub-title">GDP, billion</div>
          <div class="stat-value">{{ "$" + countryData.gdp }}</div>
        </div>
      </div>

      <div class="sub-title">Largest cities</div>
      <DxTabPanel
        id="tabpanel"
        v-model:selected-index="tabPanelIndex"
        :data-source="citiesData"
        :animation-enabled="true"
        item-title-template="title"
        item-template="cityTemplate"
      >
        <template #title="{ data: item }">
          <span class="tab-panel-title">{{ item.text }}</span>
        </template>
        <template #cityTemplate="{ data: city }">
          <div>
            <img
              alt="country flag"
              :src="city.flag"
              class="flag"
            >
            <div class="right-content">
              <div><b>{{ (city.capital) ? "Capital. " : "" }}</b>{{ city.description }}</div>
              <div class="stats">
                <div>
                  <div>Population</div>
                  <div><b>{{ city.population }} people</b></div>
                </div>
                <div>
                  <div>Area</div>
                  <div><b>{{ city.area }} km<sup>2</sup></b></div>
                </div>
                <div>
                  <div>Density</div>
                  <div><b>{{ city.density }}/km<sup>2</sup></b></div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DxTabPanel>
    </div>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import DxTabPanel from 'devextreme-vue/tab-panel';
import DxTreeView from 'devextreme-vue/tree-view';
import { continents } from './data.js';

const tabPanelIndex = ref(0);
const countryData = ref(continents[0].items[0]);
const citiesData = ref(continents[0].items[0].cities);

function changeSelection({ itemData }) {
  if (itemData.cities) {
    countryData.value = itemData;
    citiesData.value = itemData.cities;
    tabPanelIndex.value = 0;
  }
}
</script>
<style src="./styles.css"></style>
