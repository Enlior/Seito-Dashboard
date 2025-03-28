import {createRouter,createWebHistory} from 'vue-router'
import Index from "@/views/dashboard/index.vue";
const routes = [
    {
        path: '/',
        component: Index,
        meta: { title: 'seito' },
        redirect:'/dashboard',
        children: [
          {
            path: 'dashboard',
            name:"dashboard",
            component: () => import('@/views/dashboard/index.vue'),
          }
        ],
    },
    
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: NotFound,
    // },
    // { path: '/redirect', component: Redirect }, // 添加中转页面路由
];
const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach(async(to, from, next) => {
  //如果去登录页进行跳转
  if (to.path === '/login') {
    next()
  }
  if (!isAuthenticated()) {
    next({ name: 'Login' }); // 重定向到登录页
  } else {
    next();
  }
});

function isAuthenticated() {
  // const token = localStorage.getItem('pos_web_token')
  // if (token) {
  //   return true;
  // }
  // 触发登录流程
  // const redirectUri = encodeURIComponent(`${window.location.origin}/redirect`)
  // window.location.href = `${posWebUrl}/PosWeb/home?redirect=${redirectUri}`
  //测试
  localStorage.setItem('token', '333232')
  return localStorage.getItem('token') !== null;
}
export default router