import {axiosRequestConfig} from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config:axiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config:axiosRequestConfig){
  transformURL(config)
}

function transformURL(config:axiosRequestConfig){
  const {url,params} = config
  config.url = buildURL(url,params)
}

export default axios
