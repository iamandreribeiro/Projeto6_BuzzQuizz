let arrayQuizzes = []
pegarQuizzes()

function pegarQuizzes() {
const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
promessa.then(quizzes)
}

function quizzes(resposta){
    arrayQuizzes = resposta.data
    console.log(arrayQuizzes)
    const ul = document.querySelector('.quizzes')
    
    
    for(let i = 0; i < arrayQuizzes.length; i++){
        const idElemento = arrayQuizzes[i].id
        ul.innerHTML = ul.innerHTML + `<li class="${idElemento}" onclick="novaPag(this)"><h1>${arrayQuizzes[i].title}</h1><div class="gradient"></div><img src="${arrayQuizzes[i].image}" alt="${arrayQuizzes[i].title}" /></li>
        `
    }
    
}

function novaPag(element){
    const id = element.classList.value
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promessa.then(quizzPergunta)
    const main = document.querySelector('main')
    main.classList.add('display')
    // const main2 = document.querySelector('.main2')
    // main2.classList.remove('display')
}

function quizzPergunta(resposta){
    const image = resposta.data.image
    const title = resposta.data.title
    const questions = resposta.data.questions
    const body = document.querySelector('body')
    body.innerHTML = body.innerHTML + ` <div class="main2">
    <div class="top" ><h1>${title}</h1><img src="${image}"/> </div>`

    for(let i = 0; i < questions.length; i++){
        
    body.innerHTML = body.innerHTML + `<div class="pergunta">
      <div class="tituloPergunta" style="background-color:${questions[i].color}"><h1>${questions[i].title}
      </h1></div>
      <div class="respostas">
      </div>`
      const respostasCaixa = document.querySelectorAll('.respostas')
      console.log(questions[i].answers)
      
      for(let j = 0; j < questions[i].answers.length; j++){

        respostasCaixa[i].innerHTML = respostasCaixa[i].innerHTML +  `<div class="reposta-img"><img src="${questions[i].answers[j].image}" alt=""><h1>${questions[i].answers[j].text}</h1></div>
      `
      }
    }
   body.innerHTML = body.innerHTML + `
   </div>`

}


