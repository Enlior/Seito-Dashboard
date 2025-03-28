<template>
  <BasicContainer>
    <!-- <template #sidebar> -->
      <!-- <Sidebar :data="menuData" /> -->
    <!-- </template> -->
    <!-- <div class="content"> -->
      <!-- <router-view /> -->
    <!-- </div> -->
  </BasicContainer>
</template>

<script setup>
import{reactive} from 'vue'
// import BasicContainer from "SeitoFrontendComponent";
// import Sidebar from "SeitoFrontendComponent";
// import { defineAsyncComponent } from 'vue';
// import {PageTable} from SeitoFrontendComponent
// import { SidebarMenu } from "seito-frontend-component-library";
// export default {
//   name: 'App',
//   components: {
//    SidebarMenu
//     // PageTable: defineAsyncComponent(() =>
//     //   import('your-component-library-name/path/to/pageTable/Table.vue')
//     // )
//   }
// }
let menuData = reactive([
  {
    right: "",
    key: "test",
    icon: "",
    iconSelected: "",
    children: [
      {
        right: "",
        key: "test.test",
        icon: "",
        iconSelected: "",
        path: "test",
      },
      {
        right: "",
        key: "test.table",
        icon: "",
        iconSelected: "",
        path: "table",
      },
    ],
  },
]);
</script>

<style>

</style>
