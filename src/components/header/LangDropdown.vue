<template>
  <div>{{ languageText }}</div>
  <DropdownMenu
    placement="bottom-end"
    popper-class="header-language-dropdown"
    :dropdownType="dropdownType"
    trigger="click"
    :modelValue="languageText"
    :icon="dropdownIcon"
    :list="dropdownList"
    @update:modelValue="languageText = $event"
    @command="handleCommand"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import DropdownMenu from "@/components/dropdownMenu/DropdownMenu.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import dropdownIcon from "@/assets/images/language/language.svg";
const dropdownType = ref("TEXT");
const languageText = ref("ENG");
const dropdownList = ref([
  {
    label: "ENG",
    code: "ENG",
  },
  {
    label: "繁中",
    code: "TCHIN",
  },
  {
    label: "简中",
    code: "SCHIN",
  },
]);
const handleCommand = (command) => {
  console.log("选中的命令:", command);
  changeLang(command);
};
const changeLang = (lang) => {
  console.log(lang);
  locale.value = lang;
  const label = dropdownList.value.find((v) => v.code === lang).label;
  languageText.value = label;
  localStorage.setItem("et_lang", lang);
  document.title = t("title");
};
onMounted(() => {
  changeLang(localStorage.getItem("et_lang") || "ENG");
});
</script>
<style scoped>
.header-language-menu {
  height: 50%; /* 你希望的图片高度 */
  width: auto; /* 自动调整宽度以保持比例 */
  object-fit: contain; /* 确保图片在容器中不会被拉伸变形 */
}
</style>
<style>
.header-language-dropdown.el-popper.is-light {
  display: inline-block;
  /* background-color: rgb(51, 51, 51); */
  border: none;
  border-radius: 12px;
  /* font-family: "Barlow Condensed"; */
  font-size: var(--font-size);
  /* font-weight: bold; */
  top: 36px !important;
}
.header-language-dropdown.el-popper.is-light .el-popper__arrow:before {
  /* background-color: rgb(51, 51, 51); */
  border: none;
}
.header-language-dropdown .el-scrollbar__view.el-dropdown__list {
  border-radius: 6px;
  /* background-color: rgb(51, 51, 51); */
}
.header-language-dropdown .el-dropdown-menu {
  padding: 5px 5px;
  /* background-color: rgb(51, 51, 51); */
  border-radius: 6px;
}
.header-language-dropdown .el-dropdown-menu__item {
  display: flex;
  /* color: rgb(229, 229, 229); */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 22px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 5px 16px;
  white-space: nowrap;
}
.header-language-dropdown .el-dropdown-menu__item.is-disabled {
  cursor: default;
}
.header-language-dropdown .el-dropdown-menu__item .header-menu {
  margin: 0px 0px;
}
.header-language-dropdown .el-dropdown-menu__item:not(.is-disabled):focus,
.header-language-dropdown .el-dropdown-menu__item:not(.is-disabled):hover {
  /* --el-dropdown-menuItem-hover-fill: rgb(51, 51, 51) !important; */
  /* --el-dropdown-menuItem-hover-color: #ffffff !important; */
  border-radius: 6px;
}

.header-language-dropdown .el-dropdown-menu__item.active {
  color: #409eff !important;
  border-radius: 6px;
}
/* 隐藏箭头 hide arrow */
.header-language-dropdown .el-popper__arrow::before {
  /* display: none; */
}
</style>
