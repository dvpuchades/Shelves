const express = require('express')
const app = express()
const path = require('path')
const database = require('./database')
const multer = require('multer')
const bodyParser = require('body-parser')
const util = require('./util')
const cookieParser = require('cookie-parser')
const { hash } = require('bcrypt-nodejs')
const fs = require('fs')

//settings
database.createConnection()
app.set('port', 4000) //global variable
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use( express.static(path.join(__dirname, 'public')))  //para que los html encuentren las imgs
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = 'uploads/' + util.check(req.cookies.id) + '/'
        try {
            stat = fs.statSync(dir)
        } catch (err) {
            fs.mkdirSync(dir)
        }
        console.log(dir)
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

app.use(multer({
    storage: storage,
    dest: 'uploads/'
}).array('uploaded_file'))

//routes
app.use(require('./routes'))

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})