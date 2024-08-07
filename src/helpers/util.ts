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

