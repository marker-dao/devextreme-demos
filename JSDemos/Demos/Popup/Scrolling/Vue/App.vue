<template>
  <div>
    <div class="demo-container">
      <div class="button-container">
        <DxButton
          :width="300"
          text="Show Popup"
          type="default"
          @click="showPopup()"
        />
        <div class="label"> A native scrollable container </div>
      </div>

      <div class="button-container">
        <DxButton
          :width="300"
          text="Show Popup"
          @click="showPopupWithScrollView()"
        />
        <div class="label"> The ScrollView </div>
      </div>
    </div>
    <DxPopup
      v-model:visible="popupVisible"
      :width="360"
      :height="320"
      :hide-on-outside-click="true"
      :show-close-button="true"
      title="Downtown Inn"
    >
      <template #content>
        <div>
          <div class="caption">Description</div>
          In the heart of LA's business district, the Downtown Inn has a welcoming staff
          and award winning restaurants that remain open 24 hours a day.
          Use our conference room facilities to conduct meetings and have a drink
          at our beautiful rooftop bar.
          <br><br>
          <div class="content">
            <div>
              <div class="caption">Features</div>
              <div>Concierge</div>
              <div>Restaurant</div>
              <div>Valet Parking</div>
              <div>Fitness Center</div>
              <div>Sauna</div>
              <div>Airport Shuttle</div>
            </div>
            <div>
              <div class="caption">Rooms</div>
              <div>Climate control</div>
              <div>Air conditioning</div>
              <div>Coffee/tea maker</div>
              <div>Iron/ironing</div>
            </div>
          </div>
        </div>
      </template>
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="center"
        :options="bookButtonOptions"
      />
    </DxPopup>

    <DxPopup
      v-model:visible="popupWithScrollViewVisible"
      :width="360"
      :height="320"
      :hide-on-outside-click="true"
      :show-close-button="true"
      title="Downtown Inn"
    >
      <template #content>
        <DxScrollView
          width="100%"
          height="100%"
        >
          <div class="caption">Description</div>
          In the heart of LA's business district, the Downtown Inn has a welcoming staff
          and award winning restaurants that remain open 24 hours a day.
          Use our conference room facilities to conduct meetings and have a drink
          at our beautiful rooftop bar.
          <br><br>
          <div class="content">
            <div>
              <div class="caption">Features</div>
              <div>Concierge</div>
              <div>Restaurant</div>
              <div>Valet Parking</div>
              <div>Fitness Center</div>
              <div>Sauna</div>
              <div>Airport Shuttle</div>
            </div>
            <div>
              <div class="caption">Rooms</div>
              <div>Climate control</div>
              <div>Air conditioning</div>
              <div>Coffee/tea maker</div>
              <div>Iron/ironing</div>
            </div>
          </div>
        </DxScrollView>
      </template>
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="center"
        :options="bookButtonOptions"
      />
    </DxPopup>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';

const popupVisible = ref(false);
const popupWithScrollViewVisible = ref(false);
const bookButtonOptions = {
  width: 300,
  text: 'Book',
  type: 'default',
  stylingMode: 'contained',
  onClick: () => {
    popupVisible.value = false;
    popupWithScrollViewVisible.value = false;
  },
};

function showPopup() {
  popupVisible.value = true;
}
function showPopupWithScrollView() {
  popupWithScrollViewVisible.value = true;
}
</script>
<style>
.label {
  color: rgba(51, 51, 51, 0.6);
  font-size: 12px;
}

.demo-container {
  height: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
}

.button-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.dx-popup-content {
  font-size: 12px;
}

.caption {
  padding-bottom: 8px;
  font-weight: 500;
}

.content {
  display: flex;
  justify-content: space-between;
}
</style>
