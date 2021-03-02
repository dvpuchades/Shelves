const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const database = require('./database')
const bcrypt = require('bcrypt-nodejs')
const util = require('./util')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const fs = require('fs');
const path = require('path')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/upload', (req, res) => {
    let user = util.check(req.cookies.id)
    console.log(user + ' has uploaded:')
    console.log(req.file)
    //res.send('uploaded')
    res.sendFile(path.join(__dirname ,'views/main.html'))
})

router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname ,'views/login.html'))
})

router.get('/login', (req, res)=> {
    res.sendFile(path.join(__dirname ,'views/login.html'))
})

router.get('/signup', (req, res)=> {
    res.sendFile(path.join(__dirname ,'views/signup.html'))
})

router.get('/list', (req, res)=> {
    let list = fs.readdirSync('uploads/' + req.cookies.route)
    res.send(JSON.stringify(list))
})


router.get('/download/:filename', function(req, res){ 
    let file = 'uploads/david/' + req.params.filename 
    res.download(file); // Set disposition and send it. 
});

router.post('/main', (req, res)=>{
    let user = req.body.user
    let password = req.body.password
    if(database.loginUser(user, password)){
        hash = bcrypt.hashSync(user)
        //logged.insertUser(user)
        res.cookie('id', hash)
        res.cookie('route', '/' + user)
        //res.render('main', {id: hash})
        res.sendFile(path.join(__dirname ,'views/main.html'))
    }else{
        res.sendFile(path.join(__dirname ,'views/login.html'))
    }
})

router.post('/register', (req, res)=>{
    let user = req.body.user
    let password = req.body.password
    let code = req.body.code
    console.log(user)
    if(database.signupUser(user, password, code)){
        hash = bcrypt.hashSync(user)
        //logged.insertUser(user)
        res.cookie('id', hash)
        dir = 'uploads/' + util.check(req.cookies.id) + '/' //buscamos el directorio (veremos si ejecuta esto antes que multer)
        //res.render('main', fs.readdirSync(dir, 'utf8', true)) //pasamos a render una lista con los ficheros de la carpeta
        res.sendFile(path.join(__dirname ,'views/main.html'))
    }else{
        res.sendFile(path.join(__dirname ,'views/signup.html'))
    }
})


module.exports = router