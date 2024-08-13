import { AxiosRequestConfig } from './types'

const defaults:AxiosRequestConfig = {
  headers:{
    common:{
      Accept: 'application/json, text/plain, */*'
    }
  },
  timeout: 0,
  method: 'get'
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
