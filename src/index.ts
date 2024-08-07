import { AxiosPromise, AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config:AxiosRequestConfig):AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config:AxiosRequestConfig){
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// data -> JSON
function transformRequestData(config:AxiosRequestConfig){
  return transformRequest(config.data)
}

function transformURL(config:AxiosRequestConfig):string{
  const {url,params} = config
  return buildURL(url,params)
}
function transformHeaders(config:AxiosRequestConfig){
  const {headers = {}, data} = config
  return processHeaders(headers,data)
}

export default axios
