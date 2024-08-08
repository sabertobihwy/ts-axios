export type Method = 'get' | 'GET'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'delete' | 'DELETE'
| 'options' | 'OPTIONS'
| 'head' | 'HEAD'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig{
  url: string,
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
