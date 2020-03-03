const {obterPessoas} = require('./service')
Array.prototype.meuReduce = function(callback, valorInicial){
    let valorFinal = typeof valorInicial !== undefined ? valorInicial:this[0]
    for (let index = 0; index < this.length ; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}
async function main(){
    try {
        // const {results} = await obterPessoas('a')
        // const pesos = results.map(item => parseInt(item.height))
        // const total = [].reduce((anterior, prox)=> {
        //     return anterior + prox
        // },0)
        // console.log(pesos)

        const minhaLista = [
            ['erick', 'wendel'],
            ['nodebr', 'nerdzao']
        ]

        const total = minhaLista.meuReduce((anterior, prox)=>
            anterior.concat(prox)
        ,[])
        console.log(total)
    } catch (error) {
        console.error(error)
    }
}
main()