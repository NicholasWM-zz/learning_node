const ICrud = require('./base/interfaces/ICrud')

//Classe concreta que implenta as funções de fato
class Postgres extends ICrud {
    constructor (){
        super()
    }

    create(item){
        console.log("O item foi salvo em Postgres");
    }
}

module.exports = Postgres