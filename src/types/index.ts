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
  cancelToken?:CancelToken
  withCredentials?: boolean
  xsrfCookieName?:string
  xsrfHeaderName?:string
  onUploadProgress?:(e:ProgressEvent)=>void
  onDownloadProgress?:(e:ProgressEvent)=>void
  auth?:Authorization
  validateStatus?:(status:number)=>boolean

  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [key:string]:any
}

export interface AxiosTransformer{
  (data:any, headers?:any):any
}

export interface AxiosResponse<T=any>{
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>>{
}

export interface AxiosError<T=any> extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse<T>
}

export interface Axios{
  interceptor: Interceptors
  defaults : AxiosRequestConfig
  request<T=any>(config:AxiosRequestConfig):AxiosPromise<T>
  get<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
  delete<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
  options<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
  head<T=any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
  post<T=any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>
  put<T=any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>
  patch<T=any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface InterceptorManager<T>{
  use(resolve:ResolveFn<T>,reject?:RejectFn):number
  eject(id:number):void
}

export interface ResolveFn<T>{
  (resolve:T):T | Promise<T>
}

export interface RejectFn{
  (error:any):any
}

export interface Interceptors{
  request:InterceptorManager<AxiosRequestConfig>
  response:InterceptorManager<AxiosResponse>
}

export interface AxiosInstance extends Axios{
  <T=any>(config:AxiosRequestConfig):AxiosPromise<T>
  <T=any>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance{
  create(config?:AxiosRequestConfig): AxiosStatic

  CancelToken:CancelTokenStatic
  Cancel:CancelStatic
  isCancel:(val:any)=>boolean
}
export interface CancelTokenStatic{
  new (e:CancelExecutor):CancelToken
  source():CancelTokenSource
}

export interface CancelExecutor{
  (c:Canceler):void
}

export interface Canceler{
  (msg?:string):void
}

export interface CancelToken{
  promise:Promise<Cancel>
  reason?: Cancel

  throwIfRequested():void
  // source():CancelTokenSource
}
export interface CancelTokenSource{
  token:CancelToken
  cancel:Canceler
}

export interface Cancel{
  reason?: string
}

export interface CancelStatic{
  new (reason?:string):Cancel
}

export interface Authorization{
  username: string
  password: string
}
