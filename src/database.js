const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bcrypt = require('bcrypt-nodejs')

let adapter
let db

function createConnection(){
    adapter = new FileSync('db.json')
    db = low(adapter)
    db.defaults({ users:[], codes: [{ string: 'TEST', uses:999 }] })
        .write()
}

const getConnection = () => db

function loginUser(name, password){
    const res = db.get('users')
        .find({name: name})
        .value()
    if(res == undefined){ return false }
    return bcrypt.compareSync(password, res.password)
}

function signupUser(name, password, code){
    const existingUser = db.get('users')
        .find({name})
        .value()
    console.log(existingUser)
    if(useCode(code) && existingUser == undefined){
        let hash = bcrypt.hashSync(password)
        console.log('Registrado')
        db.get('users')
            .push({ name: name, password: hash, 
                code: code })
            .write()
        return true
    }
    return false
}

function createCode(string, uses){
    db.get('codes')
            .push({string: string, uses: uses})
            .write()
}

function useCode(string){
    let c = db.get('codes').find({string: string}).value()
    if( c != undefined && c.uses > 0 ){
        db.get('codes').pull(c).write()
        c.uses --
        db.get('codes').push(c).write()
        return true
    }
    return false;
}

module.exports = {
    createConnection,
    getConnection,
    loginUser,
    signupUser,
    createCode,
    useCode
}