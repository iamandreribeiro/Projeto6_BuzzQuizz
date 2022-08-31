// const arrayQuizzes = []
const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
promessa.then(quizzes)

function quizzes(resposta){
    const array = resposta.data
    console.log(array)
    const ul = document.querySelector('.quizzes')
    for(let i = 0; i < array.length; i++){
        ul.innerHTML = ul.innerHTML + `<li><h1>${array[i].title}</h1><div class="gradient"></div><img src="${array[i].image}" alt="${array[i].title}" /></li>`
    }
    
}