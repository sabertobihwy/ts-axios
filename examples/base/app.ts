import axios from '../../src'
// post test Promise
axios({
  method: 'POST',
  url: "/base/post",
  data: {
    a:1,
    b:2
  }
}).then((resp)=>{
  console.log(resp)
})

axios({
  method: 'POST',
  url: "/base/post",
  data: {
    a:3,
    b:4
  },
  responseType:'json'
}).then((resp)=>{
  console.log(resp)
})

//post
// axios({
//   method: 'POST',
//   url: "/base/post",
//   data: {
//     a:1,
//     b:2
//   }
// })

// axios({
//   method: 'POST',
//   url: "/base/post",
//   headers:{
//     'content-type' : 'application/json;charset=utf-8',
//     'Accept':'application/json, text/plain, */*'
//   },
//   data: {
//     a:1,
//     b:2
//   }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api';
// const searchParams = new URLSearchParams(paramsString);
// //当你使用 XMLHttpRequest 发送 URLSearchParams 对象作为请求的数据，
// // 即使没有明确设置 Content-Type 头，浏览器会自动将 Content-Type 设置为
// // application/x-www-form-urlencoded。
// // 这是因为 URLSearchParams 对象本身就是用于表示 URL 编码的表单数据。
// axios({
//   method: 'POST',
//   url: "/base/post",
//   data: searchParams
// })

//
// const arr = new Int32Array([21,32])
//
// axios({
//   method: 'POST',
//   url: "/base/buffer",
//   data: arr
// })

//get
// axios({
//   method: 'GET',
//   url: "/base/get",
//   params: {
//     a:1,
//     b:2
//   }
// })
//
// axios({
//   method: 'GET',
//   url: "/base/get",
//   params: {
//     foo:1,
//     bar:['bar1','bar2']
//   }
// })
//
// axios({
//   method: 'GET',
//   url: "/base/get",
//   params: {
//     foo:{
//       bar: 'obj'
//     }
//   }
// })
//
// axios({
//   method: 'GET',
//   url: "/base/get",
//   params: {
//     date: new Date()
//   }
// })
// axios({
//   method: 'GET',
//   url: "/base/get",
//   params: {
//     foo:'@$:'
//   }
// })
// axios({
//   method: 'GET',
//   url: "/base/get",
//   params: {
//     foo:null,
//     bar: 'bar'
//   }
// })
// axios({
//   method: 'GET',
//   url: "/base/get#hash",
//   params: {
//     foo:'hashcode'
//   }
// })
// axios({
//   method: 'GET',
//   url: "/base/get?exist=1",
//   params: {
//     foo:'bar'
//   }
// })
