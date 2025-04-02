<template>
  <div :column="column">
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Top /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'sortAsc')"
        >Sort A-Z</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Bottom /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'sortDesc')"
        >Sort Z-A</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Back /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'moveLeft')"
        >Move Left</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Right /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'moveRight')"
        >Move Right</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box"><CopyIcon /></div>
      <span class="message-text" @click="handleOperation(props.column, 'copyName')"
        >copy name</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box"><CopyIcon /></div>
      <span class="message-text" @click="handleOperation(props.column, 'copyColumn')"
        >copy column</span
      >
    </div>
  </div>
</template>
<script setup>
import {  defineProps, defineEmits } from "vue";
import { CopyIcon } from "../../utils/icons";
import { column } from "element-plus/es/components/table-v2/src/common";

const props = defineProps({
  column: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["handleOperation"]);

const handleOperation = (column, operation) => {
  console.log("handleOperation 发送了", column, operation);
  emit("handleOperation", { column, operation });
};
</script>
<style scoped>
.optional-row-message {
  display: flex;
  margin: 3px 0;
}

.icon-box {
  margin-right: 5px;
}

.message-text:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
