<template>
  <DxPieChart
    id="pie"
    :data-source="data"
    :customize-point="customizePoint"
  >
    <DxSeries
      argument-field="type"
      value-field="value"
    >
      <DxLabel
        :visible="true"
        :customize-text="customizeText"
      >
        <DxConnector :visible="true"/>
      </DxLabel>
    </DxSeries>
    <DxExport :enabled="true"/>
  </DxPieChart>
</template>
<script setup lang="ts">
import DxPieChart, {
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport,
} from 'devextreme-vue/pie-chart';
import {
  getStrokePattern,
  getSquarePattern,
  getLinearGradient,
  getRadialGradient,
  getPatternImage,
} from './utils.js';
import { data } from './data.js';

function customizePoint(point) {
  const color = point.series.getPointsByArg(point.argument)[0].getColor();
  let fillId;
  switch (point.argument) {
    case 'Stripes':
      fillId = getStrokePattern(color);
      break;
    case 'Grid':
      fillId = getSquarePattern(color);
      break;
    case 'Linear Gradient':
      fillId = getLinearGradient(color);
      break;
    case 'Radial Gradient':
      fillId = getRadialGradient(color);
      break;
    case 'Image':
      fillId = getPatternImage(color);
      break;
    default:
      break;
  }

  return { color: { fillId } };
}
const customizeText = ({ argument }) => argument;
</script>

<style>
#pie {
  height: 440px;
}
</style>
