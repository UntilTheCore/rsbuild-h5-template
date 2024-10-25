<script setup lang="ts">
import { onMounted, reactive } from 'vue';

defineOptions({
  name: 'Home'
});

const state = reactive({});

onMounted(() => {

});
</script>

<template>
  <div class="home font-300 mt-36">
    <h1>home</h1>
    <van-button type="primary" >按钮</van-button>
  </div>
</template>

<style scoped lang="scss">
.home {
}
</style>
