const toString = Object.prototype.toString

export function isDate(val:any):val is Date{
  return toString.call(val) === '[object Date]'
}

// export function isObject(val:any):val is object{
//   return val !== null && typeof val === 'object'
// }

// build-in对象 -> false
// 用户自定义对象 -> true
export function isPlainObject(data:any):data is Object{
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function extend<T,U>(to: T, from: U): T&U{
  for(let key in from ){
    (to as T&U)[key]  = from[key] as any
  }
  return to as T&U
}

export function deepMerge(...objs:any[]):any{
  const result = Object.create(null)
  objs.forEach(obj =>{ // header
    if(obj){
      Object.keys(obj).forEach((key)=>{
        // key = common
        const val = obj[key]
        if(isPlainObject(val)){
          if(isPlainObject(result[key])){
            result[key] = deepMerge(result[key],val)
          }else{
            result[key] = deepMerge(val)
          }
        }else{
          result[key] = val
        }
      })
    }
  })
  return result
}
