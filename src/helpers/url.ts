import { isDate, isObject } from './util'
function encode(val:string):string{
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/g, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');
}
export function buildURL(url:string, params?:any):string{
  if(!params) return url
  const paramsArr:string[] = []
  Object.keys(params).forEach((key)=>{
    const value = params[key]
    if(value === null || typeof value === 'undefined') return
    let valueArr = []
    if(Array.isArray(value)){
      key += '[]'
      valueArr = value
    }else{
      valueArr = [value]
    }
    valueArr.forEach((val)=>{
      if(isDate(val)){
        val = val.toISOString()
      }else if(isObject(val)){
        val = JSON.stringify(val)
      }
      paramsArr.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // remove #hash
  const idx = url.indexOf('#')
  if(idx != -1){
    url = url.slice(0,idx)
  }
  const serilalizedParams = paramsArr.join('&')
  if(serilalizedParams){
    url += url.search(/\?/) === -1?'?':'&'
    url += serilalizedParams
  }
  return url
}
