import axios from '../../src/axios'

// axios({
//   method: 'POST',
//   url: "/extend/post",
//   data: {
//     msg: 'this is axios(POST)'
//   }
// })
//
// axios.request({
//   method: 'POST',
//   url: "/extend/post",
//   data: {
//     msg: 'this is axios.request(POST)'
//   }
// })
//
// axios.get('/extend/get')
// axios.options('/extend/options')
// axios.delete('/extend/delete')
// axios.head('/extend/head')
// axios.post('/extend/post',{msg:'postpostpost'})
// axios.put('/extend/put',{msg:'putputput'})
// axios.patch('/extend/patch',{msg:'patchpatchpatch'})

// -- test overload
// axios("/extend/post",{
//   method: 'POST',
//   data: {
//     msg: 'this is axios(POST)'
//   }
// })
// axios({
//   method: 'POST',
//   url: "/extend/post",
//   data: {
//     msg: 'this is axios(POST)'
//   }
// })

// test Resp<T>
interface RespData<T>{
  code: string
  message: string
  result: T
}

interface User{
  name: string
  age: number
}

function getUser<T>(){
  return axios<RespData<T>>('/extend/get')
    .then(res=> res.data)
    .catch(e => console.log(e))
}

async function testUser(){
  const resp =  await getUser<User>()
  if(resp){
    console.log(resp)
    console.log(resp.result.name)
  }
}

testUser()


