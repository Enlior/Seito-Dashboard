<template>
  <!-- <el-button @click="this.$router.push('/test')">switch test</el-button> -->
  <!-- <el-button @click="this.$router.push('/main')">switch table</el-button> -->
  <el-config-provider :locale="locale[$i18n.locale]">
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script>
import elementEN from "element-plus/es/locale/lang/en";
import elementCN from "element-plus/es/locale/lang/zh-cn";
import elementTW from "element-plus/es/locale/lang/zh-tw";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
// TODO backend佈局用elementui表格時會出ResizeObserver loop completed with undelivered notifications. 錯誤，暫時添加這個解決
// 解决ERROR ResizeObserver loop completed with undelivered notifications.
// 重写ResizeObserver的构造函数，并在其中定义并调用防抖函数
// window.ResizeObserver = class ResizeObserver extends window.ResizeObserver {
//   constructor(callback) {
//     let timer = null;
//     const debouncedCallback = function () {
//       let context = this;
//       let args = arguments;
//       clearTimeout(timer);
//       timer = setTimeout(function () {
//         callback.apply(context, args);
//       }, 500);
//     };
//     super(debouncedCallback);
//   }
// };
export default {
  name: "App",
  components: {},
  setup() {
    const loadingResource = ref(true);
    return {
      loadingResource,
    };
  },
  created() {
    const { mergeLocaleMessage } = useI18n({ useScope: "global" });

    // getI18nConfig().then(res=>{
    const res = [
      {
        key: "tp.print.paper",
        value: "数据库里有的",
        language: "ENG",
      },
      {
        key: "tp.take.ticket",
        value: "数据库里有的11",
        language: "TCHIN",
      },
    ];

    // 合并数据里请求到的更新i18n
    // TODO 合并后调用一次mergeLocaleMessage?
    for (let item of res) {
      let data = {};
      data[item["key"]] = item["value"];
      mergeLocaleMessage(item["language"], data);
    }

    this.loadingResource = false;

    document.title = this.$t("title");
  },
  data() {
    return {
      locale: { ENG: elementEN, SCHIN: elementCN, TCHIN: elementTW },
    };
  },
};


const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 200); // 设置防抖延迟
    super(callback);
  }
};

</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Inter, BlinkMacSystemFont, Helvetica, Arial, sans-serif,Barlow Condensed;
}
</style>
