import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import { dispatchRequest } from './dispatchRequest'

export class Axios{
  request(url:any,config?:any):AxiosPromise{
    if(typeof url === 'string'){
      config.url = url
    }else{
      config = url
    }
    return dispatchRequest(config)
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
