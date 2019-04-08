<template>
  <div>
    <server v-for="addr in addresses" :key="addr" :address="addr"/>
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
