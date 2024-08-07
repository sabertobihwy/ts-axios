import { isPlainObject } from './util'

export function transformRequest(req:any):string{
  if(isPlainObject(req)){
    return JSON.stringify(req)
  }
  return req
}

export function transformResp(data: any):string{
  if(typeof data === 'string'){
    try {
      data = JSON.parse(data)
    }catch (err){
      // todo
    }
  }
  return data
}
