import axios from '../../src/axios'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 222

axios({
  method: 'post',
  url: "/config/post",
  headers:{
    test: 111
  },
  data: qs.stringify({
    a: 'a'
  })
})
