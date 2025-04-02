<template>
  <el-button
    v-for="button in buttons"
    :key="button.text"
    :type="button.type"
    :text="button.text"
    :link="button.link"
    :bg="button.bg"
    :disabled="button.disabled"
    :loading="button.loading"
    :class="button.className"
    @click="button.eventFn"
  >
    <Tooltips
      :content="button.tooltipsText ? $t(button.tooltipsText) : ''"
      :placement="button.tooltipsPlacement"
    >
      <template v-if="button.svg"><div v-html="button.svg" :class="button.iconClass"></div></template>
      <template v-if="button.icon"><i :class="button.iconClass"></i></template>
      <template v-if="button.btnText">{{ button.btnText }}</template>
    </Tooltips>
  </el-button>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  buttons: {
    type: Object,
    default: () => {},
  },
});
</script>
<style scoped></style>
