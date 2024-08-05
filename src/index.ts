import {axiosRequestConfig} from './types'
import xhr from './xhr'

function axios(config:axiosRequestConfig){
  xhr(config)
}

export default axios
