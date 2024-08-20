import { AxiosPromise, AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

const stratMap =  Object.create(null)

function defaultStrat(val1:any, val2:any):any{
  return typeof val2 !== 'undefined'? val2:val1
}
function mustConfig2Strat(val1:any, val2:any):any{
  if(typeof val2 !== 'undefined'){
    return val2
  }
}
function complexMergeSrat(val1:any, val2:any):any{
  if(isPlainObject(val2)){
    return deepMerge(val1,val2)
  }else if(typeof val2 !== 'undefined'){
    return val2
  }else if(isPlainObject(val1)){
    return deepMerge(val1)
  }else if(typeof val1 !== 'undefined'){
    return val1
  }
}
const mustConfig2 = ['url','data','params']
mustConfig2.forEach((key)=>{
  stratMap[key] = mustConfig2Strat
})
const stratDeepMerge = ['headers','auth']
stratDeepMerge.forEach((key)=>{
  stratMap[key] = complexMergeSrat
})

export default function mergeConfig(config1:AxiosRequestConfig, config2?:AxiosRequestConfig):AxiosRequestConfig{
  const config = Object.create(null)
  if(!config2){
    config2 = {}
  }
  for(let key in config2){
    config[key] = mergeStrat(key)
  }
  for(let key in config1){
    if(!config2[key]){
      config[key] = mergeStrat(key)
    }
  }

  function mergeStrat(key:string):any{
    const strat = stratMap[key] || defaultStrat
    return strat(config1[key],config2![key])
  }

  return config


}
