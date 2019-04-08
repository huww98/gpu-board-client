<template>
  <div class="server">
    <template v-if="data">
      <p>
        <span class="hostname">{{ data.hostname }}</span>
        <span>{{ displayAddress }}</span>
      </p>
      <p class="subtitle">{{ queryTime }}</p>
      <ul class="gpu-list">
        <li class="gpu" v-for="gpu in data.gpus" :key="gpu.index">
          <gpu :gpu-status="gpu"/>
        </li>
      </ul>
      <p>
        进程列表：
        <table>
          <thead>
            <tr>
              <td>PID</td>
              <td>用户</td>
              <td>进程名</td>
              <table>GPU</table>
            </tr>
          </thead>
          <tbody>
            <template v-for="gpu in data.gpus">
              <tr v-for="p in gpu.processes" :key="`${gpu.index}-${p.pid}`">
                <td>{{p.pid}}</td>
                <td>{{p.username}}</td>
                <td>{{p.command}}</td>
                <td>{{gpu.index}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </p>
    </template>
    <template v-else>
      <p>
        等待来自{{address}}的数据
      </p>
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
    displayAddress(): string {
      return this.address.split(':')[0];
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
.server {
  margin: 15px;
  width: 300px;
}

thead {
  font-weight: bold;
}

.hostname {
  font-size: 1.5em;
  font-weight: bold;
  margin-right: 10px;
}

.gpu-list {
  padding-inline-start: 0;

  .gpu {
    list-style: none;
  }
}

</style>
