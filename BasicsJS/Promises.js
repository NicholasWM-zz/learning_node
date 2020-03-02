// Forma de resolver Problema de Assincronismo com Promisses

/*
    0 - Obter um usuario
    1 - Obter numero de telefone de um user a partir de um id
    2 - Obter o endereço do usuario pelo Id
*/
const problem = ()=>{
    function obterUsuario(){
        setTimeout(()=>
            {
                return  {
                    id:1,
                    nome: 'Aladin',
                    dataNascimento: new Date()
                }
            }, 1000)
    }
    
    function obterTelefone(idUsuario){
        setTimeout(()=>
            {
                return {
                    ddd:11,
                    telefone: '119099',
                }
            }, 2000)
    }
    console.log(`
        O usuario será atribuido como undefined
        Pois o programa não aguardou a resposta assincrona da func obterUsuario
        Assim o id será undefined e o programa parará no TypeError.

        Resultado:
    `)
    const usuario = obterUsuario()
    const telefone = obterTelefone(usuario.id)
    console.log('usuario: ', usuario)
}

const resolution1 = () =>{
    
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
    
    console.log(`
        Utilizando Promises para substituir o CB hell causado no exemplo AsyncAndCBHell
        Utilizei o util.promisify para transformar uma funcao com callback em promise

        Como as chamadas são assincronas, aguarde alguns segundos.
        
        Resultado:`)
    
    //Importamos modulo do interno do node
    const util = require('util')

    //Permite converter uma funcao com callback em uma promise
    // Sem fazer alterações na mesma
    // Só funciona para callbacks com o primeiro argumento como null
    const obterEnderecoAsync = util.promisify(obterEndereco)
    const usuariosPromise = obterUsuario()
    
    usuariosPromise
    .then((usuario)=> 
        obterTelefone(usuario.id)
            .then(telefone=>(
                {usuario,telefone}
            )
        )
    )
    .then(({usuario, telefone})=> 
        obterEnderecoAsync(usuario.id)
            .then(endereco=>(
                {usuario, telefone, endereco}
            )
        )
    )
    .then(result2 => {
        console.log('result', result2)
    })
    .catch((error)=> {
        console.error(error)
    })
}

/* Descomente um abaixo para executar */

// problem()
resolution1()

