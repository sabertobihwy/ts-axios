import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createAxiosError } from './helpers/error'
import { isSameOrigin } from './helpers/url'
import cookie from './helpers/cookie'
import { isFormData } from './helpers/util'

export default function xhr(config:AxiosRequestConfig):AxiosPromise{
  return new Promise((resolve,reject)=>{
    const{data = null,url,
      method ='get',
      headers,responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onUploadProgress,
      onDownloadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(),url!,true)
    configureRequest()
    configureEvent()
    processHeaders()
    cancelFunc()
    request.send(data)

    function configureRequest(){
      if(responseType){
        // 默认"text"
        request.responseType = responseType
      }
      if(timeout){
        request.timeout = timeout
      }
      if(auth){
        headers['Authorization'] = 'Basic '+ btoa(`${auth.username}:${auth.password}`)
      }
    }
    function configureEvent(){
      request.onerror = function(){
        reject(createAxiosError('Network error!',config,null,request))
      }
      request.ontimeout = function(){
        reject(createAxiosError(`Timeout! exceed ${config.timeout}`,config,'ECONNABORTED',request))
      }
      if(onUploadProgress){
        request.upload.onprogress = onUploadProgress
      }
      if(onDownloadProgress){
        request.onprogress = onDownloadProgress
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
    }
    function processHeaders(){
      if(withCredentials){
        request.withCredentials = withCredentials
      }
      // 配置withCredentials:true && same origin的时候才把token拿进headers
      if((withCredentials || isSameOrigin(url!)) && xsrfCookieName){
        const xsrfVal = cookie.read(xsrfCookieName)
        if(xsrfVal && xsrfHeaderName){
          headers[xsrfHeaderName] = xsrfVal
        }
      }
      if(isFormData(data)){
        delete headers['Content-Type']
      }
      Object.keys(headers).forEach((name)=>{
        if(data === null && name.toLowerCase() === 'content-type'){
          delete headers[name]
        }else{
          request.setRequestHeader(name,headers[name])
        }
      })

    }
    function cancelFunc(){
      if(cancelToken){
        cancelToken.promise.then((cancel)=>{
          request.abort()
          reject(cancel)
        })
      }
    }

    function handleResponse(response:AxiosResponse){
      // 无规则定义status or 通过规则
      if(!validateStatus || validateStatus(response.status)){
        resolve(response)
      }else{
        reject(
        createAxiosError(`Error, status code: ${request.status}`,config,null,request)
        )
      }
    }
  })


}
