import http from "./axios.js"
// import {get,post} from '@/axios/index.js'

// 获取i18n配置
// export const getI18nConfig = ()=>get('/desc/getDescByConditions',)


// export const getAllMongodbCollections = () =>get('/api/getAllMongodbCollections',{});

// export const getAllColumns = p =>get('/api/getAllColumns',p)

// export const getDocumentsByPage = p =>get('/api/getDocumentsByPage',p)

// export const getFeildListAndCount = p =>post('/api/getFeildListAndCount',p)

// export const getDocumentsByCustomFeild = p =>get('/api/getDocumentsByCustomFeild',p)

export const getDocumentsByFilterColumn = p =>http.post('/api/getDocumentsByFilterColumn',p)


export const getCustomers = (param) => http.post('/customers/search',param);