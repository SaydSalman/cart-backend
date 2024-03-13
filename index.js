require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./Connection/db')
const router = require('./Routes/router')
const ShoplifyServer = express()
ShoplifyServer.use(cors())
ShoplifyServer.use(express.json())
ShoplifyServer.use(router)
const PORT = 3000 || process.env.PORT

ShoplifyServer.listen(PORT,()=>{
    console.log(`Shoplify Server Started at port :${PORT}`);
})

ShoplifyServer.get('/',(req,res)=>{
    res.send("<h1 >Server started.. Waiting for client request...</h1>")
})