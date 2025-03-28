import { createI18n } from "vue-i18n";
import zhCN from "./locales/SCHIN.json";
import enUS from "./locales/ENG.json";
import zhTW from "./locales/TCHIN.json"

let language = localStorage.getItem("et_lang") || "TCHIN"; //  获取本地存储 || 根据浏览器语言设置
// language="TCHIN";
const i18n = createI18n({
    legacy: false, // 使用Composition API，这里必须设置为false
    locale: language, // 默认显示语言
    globalInjection: true, // 全局注册$t方法
    messages: {
        "SCHIN": {...zhCN,},
        "ENG": {...enUS,},
        "TCHIN": {...zhTW,},
    },
});

export default i18n;
