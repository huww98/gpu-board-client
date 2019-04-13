<template>
  <div>
    <div>
      <span class="index">GPU{{gpuStatus.index}}</span>
      <span class="name">{{gpuStatus.name}}</span>
    </div>
    <div>
      <progress
        class="memory-usage"
        :value="gpuStatus.usedMemory"
        :max="gpuStatus.totalMemory"
        :title="memoryUsage"
      />
      <span>使用率：{{ gpuUtilization }}</span>
    </div>
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import { GPUStatus } from '../api';

function toMiB(b: number) {
  return b / 1024 / 1024;
}

export default Vue.extend({
  props: {
    gpuStatus: Object as () => GPUStatus,
  },
  computed: {
    memoryUsage(): string {
      return `${toMiB(this.gpuStatus.usedMemory).toFixed(1)}/${toMiB(this.gpuStatus.totalMemory).toFixed(1)} MiB`;
    },
    gpuUtilization(): string {
      return this.gpuStatus.gpuUtilization.toFixed(1) + '%';
    },
  },
});
</script>

<style lang="scss" scoped>
.index {
  margin-right: 10px;
  font-weight: bold;
}

progress.memory-usage {
  appearance: none;
  border: 0;
  $width: 10em;
  width: $width;
  margin-right: 5px;

  $barColor: #0002;
  $valueColor: linear-gradient(to right, green, red $width);
  background: $barColor;
  color: $valueColor;

  &::-webkit-progress-bar {
    background: $barColor
  }

  &::-webkit-progress-value,
  &::-moz-progress-bar {
    background: $valueColor
  }
}
</style>
