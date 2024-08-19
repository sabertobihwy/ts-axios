import axios from '../../src/axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// document.cookie = 'a=b'
//
// axios.get('/more/get').then(res=>{
//   console.log(res)
// })
//
// // cors请求：withCredentials:true 可以请求到8088的cookie； 这个cookie必须是{sameSite:'none',secure:true}
// // server.js中先加载cookie-parser,再加载router才能从req headers中解析出req.cookies
// axios.post('http://127.0.0.1:8088/more/server2',{},{
//   withCredentials:true
// }).then(res=>{
//   console.log(res)
// })

// axios.get('/more/get',{xsrfHeaderName:'X-XSRF-TOKEN-D',xsrfCookieName:'XSRF-TOKEN-D'})
//   .then(res=>{
//   console.log(res)
// })

const instance = axios.create()

function calculatePercentage(loaded:number, total:number){
  return Math.floor(loaded * 1.0/total)
}
function loadProgressBar(){
  const setupStartProgress = () => {
    instance.interceptor.request.use((conf)=>{
          console.log('==setupStartProgress==')
          NProgress.start()
          return conf
        })
  }
  const updateProgress = () =>{
    const update = (e:ProgressEvent)=>{
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded,e.total))
    }
    instance.defaults.onUploadProgress = update
    instance.defaults.onDownloadProgress = update
  }
  const stopProgress = ()=>{
    instance.interceptor.response.use((resp)=>{
      console.log('==stopProgress==')
      NProgress.done()
      return resp
    },error => {
      console.log('==stopProgress==error==')
      NProgress.done()
      return Promise.reject(error)
    })
  }
  setupStartProgress()
  updateProgress()
  stopProgress()
}
loadProgressBar()

const downloadEl = document.getElementById('download')
downloadEl!.addEventListener('click',(e)=>{
  instance.get('https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190522/7cd820e54a8b4ae3ba9f87809b06da5e.jpeg')
})
const uploadEl = document.getElementById('upload')
uploadEl!.addEventListener('click',(e)=>{
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if(fileEl.files){
    data.append('file',fileEl.files[0])
  }
  instance.post('/more/upload',data)
})












