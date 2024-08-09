import { AxiosError } from '../../src'
import axios from '../../src/axios'

axios({
  method: 'GET',
  url: "/error/get1"
}).then((res)=>{
  console.log(res)
}).catch((e:AxiosError)=>{
  console.log(e.message)
  console.log(e.config)
})

axios({
  method: 'GET',
  url: "/error/get"
}).then((res)=>{
  console.log(res)
}).catch((e:AxiosError)=>{
  console.log(e.message)
})

setTimeout(()=>{
  axios({
    method: 'GET',
    url: "/error/get"
  }).then((res)=>{
    console.log(res)
  }).catch((e)=>{
    console.log(e)
  })
},5000)

axios({
  method: 'GET',
  url: "/error/timeout",
  timeout: 2000
}).then((res)=>{
  console.log(res)
}).catch((e)=>{
  console.log(e.message)
})
