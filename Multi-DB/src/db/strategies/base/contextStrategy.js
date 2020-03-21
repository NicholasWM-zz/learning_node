const ICrud = require('./interfaces/ICrud')
//Classe abstrate que chama os metodos de acordo com oque foi passado no construtor
class ContextStrategy extends ICrud{
    constructor(strategy){
        super()
        this._database = strategy
    }

    create(item){
        return this._database.create(item)
    }
    read(query){
        return this._database.read(query)
    }
    update(id, item){
        return this._database.update(id, item)
    }
    delete(id){
        return this._database.delete(id)
    }
    isConnected(id){
        return this._database.isConnected(id)
    }
}

module.exports = ContextStrategy