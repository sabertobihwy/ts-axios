import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createAxiosError } from './helpers/error'

export default function xhr(config:AxiosRequestConfig):AxiosPromise{
  return new Promise((resolve,reject)=>{
    const{data = null,url,
      method ='get',
      headers,responseType,
      cancelToken,
      withCredentials} = config
    const request = new XMLHttpRequest()
    if(responseType){
      // 默认"text"
      request.responseType = responseType
    }
    if(config.timeout){
      request.timeout = config.timeout
    }
    if(config.withCredentials){
      request.withCredentials = config.withCredentials
    }
    request.open(method.toUpperCase(),url!,true)
    request.onerror = function(){
      reject(createAxiosError('Network error!',config,null,request))
    }
    request.ontimeout = function(){
      reject(createAxiosError(`Timeout! exceed ${config.timeout}`,config,'ECONNABORTED',request))
    }
    // send前设置statechange函数
    request.onreadystatechange = function(){
      if(request.readyState !== 4) return
      if(request.status === 0) return
      const responseHeaders = request.getAllResponseHeaders()
      const reqData = (request.responseType === 'text' || request.responseType === "") ? request.responseText : request.response
      const response:AxiosResponse = {
        data: reqData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      handleResponse(response)
    }
    Object.keys(headers).forEach((name)=>{
      if(data === null && name.toLowerCase() === 'content-type'){
        delete headers[name]
      }else{
        request.setRequestHeader(name,headers[name])
      }
    })

    if(cancelToken){
      cancelToken.promise.then((cancel)=>{
        request.abort()
        reject(cancel)
      })
    }
    request.send(data)

    function handleResponse(response:AxiosResponse){
      if(request.status >= 200 && request.status <300){
        resolve(response)
      }else{
        reject(
        createAxiosError(`Error, status code: ${request.status}`,config,null,request)
        )
      }
    }
  })


}
