<template>
  <div>
    <h1>GPU服务器仪表盘/h1>
    <div class="server-container">
      <server v-for="addr in addresses" :key="addr" :address="addr"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Server from '@/components/Server.vue';
import { addresses } from '@/config';

export default Vue.extend({
  name: 'home',
  components: {
    Server,
  },
  data() {
    return {
      addresses,
    };
  },
});
</script>

<style lang="scss" scoped>
.server-container {
  display: flex;
  flex-flow: row wrap;
}
</style>
