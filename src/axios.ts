import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/MergeStrat'

export function createInstance(initConfig:AxiosRequestConfig):AxiosStatic{
    const context = new Axios(initConfig)
    const instance = Axios.prototype.request.bind(context)
    extend(instance,context)
    return instance as AxiosStatic
}
const axios = createInstance(defaults)

axios.create = function(customConfig:AxiosRequestConfig){
  return createInstance(mergeConfig(defaults,customConfig))
}

export default axios
