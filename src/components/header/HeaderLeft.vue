<template>
  <div class="header-left">
    <div class="logo-header-seito"><img :src="logoImg" /></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import logoImg from "@/assets/images/seito-white-logo.png";

onMounted(() => {});
</script>

<style scoped>
.header-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-header-seito {
  display: flex;
  width: auto;
  height: 28px;
  object-fit: contain;
  -o-object-fit: contain;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 6px 5px;
  margin-left: 1em;
  margin-right: 0.5em;
  font-size: var(--font-size);
  border: 1px solid #000;
  border-radius: 5px;
  gap: 0.5em;
}
.user-img {
  width: auto;
  height: 80%;
  object-fit: contain;
}
.login-time {
  margin-left: 20px;
}
.hearder-dropdown-btn {
  display: flex;
  margin-left: 0.5em;
  cursor: pointer;
}
.header-right-btn {
  display: flex;
  padding: 0;
}

.header-right-btn-img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}
</style>
