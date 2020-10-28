const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


require('dotenv').config()
const app = express()


//Configure express application

app.use(express.json({limit:"2mb"}))







//Enabling Routes
const test = require('./auth/auth')

app.use([test])






////Starting Node Js Server
const port = process.env.PORT

app.listen(port,()=>{

console.log(`Server is running on Port ${port}`)

})



