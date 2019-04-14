<template>
  <div class="server">
    <template v-if="data">
      <p class="hostname">
        {{ displayAddress }}
      </p>
      <p class="subtitle">{{ queryTime }}</p>
      <ul class="gpu-list">
        <li class="gpu" v-for="gpu in data.gpus" :key="gpu.index">
          <gpu :gpu-status="gpu"/>
        </li>
      </ul>
      <table class="process-table">
        <caption>进程列表</caption>
        <thead>
          <tr>
            <td>PID</td>
            <td class="user-col">用户</td>
            <td class="name-col">进程名</td>
            <td>显存使用(MiB)</td>
            <td>GPU</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="gpu in data.gpus">
            <tr v-for="p in gpu.processes" :key="`${gpu.index}-${p.pid}`">
              <td>{{p.pid}}</td>
              <td class="user-col" :title="p.username">{{p.username}}</td>
              <td class="name-col" :title="p.command">{{p.name}}</td>
              <td>{{(p.gpuMemoryUsage / 1024 / 1024).toFixed(1)}}</td>
              <td>{{gpu.index}}</td>
            </tr>
          </template>
        </tbody>
      </table>
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
  width: 320px;
}

thead {
  font-weight: bold;
}

.hostname {
  font-size: 1.5em;
  font-weight: bold;
}

.gpu-list {
  padding-inline-start: 0;

  .gpu {
    list-style: none;
  }
}

.process-table {
  width: 100%;
  .user-col {
    max-width: 80px;
  }
  .name-col {
    max-width: 70px;
  }
  td {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
