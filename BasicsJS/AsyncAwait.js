function obterUsuario(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>
            {
                return resolve({
                    id:1,
                    nome: 'Aladin',
                    dataNascimento: new Date()
                })
            }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>
            {
                return resolve({
                    ddd:11,
                    telefone: '119099',
                })
            }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
        setTimeout(()=>{
            return callback(null, {
                rua:'Rua dos bobos',
                numero: 0,
            })
        }, 2000)
}
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


async function main(){
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        const telefone = await obterTelefone(usuario.id)
        const endereco = await obterEnderecoAsync(usuario.id) 
        console.log(usuario, telefone, endereco)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error(error)
    }

    try {
        console.time('medida-promiseAll')
        const usuario = await obterUsuario()
        const resultado = await Promise.all([
            obterTelefone(usuario.id),obterEnderecoAsync(usuario.id)
        ])
        console.log(usuario, resultado)
        console.timeEnd('medida-promiseAll')
    } catch (error) {
        console.error(error)
    }
}
main()