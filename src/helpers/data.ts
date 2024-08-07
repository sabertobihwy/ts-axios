import { isPlainObject } from './util'

export function transformRequest(req:any):string{
  if(isPlainObject(req)){
    return JSON.stringify(req)
  }
  return req
}
