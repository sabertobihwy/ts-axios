import axios from '../../src/axios'
import { Canceler } from '../../src'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

// axios.get('/cancel/get',{
//   cancelToken: source.token
// }).catch((cancel)=>{
//   if(axios.isCancel(cancel)){
//     console.log('get request is cancelled: '+ cancel.reason)
//   }
// })
//
// setTimeout(()=>{
//  source.cancel('Operation canceled by user')
//
//   setTimeout(()=>{
//     axios.post('/cancel/post',{a:'1'},{
//       cancelToken: source.token
//     }).catch((cancel)=>{
//       if(axios.isCancel(cancel)){
//         console.log('post request is cancelled: '+ cancel.reason)
//       }
//     })
//   },100)
// },100)

let cancel: Canceler
axios.get('/cancel/get',{
  cancelToken: new CancelToken((c)=>{
    cancel = c
  })
}).catch((cancel)=>{
  if(axios.isCancel(cancel)){
    console.log('The second method => get request is cancelled: '+ cancel.reason)
  }
})

setTimeout(()=>{
  cancel()
  },100)

axios.get('/cancel/get',{
  cancelToken: new CancelToken((c)=>{
    cancel = c
  })
}).catch((cancel)=>{
  if(axios.isCancel(cancel)){
    console.log('The second method => get request is cancelled: '+ cancel.reason)
  }
})
