import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { transform } from './transform'

export function dispatchRequest(config:AxiosRequestConfig):AxiosPromise {
  checkIfDuplicateCancel(config)
  processConfig(config)
  return xhr(config).then((res)=>{
    return transformRespData(res)
  })
}

function processConfig(config:AxiosRequestConfig){
  config.url = transformURL(config)
  config.data = transform(config.data,config.headers,config.transformRequest)
  config.headers = flattenHeaders(config.headers,config.method!)
}

// data -> JSON
// function transformRequestData(config:AxiosRequestConfig){
//   return transformRequest(config.data)
// }

function transformURL(config:AxiosRequestConfig):string{
  const {url,params} = config
  return buildURL(url!,params)
}
// function transformHeaders(config:AxiosRequestConfig){
//   const {headers = {}, data} = config
//   return processHeaders(headers,data)
// }

function transformRespData(resp: AxiosResponse){
   resp.data = transform(resp.data,resp.headers,resp.config.transformResponse)
  return resp
}

function checkIfDuplicateCancel(config:AxiosRequestConfig){
  if(config.cancelToken){
    config.cancelToken.throwIfRequested()
  }
}
