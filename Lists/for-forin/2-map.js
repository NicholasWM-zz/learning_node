const service= require('./service')

Array.prototype.meuMap = function(callback){
    const novoArrayMapeado = []
    for (let indice = 0; indice < this.length -1 ; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}
async function main(){
    try {
        const {results} = await service.obterPessoas('a')
        const resForEach = (results)=>{
            // --------------------------------------------
            // --------------------------------------------
            console.time('foreach')
            const names = []
            results.forEach(({name}) => names.push(name));
            console.timeEnd('foreach')
            console.log(names)
            // --------------------------------------------
            // --------------------------------------------
        }
        const resMapTradicional = (results) =>{
            console.time('map')
            const names = results.map(({name})=>name)
            console.timeEnd('map')
            console.log(names)
        }

        const resMeuMap = (results)=>{
            console.time('meuMap')
            const names = results.meuMap((pessoa, indice)=>{
                return `[${indice}]${pessoa.name}`
            })
            console.timeEnd('meuMap')
            console.log(names)

        }
        resForEach(results)
        resMapTradicional(results)
        resMeuMap(results)
    } catch (error) {
        console.error(error)
    }
}

main()