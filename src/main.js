import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//引入elementplus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/css/global.css'; // 引入公共样式
import './assets/css/scrollbar.css'; // 滚动条样式
//引入elementplus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from "./language"

import tips from '@/utils/Tips.js'



const app = createApp(App);
//version
// app.config.globalProperties.$version = 'v820.196b.2411091415';

app.config.globalProperties.$tips =  tips;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


import Tooltips from "./components/tooltips/Tooltips.vue";
//Tooltips
app.component('Tooltips', Tooltips);

// import SeitoFrontendComponent from 'seito-frontend-component-library';
// import SeitoFrontendComponent from '../public/lib/frontend-component/dist/seito-frontend-component-library.umd.js';
import SeitoFrontendComponent from'../public/lib/frontend-component/seitoComp.umd.js';
import "../public/lib/frontend-component/seitoComp.css"

app.config.errorHandler = (err) => {
    console.error('全局错误捕获:', err);
    // 可以在此处记录错误或展示用户友好的消息
  };
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.provide('i18n',i18n)
app.use(SeitoFrontendComponent);
app.mount('#app')
window.i18n = i18n;