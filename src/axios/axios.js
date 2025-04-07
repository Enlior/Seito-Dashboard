import axios from "axios";
// import router from "../router";

//创建一个axios实例
const API_BASE = process.env.NODE_ENV === "development" ? "/":process.env.API_BASE_URL;
const instance = axios.create({
  // baseURL:import.meta.env.API_URL||window.location.origin + '/api',
  baseURL:API_BASE,
  credentials:true,
  withCredentials: true, // 允许发送 Cookie
  // maxRedirects: 0, // 禁用自动重定向
});

// axios.defaults.validateStatus = function (status) {
//   return status >= 200 && status < 400; // 这样 Axios 不会抛出错误，但也不会自动跟随重定向
// };
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    //check token
    // const token = localStorage.getItem("token");
    // const token = '123'
    // if (token) {
    //   config.headers["Authorization"] = token;
    // }

    // const headers = {
    //   Authorization: "Bearer your-token",
    //   "Content-Type": "multipart/form-data",
    // }; // 上传时携带的请求头
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  (response) => {
     // 检查响应状态码是否为 302
    //  if (response.status === 302 && response.headers['set-cookie']) {
    //   const cookies = response.headers['set-cookie'];
    //   const tokenCookie = cookies.find((cookie) => cookie.startsWith('JSESSIONID='));
    //   if (tokenCookie) {
    //     const token = tokenCookie.split(';')[0].split('=')[1];
    //     setToken(token); // 存储 Token
    //   }
    // }
    
    return response;
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
  },
  function (error) {
    if (error.code === 'ERR_NETWORK') {
      console.log('网络请求出错')
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // if (error.response.status == 401) {
    //   removeToken()
    //   console.log("is 401 error,登录状态已经失效");
    //   if (
    //     window.location.href.includes("home")
    //   ) {
    //     router.push({
    //       path: "/home",
    //     });
    //   } else if (!window.location.href.includes("Login")) {
    //     let d = window.location.href.split("?")[1].split("=")[1];
    //     router.push({
    //       path: "/login",
    //       query: { d: d },
    //     });
    //   }
    // }
    return Promise.reject(error)
  }
);

const http = {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          params: params,
        })
        .then((res) => {
          
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  download(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          params: params,
          responseType: "blob",
        })
        .then((res) => {
          console.log("download res:", res);
          const disposition = res.headers["content-disposition"];
          const fileName =
            disposition && disposition.indexOf("attachment") !== -1
              ? disposition.split("filename=")[1].replace(/"/g, "") // 提取文件名并去除引号
              : "default-filename"; // 默认文件名
          console.log(fileName);
          // fileDownload(res.data, fileName);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  /**
   * put方法，对应put请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  put(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  /**
   * delete方法，对应delete请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  del(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, { params: params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  getUri(config) {
    if (config.auth) {
      config.params["token"] = window.sessionStorage.getItem(
        "backendpanel.login.token"
      );
    }
    return instance.getUri(config);
  },
};
export default http;
