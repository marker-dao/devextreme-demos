<template>
  <div class="tabpanel-demo">
    <div class="widget-container">
      <DxTabPanel
        class="dx-theme-background-color"
        width="100%"
        height="418"
        item-template="tabPanelItem"
        :animation-enabled="true"
        :swipe-enabled="true"
        :data-source="dataSource"
        :tabs-position="tabsPosition"
        :styling-mode="stylingMode"
        :icon-position="iconPosition"
        :show-nav-buttons="showNavButtons"
      >
        <template #tabPanelItem="{ data }">
          <TabPanelItem
            :tasks="data.tasks"
          />
        </template>
      </DxTabPanel>
    </div>

    <div class="options">
      <div class="caption">Options</div>

      <div class="option">
        <div class="option-label">Tab position</div>

        <DxSelectBox
          v-model:value="tabsPosition"
          :input-attr="tabsPositionsSelectBoxLabel"
          :items="tabsPositions"
        />
      </div>

      <div class="option">
        <div class="option-label">Styling mode</div>

        <DxSelectBox
          v-model:value="stylingMode"
          :input-attr="stylingModesSelectBoxLabel"
          :items="stylingModes"
        />
      </div>

      <div class="option">
        <div class="option-label">Icon position</div>

        <DxSelectBox
          v-model:value="iconPosition"
          :input-attr="iconPositionsSelectBoxLabel"
          :items="iconPositions"
        />
      </div>

      <div class="option">
        <DxCheckBox
          text="Show navigation buttons"
          v-model:value="showNavButtons"
          :element-attr="navButtonsCheckBoxLabel"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DxTabPanel from 'devextreme-vue/tab-panel';
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';
import TabPanelItem from './TabPanelItem.vue';
import {
  tabsPositionsSelectBoxLabel,
  tabsPositions,
  stylingModesSelectBoxLabel,
  stylingModes,
  iconPositionsSelectBoxLabel,
  iconPositions,
  navButtonsCheckBoxLabel,
  dataSource,
} from './data.js';

const tabsPosition = ref(tabsPositions[0]);
const stylingMode = ref(stylingModes[0]);
const iconPosition = ref(iconPositions[0]);
const showNavButtons = ref(true);
</script>

<style>
.tabpanel-demo {
  display: flex;
  height: 100%;
}

.widget-container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  min-width: 360px;
  padding: 16px 32px;
}

.dx-theme-material .widget-container {
  background-color: rgba(191, 191, 191, 0.15);
}

.dx-tabpanel-tabs-position-left .dx-tabpanel-container,
.dx-tabpanel-tabs-position-right .dx-tabpanel-container {
  width: 0;
}

.dx-viewport:not(.dx-theme-generic) .dx-tabpanel {
  border-radius: 8px;
  overflow: clip;
}

.dx-tabs-vertical {
  min-width: 120px;
}

.options {
  display: inline-flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-weight: 500;
  font-size: 18px;
}

.option {
  margin-top: 20px;
}
</style>
