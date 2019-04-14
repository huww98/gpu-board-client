<template>
  <div>
    <h1>GPU服务器仪表盘</h1>
    <div class="server-container" v-if="addresses">
      <server v-for="addr in addresses" :key="addr" :address="addr"/>
    </div>
    <p v-else>正在加载配置...</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Server from '@/components/Server.vue';
import { fetchConfig } from '@/api';

export default Vue.extend({
  name: 'home',
  components: {
    Server,
  },
  data() {
    return {
      addresses: null as null | string[],
    };
  },
  async created() {
    this.addresses = (await fetchConfig()).servers;
  },
});
</script>

<style lang="scss" scoped>
.server-container {
  display: flex;
  flex-flow: row wrap;
}
</style>
