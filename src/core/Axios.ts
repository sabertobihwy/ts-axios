import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method, RejectFn, ResolveFn
} from '../types'

import { dispatchRequest } from './dispatchRequest'
import InterceptorManagerImpl from './InterceptorManagerImpl'
import mergeConfig from './MergeStrat'

interface Interceptors{
  request:InterceptorManagerImpl<AxiosRequestConfig>
  response:InterceptorManagerImpl<AxiosResponse>
}

interface PromiseChain<T>{
  resolve: ResolveFn<T> | ((config:AxiosRequestConfig)=>AxiosPromise)
  reject?:  RejectFn
}

export default class Axios{
  interceptor: Interceptors
  defaults: AxiosRequestConfig

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptor = {
      request: new InterceptorManagerImpl(),
      response: new InterceptorManagerImpl()
    }
  }

  request(url:any,config?:any):AxiosPromise{
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }
    config = mergeConfig(this.defaults,config)
    const chain:PromiseChain<any>[] = [{resolve: dispatchRequest, reject: undefined}]
    this.interceptor.request.foreach((i)=>chain.unshift(i))
    this.interceptor.response.foreach((i)=>chain.push(i))
    let promise = Promise.resolve(config)
    while(chain.length !== 0){
      const{resolve,reject} = chain.shift()!
      promise = promise.then(resolve,reject) // promise.then(resolve, reject)的resolve方法会用我的解决值作为参数，并执行
    }
    return promise
  }
  get(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData(url,'GET',config)
  }
  delete(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData(url,'DELETE',config)
  }
  options(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData(url,'options',config)
  }
  head(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData(url,'head',config)
  }
  post(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData(url,'POST',data,config)
  }
  put(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData(url,'put',data,config)
  }
  patch(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData(url,'patch',data,config)
  }

  _requestMethodWithoutData(url:string,method:Method,config?:AxiosRequestConfig):AxiosPromise{
    return this.request(Object.assign(config || {},{
      method,
      url
    }))
  }
  _requestMethodWithData(url:string,method:Method,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this.request(Object.assign(config || {},{
      method,
      url,
      data
    }))
  }
}
