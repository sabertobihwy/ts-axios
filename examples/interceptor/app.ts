import axios from '../../src/axios'

axios.interceptor.request.use((config)=>{
  config.headers.test += '1'
  return config
})
axios.interceptor.request.use((config)=>{
  config.headers.test += '2'
  return config
})
axios.interceptor.request.use((config)=>{
  config.headers.test += '3'
  return config
})
// 321

// 123
axios.interceptor.response.use((resp)=>{
  resp.data += '1'
  return resp
})
const inter = axios.interceptor.response.use((resp)=>{
  resp.data += '2'
  return resp
})
axios.interceptor.response.use((resp)=>{
  resp.data += '3'
  return resp
})
axios.interceptor.response.eject(inter)

axios({
  method: 'GET',
  url: "/interceptor/get",
  headers: {
    test: ''
  }
}).then((res)=>{
  console.log(res.data)
})
