const ICrud = require('./base/interfaces/ICrud')
//Classe concreta que implenta as funções de fato
class MongoDB extends ICrud {
    constructor (){
        super()
    }

    create(item){
        console.log("O item foi salvo em MongoDB");
        
    }
}

module.exports = MongoDB