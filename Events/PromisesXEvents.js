const stdin = process.openStdin()

const eventosSemPromises = ()=>{
    function main(){
        stdin.addListener('data', (value)=>{
            console.log("Foi digitado: ",value.toString().trim())
        })
    }
    main()
}
const eventosComPromises = ()=>{
    // Exemplo mostrando porque nao devemos usar promises para eventos continuos
    const stdin = process.openStdin()
    function main(){
        return new Promise((resolve, reject)=>{
            stdin.addListener('data', (value)=>{
                return resolve(value)
            })
        })
    }
    
    console.log(`
        Utilizando promises para eventos como inputs no terminal...
        O resultado é apenas retornado uma vez, pois as Promises só captam o valor uma vez

        Para ações continuas devemos usar EventEmitter.

        Resultado:
`)
    main()
    .then(result => console.log('result', result.toString()))
}