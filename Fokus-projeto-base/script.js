const mensagem = "mensagem 1"
const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--lenha')
const curtoBtn = document.querySelector('.app__card-button--floresta')
const longoBtn = document.querySelector('.app__card-button--chuva')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarImg = document.querySelector('#start-pause img')
const iniciarOuPausarBtn = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('sons/play.wav')
const audioPause = new Audio('sons/pause.mp3')
const audioBeep = new Audio('sons/beep.mp3')
const startPauseBtn = document.querySelector('#start-pause')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {

    if (musica.paused) {
        musica.play()

    } else {
        musica.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('lenha')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('floresta')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('chuva')
    longoBtn.classList.add('active')
})



function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "lenha":

            titulo.innerHTML = ` 
                O fogo dança, <br> a mente foca,<br>
                <strong class="app__title-strong">Estude com a energia das chamas.</strong>
            `
            break;

        case "floresta":
            titulo.innerHTML = ` 
                Que tal dar uma respirada? 
                <strong class="app__title-strong">dê uma pausa curta.</strong> 
            `
            break;

        case "chuva":
            titulo.innerHTML =  `
                Hora de voltar à superficie, <br>
                <strong class="app__title-strong">dê uma pausa longa.</strong>
            `
        default:
            break
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioBeep.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


startPauseBtn.addEventListener ('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId) {
        audioPause.play()
        zerar ()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = "Pausar"
    iniciarOuPausarImg.setAttribute('src', 'imagens/pause.png')
}

function zerar () {
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar"
    iniciarOuPausarImg.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute : '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()