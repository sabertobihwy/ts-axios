import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

export function createInstance(initConfig:AxiosRequestConfig):AxiosInstance{
    const context = new Axios(initConfig)
    const instance = Axios.prototype.request.bind(context)
    extend(instance,context)
    return instance as AxiosInstance
}

const axios = createInstance(defaults)
export default axios
