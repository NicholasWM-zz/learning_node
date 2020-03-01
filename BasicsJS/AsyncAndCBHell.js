// Forma de resolver Problema de Assincronismo

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
    function obterUsuario(callback){
        setTimeout(()=>
            {
                return callback(null , {
                    id:1,
                    nome: 'Aladin',
                    dataNascimento: new Date()
                })
            }, 1000)
    }
    
    function obterTelefone(idUsuario, callback){
        setTimeout(()=>
            {
                return callback(null ,{
                    ddd:11,
                    telefone: '119099',
                })
            }, 2000)
    }
    
    function obterEndereco(idUsuario, callback){
        setTimeout(()=>
        {
            return callback(null ,{
                rua:'Rua dos bobos',
                numero: 0,
            })
        }, 2000)
    }
    
    console.log(`
        Executando através de funções de callback
        Conseguimos fazer com que o programa aguarde os resultados
        Assim temos a saida desejada, porem caimos no Callback Hell
        E outros problemas que complicam a lógica quando queremos fazer alguma alteração especifica
        na camada de algum dos callbacks que está aninhado no CallbackHell.
        
        Como as chamadas são assincronas, aguarde alguns segundos.
        
        Resultado:`)
    obterUsuario(function resolverUsuario(error, usuario){
        if(error){
            console.error('Deu ruim em USUARIO: ', erro)
            return
        }
        obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
            if(error1){
                console.error('Deu ruim em TELEFONE: ', erro1)
                return
            }
            obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
                if(error2){
                    console.error('Deu ruim em TELEFONE: ', erro2)
                    return
                }
                console.log(`
                NOME: ${usuario.nome},
                Endereço:${endereco.rua},${endereco.numero},
                Telefone: (${telefone.ddd})${telefone.telefone}`)
            })
        })
    })
}

/* Descomente um abaixo para executar */

// problem()
// resolution1()

