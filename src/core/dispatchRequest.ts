import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResp } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export function dispatchRequest(config:AxiosRequestConfig):AxiosPromise {
  processConfig(config)
  return xhr(config).then((res)=>{
    return transformRespData(res)
  })
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
  return buildURL(url!,params)
}
function transformHeaders(config:AxiosRequestConfig){
  const {headers = {}, data} = config
  return processHeaders(headers,data)
}

function transformRespData(resp: AxiosResponse){
  resp.data = transformResp(resp.data)
  return resp
}
