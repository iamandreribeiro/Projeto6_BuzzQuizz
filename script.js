let arrayQuizzes = []
let contadorAcertos = 0
let contadorRespostas = 0
let questions = []
let elementoClicado
let arrayRespostas = []
let id
pegarQuizzes()

//SOLICITAR OS QUIZZES NA API
function pegarQuizzes() {
const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
promessa.then(quizzes)
}

//RENDERIZAR OS QUIZZES NA TELA INICIAL
function quizzes(resposta){
    arrayQuizzes = resposta.data
    const ul = document.querySelector('.quizzes')

    for(let i = 0; i < arrayQuizzes.length; i++){
        const idElemento = arrayQuizzes[i].id
        ul.innerHTML = ul.innerHTML + `<li class="${idElemento}" onclick="novaPag(this)" data-identifier="quizz-card"><h1>${arrayQuizzes[i].title}</h1><div class="gradient"></div><div class='img-pag1'><img src="${arrayQuizzes[i].image}" alt="${arrayQuizzes[i].title}"/></div></li>
        `
    }
}

//AO CLICAR NO QUIZZ LEVAR NA TELA DE PEGUNTAS
function novaPag(element){
    id = element.classList.value
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promessa.then(quizzPergunta)
    const main = document.querySelector('main')
    main.classList.add('display')
}

//TELA DE PERGUNTAS
function quizzPergunta(resposta){
    elementoClicado = resposta.data

    const image = resposta.data.image
    const title = resposta.data.title
    questions = resposta.data.questions
    const body = document.querySelector('body')
    body.innerHTML = ''
    body.innerHTML = body.innerHTML + `<header>BuzzQuizz</header><div class="main2">
    <div class="top" ><div class="escuro"></div><h1>${title}</h1><img src="${image}"/> </div>`

    for(let i = 0; i < questions.length; i++){
    body.innerHTML = body.innerHTML + `<div class="pergunta" data-identifier="question">
      <div class="tituloPergunta" style="background-color:${questions[i].color}"><h1>${questions[i].title}
      </h1></div>
      <div class="respostas">
      </div>`
      const respostasCaixa = document.querySelectorAll('.respostas')
      
      for(let j = 0; j < questions[i].answers.length; j++){
        // respostasCaixa[i].innerHTML = respostasCaixa[i].innerHTML +  
        arrayRespostas.push(`<div class="resposta-img ${questions[i].answers[j].isCorrectAnswer}" onclick="avaliarResposta(this)" data-identifier="answer"><img src="${questions[i].answers[j].image}" alt=""><h1>${questions[i].answers[j].text}</h1></div>`)
        
        // console.log(arrayRespostas)
        
      }
      arrayRespostas.sort(comparador)
      respostasCaixa[i].innerHTML = arrayRespostas
      respostasCaixa[i].innerHTML = respostasCaixa[i].innerHTML.replaceAll(",", "");
      arrayRespostas = []
    }
    
   body.innerHTML = body.innerHTML + `<div class="nivel display" data-identifier="quizz-result"></div>   <div class = "botoes"><button onclick='reiniciarQuizz(this)'>Reiniciar Quizz</button>
   <div class="voltar" onclick='voltarHome()'>Voltar pra home</div></div>`
}

//EMBARALHAR AS PERGUNTAS
function comparador() {
  return Math.random() - 0.5;
}

//MARCAR RESPOSTA CERTA OU ERRADA AO CLICAR(TELA DE PERGUNTAS) E EXIBIR A TELA DE RESULTADOS
function avaliarResposta(element){
  contadorRespostas++
  if(element.classList[1] === 'true'){
    contadorAcertos++
  }
  if(element.classList[2] !== 'opacity'){
  const allAswers = element.parentNode.children
  for(let i = 0; i < allAswers.length; i++){
    allAswers[i].classList.add('opacity')
    if(allAswers[i].classList[1] === "false"){
      allAswers[i].classList.add('incorreto')
    } else {
      allAswers[i].classList.add('correto')
    }
  }
  element.classList.remove('opacity')
  }
  if(contadorRespostas === questions.length){ 
    const level = document.querySelector('.nivel')
    level.classList.remove('display')
    const porcentagem = Math.trunc((contadorAcertos * 100) / contadorRespostas)
    const elementoLevel = elementoClicado.levels
    
    for(let i = 0; elementoLevel.length > i ; i++){
      if( porcentagem >= elementoLevel[i].minValue ){
        const repostaNivel = document.querySelector('.nivel')
        repostaNivel.innerHTML = `<div class="tituloNivel"><h1>${elementoLevel[i].title}</h1></div><div class="respostasNivel">
        <img src="${elementoLevel[i].image}"/><div class="caixaTexto">${elementoLevel[i].text}
        </div></div></div>`
      }
    }
  }
  setTimeout(nextElement, 2000, element)
}

//SCROLL PARA PROXIMA PERGUNTA
function nextElement(element){
  const divPerguntas = element.parentNode.parentNode
  divPerguntas.nextSibling.scrollIntoView({behavior: 'smooth'})
}

function voltarInico(element) {
  const body = element.parentNode.parentNode
  body.scrollIntoView({behavior: 'smooth'})
}

function reiniciarQuizz(element) {
  contadorAcertos = 0
  contadorRespostas = 0
  const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
  promessa.then(quizzPergunta)
  voltarInico(element)

}

function voltarHome() {
  contadorAcertos = 0
  contadorRespostas = 0
  id = ''
  document.location.reload()
}


