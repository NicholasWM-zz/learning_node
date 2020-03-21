const ICrud = require('./base/interfaces/ICrud')
const Sequelize = require('sequelize')

//Classe concreta que implenta as funções de fato
class Postgres extends ICrud {
    constructor (){
        super()
        this._driver = null
        this._herois = null
    }
    
    async isConnected(){
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error()
        }
    }
    async defineModel(){
        this._herois = this._driver.define('herois', {
            id:{
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement:true
            },
            nome:{
                type:Sequelize.STRING,
                required:true
            },
            poder: {
                type: Sequelize.STRING,
                required: true,
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false,
        })
        await this._herois.sync()
    }
    async connect(){
        this._driver = new Sequelize('heroes', 'nicholaswm', 'senhasecreta',
        {
            host: 'localhost',
            dialect:'postgres',
            quoteIdentifiers: false,
            operatorAliases: false
        })
        await this.defineModel()
    }

    async create(item){
        const {dataValues} = await this._herois.create(item, {raw:true})
        return dataValues
    }
    async read(item = {}){
        console.log(JSON.stringify(item))
        return this._herois.findAll({raw:true, where:item})
    }
    async update(id, item){
        return await this._herois.update(item, {where:{id}})
    }
    async delete(id){
        const query = id?{id}:{}
        return await this._herois.destroy({where:query})
    }
}

module.exports = Postgres