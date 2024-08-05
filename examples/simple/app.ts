import axios from '../../src'

axios({
  method: 'GET',
  url: "/simple/get",
  params: {
    a:1,
    b:2
  }
})
