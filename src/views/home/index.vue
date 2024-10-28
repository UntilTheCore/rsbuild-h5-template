<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import {useCounterStore} from '@/store/conunterStore';

const counterStore = useCounterStore();

defineOptions({
  name: 'Home'
});

const state = reactive({});

onMounted(() => {

});
</script>

<template>
  <div class="home flex justify-center items-center h-screen">
    <div class="home-wrap flex flex-col justify-center items-center">
      <div class="mb-4 text-6">store: {{ counterStore.counter }}</div>
      <van-button type="primary" @click.stop="counterStore.increment()">increment</van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
}
</style>
