import { isDate, isPlainObject, isURLSearchParams } from './util'
interface URLOrigin{
  protocol:string,
  host:string,
}
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
export function buildURL(url:string, paramSerializer?: (params:any)=>string,params?:any):string{
  if(!params) return url
  let serilalizedParams
  if(paramSerializer){
    serilalizedParams = paramSerializer(params)
  }else if(isURLSearchParams(params)){
    serilalizedParams = params.toString()
  }else{
    const paramsArr:string[] = []
    Object.keys(params).forEach((key)=>{
      const value = params[key]
      if(value === null || typeof value === 'undefined') return
      let valueArr
      if(Array.isArray(value)){
        key += '[]'
        valueArr = value
      }else{
        valueArr = [value]
      }
      valueArr.forEach((val)=>{
        if(isDate(val)){
          val = val.toISOString()
        }else if(isPlainObject(val)){
          val = JSON.stringify(val)
        }
        paramsArr.push(`${encode(key)}=${encode(val)}`)
      })
    })
    // remove #hash
    const idx = url.indexOf('#')
    if(idx !== -1){
      url = url.slice(0,idx)
    }
    serilalizedParams = paramsArr.join('&')
  }

  if(serilalizedParams){
    url += url.search(/\?/) === -1?'?':'&'
    url += serilalizedParams
  }
  return url
}

export function isSameOrigin(requestURL:string):boolean{
  const requestOrigin = resolveURL(requestURL)
  return (requestOrigin.protocol === currOrigin.protocol) && (requestOrigin.host === currOrigin.host)
}

const currOrigin:URLOrigin = resolveURL(window.location.href)
const urlParsingNode = document.createElement('a')
function resolveURL(url:string):URLOrigin{
  let testurl: URL | null
  if(!urlParsingNode){
    testurl = new URL(url);
  }else{
    urlParsingNode.setAttribute('href',url)
  }
  const {protocol,host} = testurl! || urlParsingNode
  return {
    protocol,
    host
  }
}

export function isAbsoluteURL(url:string):boolean{
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//.test(url)
}

export function combineURL(baseURL:string,relativeURL?:string):string{
  return relativeURL? baseURL.replace(/\/+$/,'') +
    '/' + relativeURL.replace(/^\/+/,''):baseURL
}





