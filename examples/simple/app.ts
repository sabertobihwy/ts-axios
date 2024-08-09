import axios from '../../src/axios'

axios({
  method: 'GET',
  url: "/simple/get",
  params: {
    a:1,
    b:2
  }
})
