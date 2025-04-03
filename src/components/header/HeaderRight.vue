<template>
  <div class="header-right">
    <!-- <el-button
      text
      v-for="(item, index) in fontBtn"
      :key="index"
      size="small"
      class="header-font-btn"
      :title="item.label"
      @click="item.event"
    >
      <i :class="['font-icon', item.icon]"></i>
    </el-button> -->
    <LangDropdown />
    <!-- <div class="header-system-time">{{ systemTime }}</div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import LangDropdown from "@/components/header/LangDropdown.vue";

const systemTime = ref(0);

const fontBtn = ref([
  {
    label: "缩小",
    icon: "icon-decrease",
    event: function () {
      scaleFont(-1);
    },
  },
  {
    label: "放大",
    icon: "icon-increase",
    event: function () {
      scaleFont(1);
    },
  },
]);

const fontSize = ref(14); // 默认字体大小
const scaleFont = (direction) => {
  const scaleFactor = 1.2; // 字体缩放因子
  fontSize.value = Math.max(
    12,
    Math.min(30, fontSize.value + direction * scaleFactor)
  ); // 限制字体大小范围
  // document.documentElement.style.fontSize = `${fontSize.value}px`; // 更新全局字体大小
};

function updateFontSize() {
  document.documentElement.style.setProperty(
    "--font-size",
    `${fontSize.value}px`
  );
}

// onMounted(updateFontSize);
watch(fontSize, updateFontSize);

const startClock = () => {
  updateTime();
  // TODO clear?
  // 每秒更新一次时钟
  setInterval(updateTime, 1000);
};

const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  systemTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  nextTick(() => {
    startClock();
  });
});
</script>

<style scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
}
.header-font-btn {
  display: inline-flex;
  width: 35px;
  height: 35px;
  padding: 0;
  margin-left: 0px !important;
}
.header-font-img {
  display: inline-flex;
  justify-content: center;
  width: 80%;
  height: 60%;
  object-fit: contain;
}
.header-system-time {
  display: inline-block;
  font-family: Barlow Condensed;
  font-size: var(--font-size);
  color: #000000;
  width: 135px;
  margin-left: 10px;
  line-height: 18px;
}
.font-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  background-size: cover;
}
/* .icon-decrease {
  background-image: url("@/assets/images/decrease-font.png");
}
.icon-increase {
  background-image: url("@/assets/images/increase-font.png");
} */
</style>
