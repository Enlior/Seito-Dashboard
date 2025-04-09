/**
 * 防抖动
 * @param {*} func 函数 触发的方法
 * @param {*} delay 防抖时延，单位为ms
 * @returns
 * 使用:handleInput: debounce(function () {}, 300),
 */
export const debounce = (func, delay) => {
    let timer = null
    return function () {
      if (timer) clearTimeout(timer)
      timer = null
      let self = this
      let args = arguments
      timer = setTimeout(() => {
        func.apply(self, args)
      }, delay)
    }
  }
  
  export const throttle = (fn, delay) => {
    console.log('sdfsdfsdfsdf')
    let timer = null
    let timeStamp = new Date()
    return function () {
      if (timer) clearTimeout(timer)
      timer = null
      let context = this //获取函数所在作用域this
      let args = arguments //取得传入参数
      if (new Date() - timeStamp > delay) {
        timeStamp = new Date()
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }
  }

// 计算日期（加减去输入值）
export const calculateDate = (val) => {
    let days = '';
    if (val) {
      const currentDate = new Date();
          const resultDate = new Date(currentDate.getTime() + val * 24 * 60 * 60 * 1000);
          days = resultDate.toISOString().split('T')[0];
    }else{
      days = '';
    }
    return days;
  };