<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="size"
    :direction="direction"
    :append-to-body="appendToBody"
    :modal-class="customClass"
    :destroy-on-close="destroyOnClose"
    :before-close="handleClose"
    :with-header="true"
    @close="handleClose"
  >
    <div class="drawer-content">
      <div class="drawer-copy-info">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        class="euiIcon css-1sl2y4w-euiIcon-s-inherit"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M2 2.729V2a1 1 0 0 1 1-1h2v1H3v12h4v1H3a1 1 0 0 1-1-1V2.729zM14 5V2a1 1 0 0 0-1-1h-2v1h2v3h1zm-1 1h2v9H8V6h5V5H8a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v1z"
          fill="#1268A7"
        ></path>
        <path
          d="M9 10h5V9H9v1zm0-2h5V7H9v1zm0 4h5v-1H9v1zm0 2h5v-1H9v1zm2-12V1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1h1V1h4v1h1zM5 3h6V2H5v1z"
          fill="#1268A7"
        ></path>
      </svg> -->
      <copyIcon></copyIcon>
      <span @click="copyToClipboard" style="margin-left: 5px; cursor: pointer"
        >{{$t("dashboard.copyToClipboard")}}</span
      >
    </div>
      <div class="json-content">
        <VueJsonPretty :data="data" showLineNumber></VueJsonPretty>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { ElMessage } from "element-plus";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import {CopyIcon} from "../../utils/icons"
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  drawerVisible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: [Number, String],
    default: "50%",
  },
  direction: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
});

const visible = ref(false);
watch(
  () => props.drawerVisible,
  (newValue) => {
    visible.value = newValue;
  }
);
const emit = defineEmits(["handleClose"]);
const handleClose = () => {
  visible.value = false;
  emit("handleClose");
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(props.data));
    ElMessage.success("复制成功");
  } catch (err) {
    ElMessage.error("复制失败");
  }
};
</script>
<style >
  .drawer-content span:hover {
  cursor: pointer;
  text-decoration: underline;
}

.drawer-copy-info{
  text-align: right;
}
</style>