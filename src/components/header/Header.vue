<template>
  <div class="header-container clearfix">
    <HeaderLeft />
    <HeaderRight />
  </div>
</template>

<script setup>
// import { onMounted} from 'vue';
import HeaderLeft from "./HeaderLeft.vue";
import HeaderRight from "./HeaderRight.vue";
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 47px;
  border-bottom: 1px solid #000;
  background-color: #25282f;
  color: #FFFFFF;
  padding: 0 20px;
}
</style>
