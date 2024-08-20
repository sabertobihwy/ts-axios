import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResp } from './helpers/data'


const defaults:AxiosRequestConfig = {
  headers:{
    common:{
      Accept: 'application/json, text/plain, */*'
    }
  },
  timeout: 0,
  method: 'get',
  transformRequest:[function(data,headers):any{
    processHeaders(headers,data)
    return transformRequest(data)
  }],
  transformResponse:[function(data):any{
    return transformResp(data)
  }],
  xsrfCookieName:'XSRF-TOKEN',
  xsrfHeaderName:'X-XSRF-TOKEN',
  validateStatus:function(status){
    return status >= 200 && status <300;
  }
}

const methodWithoutData = ['get','options','delete','head']
methodWithoutData.forEach((method)=>{
  defaults.headers[method] = {}
})

const methodWithData = ['post','put','patch']
methodWithData.forEach((method)=>{
  defaults.headers[method] = {
    'Content-Type':'application/x-www-form-urlencoded'
  }
})

export default defaults
