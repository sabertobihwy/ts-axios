import axios from '../../src/axios'
import { AxiosError } from '../../src'

// axios.post('/auth/post',{},{
//   auth:{
//     username: 'apple1',
//     password:'www'
//   }
// }).then(res=>{
//   console.log(res.data)
// })

axios.get('/more/304').then(res=>{
  console.log(res.data)
}).catch((e:AxiosError)=>{
  console.log(e.message)
})

axios.get('/more/304',{
  validateStatus:function(status){
    return status >= 200 && status <400
  }
}).then(res=>{
  console.log(res.data)
}).catch((e:AxiosError)=>{
  console.log(e.message)
})
