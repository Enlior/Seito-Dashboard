import axios from 'axios';

const instance = axios.create({
        // baseURL: import.meta.env.DEV ? '/' : 'http://localhost:3000/api',
        baseURL: '/',
        timeout: 5000
})



/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        instance.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.response)
            })
    });
}



/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.response)
            })
    });
}


export default instance