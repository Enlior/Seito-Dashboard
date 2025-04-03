<template>
  <DropdownMenu
    placement="bottom"
    popper-class="header-btn-dropdown"
    :dropdownType="dropdownType"
    trigger="click"
    :modelValue="selected"
    :icon="dropdownIcon"
    :list="dropdownList"
    @update:modelValue="selected = $event"
    @command="handleCommand"
  />
</template>

<script setup>
import { ref } from "vue";
import DropdownMenu from "@/components/dropdownMenu/DropdownMenu.vue";
import dropdownSvg from "@/assets/images/dropdown.svg";
const dropdownType = ref("BUTTON");
const selected = ref("");
const dropdownIcon = ref(dropdownSvg);
const dropdownList = ref([
  {
    label: "changePass",
    code: "changePass",
    style: "green",
  },
  {
    label: "logout",
    code: "logout",
    style: "red",
  },
]);
const handleCommand = (command) => {
  console.log("选中的命令:", command);
  if (command === "changePass") {
    openChangePass();
  } else if (command === "logout") {
    logout();
  }
};
const openChangePass = () => {
  console.log("openChangePass");
};
const logout = () => {
  console.log("logout");
};
</script>
