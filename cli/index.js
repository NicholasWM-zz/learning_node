const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')
async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]',  "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "ID do Herói")

        .option('-c, --cadastrar', "Cadastrar Herói")
        .option('-l, --listar', "Listar Heróis")
        .option('-r, --remover', "Remover um Herói pelo id")
        .option('-a, --atualizar [value]', "Atualiza um Herói pelo id")
        .parse(process.argv)

    const heroi = new Heroi(Commander)
    
    try {
        if(Commander.cadastrar){
            delete heroi.id // Deleta a chave id caso seja undefined, pra n dar b.o no IF
            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Herói nao foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado com sucesso')
        }
        if(Commander.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return ;
        }
        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)
            resultado ? console.log("Deletado com sucesso"): console.error("Erro ao remover!");
            
            return ;
        }
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar)
            delete heroi.id
            // remover todas as chaves que estiverem como undefined
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            resultado ? console.log("Atualizado com sucesso"): console.error("Erro ao Atualizar!");
            return ;
        }
    } catch (error) {
        console.error(error)
    }
}

main()