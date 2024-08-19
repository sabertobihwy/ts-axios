import axios from '../../src/axios'

axios.post('/auth/post',{},{
  auth:{
    username: 'apple1',
    password:'www'
  }
}).then(res=>{
  console.log(res.data)
})
