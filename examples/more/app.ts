import axios from '../../src/axios'

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

axios.get('/more/get',{xsrfHeaderName:'X-XSRF-TOKEN-D',xsrfCookieName:'XSRF-TOKEN-D'})
  .then(res=>{
  console.log(res)
})

