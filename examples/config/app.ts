import axios from '../../src/axios'
import qs from 'qs'
import { AxiosTransformer } from '../../src'

// axios.defaults.headers.common['test2'] = 222
//
// axios({
//   method: 'post',
//   url: "/config/post",
//   headers:{
//     test: 111
//   },
//   data: qs.stringify({
//     a: 'a'
//   })
// })

axios({
  transformRequest: [
    function(data):any{
      return qs.stringify(data)
    }
    ,...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse:[
    ...(axios.defaults.transformResponse as AxiosTransformer[])
    ,function(data):any{
      if(typeof data === 'object'){
          data['b'] = 'add b'
      }
      return data
    }
  ],
  method: 'post',
  url: '/config/post',
  data: {
    a: 'content a is a json object'
  }
}).then((res)=>{
  console.log(res.data)

  // response:  a: 'content a is a json object'
  // after response: a: 'content a is a json object' b: 'add b'
})
