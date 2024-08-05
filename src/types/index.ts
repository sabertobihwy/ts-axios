export type Method = 'get' | 'GET'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'delete' | 'DELETE'
| 'options' | 'OPTIONS'
| 'head' | 'HEAD'
| 'patch' | 'PATCH'

export interface axiosRequestConfig{
  url: string,
  method?: Method,
  data?: any,
  params?: any
}
