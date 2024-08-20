const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty');
const path = require('path')
const atob = require('atob')
require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)
app.use(cookieParser())

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname,{
  setHeaders(res){
    res.cookie('XSRF-TOKEN-D','123abc')
  }}))

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multipart({uploadDir: path.resolve(__dirname,'upload-file')}))

const router = express.Router()
app.use(router)

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
registerCancelRouter()
registerMoreRouter()

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerSimpleRouter(){
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter(){
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data',(chunck)=>{
      if(chunck){
        msg.push(chunck)
      }
    })
    req.on('end',()=>{
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter(){
  router.get('/error/get',function(req,res){
    if(Math.random() > 0.5){
      res.json({
        msg: 'hello'
      })
    }else{
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout',function(req,res){
    setTimeout(()=>{
      res.json({
        msg: 'timeout test ok'
      })
    },3000)
  })
}

function registerExtendRouter(){
  // router.post('/extend/post', function(req, res) {
  //   res.json(req.body)
  // })
  // router.options('/extend/options', function(req, res) {
  //   res.json(req.body)
  // })
  // router.delete('/extend/delete', function(req, res) {
  //   res.json(req.body)
  // })
  // router.head('/extend/head', function(req, res) {
  //   res.json(req.body)
  // })
  // router.put('/extend/put', function(req, res) {
  //   res.json(req.body)
  // })
  // router.patch('/extend/patch', function(req, res) {
  //   res.json(req.body)
  // })
  router.get('/extend/get',function(req,res){
    res.json({
      code: '202',
      message: 'User msg',
      result: {
        name: 'mynameis',
        age: 123
      }
    })
  })
}

function registerInterceptorRouter(){
  router.get('/interceptor/get',function(req,res){
    res.end(`This is server's response`)
  })
}

function registerConfigRouter(){
  router.post('/config/post',function(req,res){
    res.json(req.body)
  })
}

function registerCancelRouter(){
  router.get('/cancel/get',function(req,res){
    setTimeout(()=>{
      res.end()
    },1000)
  })
  router.post('/cancel/post',function(req,res){
    setTimeout(()=>{
      res.end()
    },1000)
  })
}

function registerMoreRouter(){
  router.get('/more/get',function(req,res){
    //console.log(req)
    res.json(req.cookies)
  })

  router.post('/more/upload',function(req,res){
    console.log(req.body, req.files)
    res.json('upload success!!')
  })

  router.post('/auth/post',function(req,res){
    const encoded = req.headers.authorization
    const [type,credentials] = encoded.split(' ')
    const decoded = atob(credentials)
    console.log(decoded)
    const [username,pwd] = decoded.split(':')
    if(type === 'Basic' && username === 'apple' && pwd === 'www'){
      res.json('passed!')
    }else{
      res.status(401)
      res.end('unauthorized!!')
    }
  })

  router.get('/more/304',function(req,res){
    res.status(304)
    res.end()
  })

  router.get('/more/get',function(req,res){
    res.json(req.query)
  })
}
