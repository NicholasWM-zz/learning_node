const service= require('./service')

async function main(){
    try {
        const {results} = await service.obterPessoas('a')
        const names = []
// --------------------------------------------
// --------------------------------------------
        console.time('for')
        for (let i = 0; i < results.length; i++) {
            const {name} = results[i];
            names.push(name)
        }
        console.timeEnd('for')
// --------------------------------------------
// --------------------------------------------
        console.time('forin')
        for (const i in results) {
            const {name} = results[i];
            names.push(name)
        }
        console.timeEnd('forin')
// --------------------------------------------
// --------------------------------------------
        console.time('forof')
        for({name} of results){
            names.push(name)
        }
        console.timeEnd('forof')
// --------------------------------------------
// --------------------------------------------
        console.log(names)
    } catch (error) {
        console.error(error)
    }
}

main()