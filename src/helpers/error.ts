import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this,AxiosError.prototype)
  }
}
export function createAxiosError(message: string,
                                 config: AxiosRequestConfig,
                                 code?: string | null,
                                 request?: any,
                                 response?: AxiosResponse){
  return new AxiosError(message, config, code, request, response)
}
