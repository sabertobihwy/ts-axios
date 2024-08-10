import { InterceptorManager } from '../types'
import { RejectFn, ResolveFn } from '../types'

export interface interceptorFn<T>{
  resolve: ResolveFn<T>
  reject?: RejectFn
}

export default class InterceptorManagerImpl<T> implements InterceptorManager<T> {
  private interceptors: Array<interceptorFn<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    this.interceptors.push({
      resolve,reject
    })
    return this.interceptors.length-1
  }

 eject(id: number): void {
    if(this.interceptors[id]){
      this.interceptors[id] = null
    }
  }

  foreach(fn:(interceptor:interceptorFn<T>)=>void){
    this.interceptors.forEach((i)=>{
      if(i !== null){
        fn(i)}
      }
    )
  }

}
