import { isPlainObject } from './util'

function normalizeHeaders(headers:any, normalizedName:string){
  if(headers){
    Object.keys(headers).forEach((name)=>{
      if(name != normalizedName && name.toUpperCase() === normalizedName.toUpperCase()){
        headers[normalizedName] = headers[name]
        delete headers[name]
      }
    })
  }
}

export function processHeaders(headers:any,data:any){
  // content-type -> Content-Type
  normalizeHeaders(headers,'Content-Type')
  if(isPlainObject((data))){
    // 存在且未配置，headers必须默认存在
    if(headers && !headers['Content-Type']){
      headers['Content-Type'] = 'application/json;charset=utf-8'
      console.log(headers['Content-Type'])
    }
  }
  return headers
}
