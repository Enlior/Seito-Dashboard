<template>
  <div class="content no-selected">
    <Header/>
    <Dashboard/>
  </div>
</template>

<script setup>
import Header from '@/components/header/Header.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'
</script>

<style>
.content {
  height: 100%;
  overflow: hidden;
}
</style>

