import axios from '../../src/axios'
import qs from 'qs'

// axios.post('/auth/post',{},{
//   auth:{
//     username: 'apple1',
//     password:'www'
//   }
// }).then(res=>{
//   console.log(res.data)
// })

// axios.get('/more/304').then(res=>{
//   console.log(res.data)
// }).catch((e:AxiosError)=>{
//   console.log(e.message)
// })
//
// axios.get('/more/304',{
//   validateStatus:function(status){
//     return status >= 200 && status <400
//   }
// }).then(res=>{
//   console.log(res.data)
// }).catch((e:AxiosError)=>{
//   console.log(e.message)
// })

// serializedParams
// axios.get('/more/get',{
//   params: {
//     a: 'b',
//     c: 'd'
//   }
// }).then(res=>{
//   console.log(res)
// })
//
// axios.get('/more/get',{
//   params: new URLSearchParams('a=b&c=d')
// }).then(res=>{
//   console.log(res)
// })
//
// axios.get('/more/get',{
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a','b','c']
//   }
// }).then(res=>{
//   console.log(res)
// })
//
// const instance = axios.create({
//   paramSerializer: function(params):string{
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })
//
// instance.get('/more/get',{
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a','b','c']
//   }
// }).then(res=>{
//   console.log(res)
// })

// absolute url
const instance = axios.create({
  baseURL: 'https://encrypted-tbn0.gstatic.com/'
})
instance.get('images?q=tbn:ANd9GcR20E6bHxiQS-eifQFfjaKlEQMoWw4EeccAGw&s')
instance.get('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR20E6bHxiQS-eifQFfjaKlEQMoWw4EeccAGw&s')

