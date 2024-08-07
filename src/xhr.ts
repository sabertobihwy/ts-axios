import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config:AxiosRequestConfig):AxiosPromise{
  return new Promise((resolve)=>{
    const{data = null,url, method ='get', headers,responseType} = config
    const request = new XMLHttpRequest()
    if(responseType){
      // 默认"text"
      request.responseType = responseType
    }
    request.open(method.toUpperCase(),url,true)
    // send前设置statechange函数
    request.onreadystatechange = function(){
      if(request.readyState != 4) return
      const responseHeaders = request.getAllResponseHeaders()
      const reqData = (request.responseType === 'text' || request.responseType === "") ? request.responseText : request.response
      const response:AxiosResponse = {
        data: reqData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
    Object.keys(headers).forEach((name)=>{
      if(data === null && name.toLowerCase() === 'content-type'){
        delete headers[name]
      }else{
        request.setRequestHeader(name,headers[name])
      }
    })
    request.send(data)
  })
}
