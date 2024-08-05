import axios from '../../src'

axios({
  method: 'GET',
  url: "/base/get",
  params: {
    a:1,
    b:2
  }
})

axios({
  method: 'GET',
  url: "/base/get",
  params: {
    foo:1,
    bar:['bar1','bar2']
  }
})

axios({
  method: 'GET',
  url: "/base/get",
  params: {
    foo:{
      bar: 'obj'
    }
  }
})

axios({
  method: 'GET',
  url: "/base/get",
  params: {
    date: new Date()
  }
})
axios({
  method: 'GET',
  url: "/base/get",
  params: {
    foo:'@$:'
  }
})
axios({
  method: 'GET',
  url: "/base/get",
  params: {
    foo:null,
    bar: 'bar'
  }
})
axios({
  method: 'GET',
  url: "/base/get#hash",
  params: {
    foo:'hashcode'
  }
})
axios({
  method: 'GET',
  url: "/base/get?exist=1",
  params: {
    foo:'bar'
  }
})
