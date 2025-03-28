/**
 * 判断设备是Mobile Device / Desktop Device
 * Check if the user is accessing the page on a mobile device
 */
export function checkDeviceIsMobile() {
    // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);
    return isMobile
}


/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (typeof val === 'boolean') {
      return false
    }
    if (typeof val === 'number') {
      return false
    }
    if (val instanceof Array) {
      if (val.length == 0) return true
    } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true
    } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
      return false
    }
    return false
  }

export let validateInteger = async (rule, value) => {
    if (!value) {
      return Promise.reject('不能为空')
    } else {
      const intValue = parseInt(value, 10)
      if (isNaN(intValue) || intValue <= 0) {
        // return Promise.reject('请输入大于0的正整数')
        return Promise.reject('錯誤 - 輸入資料不正確')
      }
      if (value.includes('.')) {
        return Promise.reject('请输入正整数')
      }
      return Promise.resolve()
    }
}
