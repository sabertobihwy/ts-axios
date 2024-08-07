export type Method = 'get' | 'GET'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'delete' | 'DELETE'
| 'options' | 'OPTIONS'
| 'head' | 'HEAD'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig{
  url?: string,
  headers?: any,
  method?: Method,
  data?: any,
  params?: any
  responseType?:XMLHttpRequestResponseType
  timeout?:number
}

export interface AxiosResponse{
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse>{
}

export interface AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios{
  request(config:AxiosRequestConfig):AxiosPromise
  get(url:string,config?:AxiosRequestConfig):AxiosPromise
  delete(url:string,config?:AxiosRequestConfig):AxiosPromise
  options(url:string,config?:AxiosRequestConfig):AxiosPromise
  head(url:string,config?:AxiosRequestConfig):AxiosPromise
  post(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise
  put(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise
  patch(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise
}

export interface AxiosInstance extends Axios{
  (config:AxiosRequestConfig):AxiosPromise
}
