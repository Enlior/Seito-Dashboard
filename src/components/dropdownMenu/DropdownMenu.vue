<template>
  <el-dropdown
    :placement="placement"
    :popper-class="popperClass"
    :hide-on-click="true"
    :teleported="appendToBody"
    :trigger="trigger"
    @command="handleCommand"
  >
    <div class="dropdown-icon">
      <el-icon v-if="iconType === 'icons'" :name="icon" />
      <img v-else :src="icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- BUTTON -->
        <template v-if="dropdownType === 'BUTTON'">
          <el-dropdown-item
            v-for="item in list"
            :key="item.code"
            :command="item.code"
          >
            <el-button
              type="primary"
              size="small"
              :class="['dropdown-btn', item.style + '-btn']"
              >{{ $t(item.label) }}</el-button
            >
          </el-dropdown-item>
        </template>
        <!-- TEXT -->
        <template v-if="dropdownType === 'TEXT'">
          <el-dropdown-item
            v-for="item in list"
            :key="item.code"
            :command="item.code"
            :class="modelValue === item.label && 'active'"
            >{{ item.label }}</el-dropdown-item
          >
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus';
// props 和 emits
const props = defineProps({
  placement: {
    type: String,
    default: "",
  },
  popperClass: {
    type: String,
    default: "",
  },
  dropdownType: {
    type: String,
    default: "",
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  iconType: {
    type: String,
    default: "",
  },
  list: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update:modelValue", "command"]);

// Handling click events for dropdown menu items
const handleCommand = (command) => {
  emits("update:modelValue", command);
  emits("command", command);
};
</script>

<style scoped>
/* 自定义样式 */
.dropdown-icon {
  display: flex;
  margin-left: 0.5em;
  cursor: pointer;
}
.dropdown {
  display: inline-flex;
  margin-left: 15px;
}
.dropdown-btn {
  display: flex;
  flex-direction: column;
  /*padding: 5px;*/
  gap: 5px;
  width: 150px;
  height: 34px;
  color: #ffffff;
  border: none;
}
.dropdown-btn:hover {
  color: #ffffff;
  border: none;
}
.green-btn {
  background-color: #b8e026;
}
.green-btn:hover {
  background-color: #b8e026;
}
.red-btn {
  background-color: #e91b67;
}
.red-btn:hover {
  background-color: #e91b67;
}
</style>
