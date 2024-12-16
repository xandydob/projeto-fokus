const html = document.querySelector('html'); //seleciona o html
const focoBt = document.querySelector('.app__card-button--foco');//seleciona o botão foco
const curtoBt = document.querySelector('.app__card-button--curto');//seleciona o botrão curto
const longoBt = document.querySelector('.app__card-button--longo');//seleciona o botão descanso longo
const banner = document.querySelector('.app__image'); //seleciona as imagnes que tenho que trocar ao clicar nos botões
const titulo = document.querySelector('.app__title'); //selecionando os títulos do html
const botoes =document.querySelectorAll('.app__card-button'); //selecionando os botões no html
const startPauseBt = document.querySelector('#start-pause');//selecionando o botão começar no html através do id
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOUPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500; // 25 minutos é 1500 segundos
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {    
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    /*html.setAttribute('data-contexto', 'foco');
    banner.setAttribute('src', '/imagens/foco.png'); // muda o atributo da imagem ao clicar*/
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})//mudando atributo das páginas ao clicar no botão

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
})
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>  
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa Curta</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong"> Faça uma pausa longa</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => { //parando o temporizador quando chegar no 0.

    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play(); 
        //musicaAlarme.play();
        alert('Tempo finalizado!');
        zerar();//chamando a função para zerar e retornar o intervalo em zero.
       // musicaAlarme.pause();
        return; // para o temporizador
    }
    
    //decrementar o temporizador
    //iniciar();//chamando a função para executar automatizado a contagem regressiva.
    tempoDecorridoEmSegundos -= 1; //menor ou igual a 1 decrementando
    //console.log('Temporizador: ' +tempoDecorridoEmSegundos);//concatenação = relacionamento, ligação de idéias. 
    mostrarTempo();
    }


startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){//função para decrementar
if(intervaloId){//zerando e pauzando o intervalo id
   audioPausa.play();
   zerar();
   return;
}
audioPlay.play();
intervaloId = setInterval(contagemRegressiva, 1000);
/* chamando a variável e utilizando o método setinterval para executar 
uma função ou código em determinado periodod e tempo. o setInterval recebe sempre dois parâmentros, o prrimeiro ser executado
a função contagem regressiva e o segundo com quanto tempo que quer que seja executado 1000 quer dizer 1 segundo, milesegundos.*/
iniciarOuPausarBt.textContent = "Pausar"; //troca a palavra inciar por pausar
iniciarOUPausarBtIcone.setAttribute('src', `./imagens/pause.png`); // troca a imagem do botão

}


function zerar() {//zerando a contagem regressiva
    clearInterval(intervaloId); // limpando o intervaloid
    iniciarOuPausarBt.textContent = "Começar"; /*trocando a palavra ao clicar no botão
    - observação o textcontent é só para inserir texto quando se quiser inserir tag do html tem que usar o Inmerhtml */
    iniciarOUPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null; //atribuindo null 
 }

 function mostrarTempo() { // função que coloca o temporizador na tela
    //const tempo = tempoDecorridoEmSegundos; //trazendo o tempo para a função
    const tempo = new Date (tempoDecorridoEmSegundos * 1000); //milesegundos
    const temmpoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${temmpoFormatado}`;//template string  //exibir o texto na tela

 }

 mostrarTempo();