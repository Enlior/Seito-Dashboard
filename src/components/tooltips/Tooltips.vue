<template>
  <el-tooltip
    :content="content"
    :placement="placement"
    :effect="effect"
    :disabled="disabled"
  >
    <slot></slot>
  </el-tooltip>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
const props = defineProps({
  content: {
    type: String,
    required: "",
  },
  placement: {
    type: String,
    default: "top",
  },
  effect: {
    type: String,
    default: "dark",
  },
});
const disabled = ref(false);
onMounted(async () => {
  disabled.value = !props.content;
});
</script>

<style scoped></style>
