<template>
  <div :column="column">
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Top /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'sortAsc')"
        >{{$t("dashboard.asc")}}</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Bottom /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'sortDesc')"
        >{{$t("dashboard.desc")}}</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Back /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'moveLeft')"
        >{{$t("dashboard.moveLeft")}}</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box">
        <el-icon><Right /></el-icon>
      </div>
      <span class="message-text" @click="handleOperation(props.column, 'moveRight')"
        >{{$t("dashboard.moveRight")}}</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box"><CopyIcon /></div>
      <span class="message-text" @click="handleOperation(props.column, 'copyName')"
        >{{$t("dashboard.copyName")}}</span
      >
    </div>
    <div class="optional-row-message">
      <div class="icon-box"><CopyIcon /></div>
      <span class="message-text" @click="handleOperation(props.column, 'copyColumn')"
        >{{$t("dashboard.copyColmunValue")}}</span
      >
    </div>
  </div>
</template>
<script setup>
import {  defineProps, defineEmits } from "vue";
import { CopyIcon } from "../../utils/icons";
import { column } from "element-plus/es/components/table-v2/src/common";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  column: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["handleOperation"]);

const handleOperation = (column, operation) => {
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
