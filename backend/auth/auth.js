const router = require('express').Router()



///Hash and Encryption
const bcrypt = require('bcrypt')


//Middleware





router.post('/test',async (req,res)=>{
    res.send('test')
})




module.exports = router