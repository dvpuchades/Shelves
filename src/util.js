//Made to manage logged users

const bcrypt = require('bcrypt-nodejs')
const database = require('./database')


/**
 * La idea es crear un middleware que mediante el metodo
 * de bcrypt recoja la informacion de un req.body.hash
 * y cambia el hash por el usuario al que corresponde
 */

function check(hash){
    let db = database.getConnection()
    let result = db.get('users').find((user) =>{
        if(bcrypt.compareSync(user.name, hash)){
            return user
        }
    }).value().name
    return result
}

/**
 * Código para una consola de comandos que ayude al
 * administrardor a controlar el server
 */

/*const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.on('line', (input) => {
    //console.log(`Received: ${input}`)
    
    if(input == 'create code'){
        rl.question('keyword?  ', (keyword) => {
            rl.question('number of uses?  ', (uses) =>{
                database.createCode(keyword, uses)
            })
        })
    }
})*/

module.exports = {
    check
}