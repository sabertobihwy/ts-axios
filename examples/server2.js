const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()
app.use(router)

const cors = {
  'Access-Control-Allow-Origin':'http://localhost:8080',
  'Access-Control-Allow-Credentials':true,
  'Access-Control-Allow-Methods':'POST,GET,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type'
}

router.post('/more/server2',function(req,res){
  res.cookie('3pcookie','bbb',{sameSite:'none',secure:true})
  res.set(cors)
  console.log(req.cookies);
  console.log(req)
  res.json(req.cookies)
})

router.options('/more/server2',function(req,res){
  res.cookie('3pcookie','bbb',{sameSite:'none',secure:true})
  res.set(cors)
  res.end()
})

const port = 8088
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
