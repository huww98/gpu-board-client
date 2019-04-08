<template>
  <div>
    <template v-if="data">
      <p class="title">{{ data.hostname }}</p>
      <p class="subtitle">{{ queryTime }}</p>
      <ul class="gpu-list">
        <li class="gpu" v-for="gpu in data.gpus" :key="gpu.index">
          <gpu :gpu-status="gpu"/>
        </li>
      </ul>
    </template>
    <template v-else>
      <h1>Loading</h1>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GPU from './GPU.vue';
import { GPUData, GPUStatusPublisher } from '@/api';
import { mapState } from 'vuex';

export default Vue.extend({
  components: {
    gpu: GPU,
  },
  props: {
    address: String,
  },
  data() {
    return {
      publisher: null as null | GPUStatusPublisher,
    };
  },
  computed: {
    data(): GPUData {
      return this.$store.state.gpuData[this.address];
    },
    queryTime(): string {
      return new Date(this.data.queryTime).toLocaleString();
    },
  },
  mounted() {
    this.publisher = new GPUStatusPublisher(this.address);
    this.publisher.onGPUStatusUpdated((data) => {
      this.$store.commit('gpuData.update', { address: this.address, data });
    });
  },
  destroyed() {
    if (this.publisher) {
      this.publisher.close();
    }
  },
});
</script>

<style lang="scss" scoped>
.gpu-list {
  padding-inline-start: 0;

  .gpu {
    list-style: none;
  }
}

</style>
