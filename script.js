const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
promessa.then(quizzes)

function quizzes(resposta){
    console.log(resposta.data)
}