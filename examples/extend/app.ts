import axios from '../../src/axios'

axios({
  method: 'POST',
  url: "/extend/post",
  data: {
    msg: 'this is axios(POST)'
  }
})

axios.request({
  method: 'POST',
  url: "/extend/post",
  data: {
    msg: 'this is axios.request(POST)'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post',{msg:'postpostpost'})
axios.put('/extend/put',{msg:'putputput'})
axios.patch('/extend/patch',{msg:'patchpatchpatch'})
