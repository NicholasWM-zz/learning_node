const EventEmitter = require('events')
class MeuEmissor extends EventEmitter{

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
const nomeEvento2 = 'usuario:click'

meuEmissor.on(nomeEvento, (click)=>{
    console.log('um usuario clicou: ', click)
})


let count = 0

setInterval(()=> {
    meuEmissor.emit(nomeEvento, 'na barra de rolagem' + count++)
}, 1000)
