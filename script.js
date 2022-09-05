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
    
    if(localStorage !== undefined){
    for(let i = 0; i < localStorage.length; i ++){
      const criarQuizz = document.querySelector('.crieSeuQuizz')
      criarQuizz.classList.remove('crieSeuQuizz')
      criarQuizz.classList.add('seusQuizz')
      const buttonQuizz = document.querySelector('.criar')
      buttonQuizz.classList.remove('display')
      buttonQuizz.classList.remove('criar')
      buttonQuizz.classList.add('redondo')
      buttonQuizz.innerHTML = '+'
      const idElemento = localStorage.key([i])
      const listaSerializada = localStorage.getItem(`${idElemento}`)
      const lista = JSON.parse(listaSerializada)
      console.log(lista.title)
      criarQuizz.innerHTML = criarQuizz.innerHTML + `<li class="${idElemento}" onclick="novaPag(this)" data-identifier="quizz-card"><h1>${lista.title}</h1><div class="gradient"></div><div class='img-pag1'><img src="${lista.image}" alt="${lista.title}"/></div></li>`
      // const listaSerializada = JSON.stringify(quizz); // Pegando de volta a string armazenada na chave "lista"
  
      // const quizzLocalStorage = JSON.parse(listaSerializada); // Transformando a string de volta na array original
  
      console.log(localStorage.length)
    }

  } if(localStorage.length === 0) {
    const seus = document.querySelector('.seusQuizzesText')
    seus.classList.add('display')
    const criarQuizz = document.querySelector('.crieSeuQuizz')
      criarQuizz.innerHTML = `<h1>Você não criou nenhum quizz ainda :(</h1>
      <button class="criar" onClick="tela1()">Criar Quizz</button>`
  }
    // if(quizzLocalStorage !== undefined){
    //   const criarQuizz = document.querySelector('.crieSeuQuizz')
    //   criarQuizz.innerHTML = ''
    //   console.log(quizzLocalStorage.length)
    //   for(let i = 0; i < quizzLocalStorage.length; i++){
        
        // const idElemento = quizzLocalStorage[i].id
        // criarQuizz.innerHTML = '' `<li class="${idElemento}" onclick="novaPag(this)" data-identifier="quizz-card"><h1>${arrayQuizzes[i].title}</h1><div class="gradient"></div><div class='img-pag1'><img src="${arrayQuizzes[i].image}" alt="${arrayQuizzes[i].title}"/></div></li>
        // `
    // }
      
      
      
    // }
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

// Começo do meu código(criacao quizz)
let titulo;
let imagem;
let perguntas;
let niveis;

// Teste pra criação/preenchimento do objeto?
let vetorPerguntas = [];
let vetorNiveis = [];   
let quizz = {
    title: titulo,
	image: imagem,
    questions: [],
    levels: []
}

function inicio() {
    window.location.reload();
}

function tela1() {
    setTimeout(() => {
        alert(`
    📚 Requisitos para criação do Quizz:

    • Título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.
    • URL da Imagem deve ter um formato válido.
    • No mínimo 3 perguntas.
    • No mínimo 2 níveis.
    `);
    }, 200);

    console.log("Executando Tela 1");

    // Limpa o HTML da tag main
    let main = document.querySelector("main");
    main.innerHTML = "";

    // Criação de elemento div
    let div = document.createElement("div");

    // Adiciona elemento div na tag main
    let cria = main.appendChild(div);
    cria.classList.add("conteudo");

    // Seleciona e preenche o conteudo
    let conteudo = document.querySelector("div");
    conteudo.innerHTML = `
        <h1>Comece pelo começo</h1>
        <div class= "caixaTela1">
            <input id="tituloQuizz" type="text" placeholder="Título do seu quizz">
            <input id="imagemQuizz" type="text" placeholder="URL da imagem do seu quizz">
            <input id="numPerguntas" type="number" placeholder="Quantidade de perguntas do seu quizz">
            <input id="numNiveis" type="number" placeholder="Quantidade de níveis do seu quizz">
        </div>
        <button class= "botaoProsseguir" onClick="validaInformacoes()">
            <h2>Prosseguir para criar perguntas</h2>
        </button>`;
}

function validaInformacoes() {
    titulo = document.getElementById("tituloQuizz").value;
    imagem = document.getElementById("imagemQuizz").value;
    perguntas = document.getElementById("numPerguntas").value;
    niveis = document.getElementById("numNiveis").value;

    // Chama função de validação de URL
    validaURL(imagem);

    // Checa se todos os 4 requisitos foram atendidos
    if(titulo.length >= 20 && titulo.length <= 65 && validaURL(imagem) && perguntas >= 3 && niveis >= 2) {
        // Caso os requisitos foram atendidos, chama a proxima tela
        quizz.title = titulo;
        quizz.image = imagem;
        tela2();
    } else {
        // Caso não, alerta o usuário e zera os inputs que foram testados
        alert("Um ou mais requisitos não foram validados. Por favor, preencha-os novamente.");
    } 
}

// Função de validação de URL
function validaURL(string) {
    try {
        let url = new URL(string)
        return true;
    } catch(err) {  
        return false;
    }
}

function tela2() {
    setTimeout(() => {
        alert(`
    📚 Requisitos para criação das perguntas:

    • Texto da pergunta deve ter no mínimo 20 caracteres.
    • Cor de fundo deve ser no formato hexadecimal.
    • URL da Imagem deve ter um formato válido.
    • No mínimo resposta correta e uma incorreta (Máximo de 4 respostas). 
    `);
    }, 200);

    console.log("Executando Tela 2");

    let tamanho = document.getElementById("numPerguntas");

    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML = "";

    conteudo.innerHTML += `<h1>Crie suas perguntas</h1>`;

    for(let i = 0; i < tamanho.value; i++) {
        conteudo.innerHTML += `
            <div class="caixaTela2">                
                <h1>Pergunta ${i+1}</h1>
                <input type="text" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">

                <h1>Resposta correta</h1>
                <input type="text" placeholder="Resposta correta">
                <input type="text" placeholder="URL da imagem">

                <h1>Resposta incorreta</h1>
                <input type="text" placeholder="Resposta incorreta 1">
                <input type="text" placeholder="URL da imagem 1">

                <input type="text" placeholder="Resposta incorreta 2">
                <input type="text" placeholder="URL da imagem 2">

                <input type="text" placeholder="Resposta incorreta 3">
                <input type="text" placeholder="URL da imagem 3">
            </div>`;
    }

    conteudo.innerHTML += `
        <button class= "botaoProsseguir" onClick="validaPerguntas()">
            <h2>Prosseguir para criar níveis</h2>
        </button>
    `;
}

function validaPerguntas() {
    vetorPerguntas = [];
    let perguntas = document.querySelectorAll(".caixaTela2")
    let valida = 0;

    for(let i = 0; i < perguntas.length; i++) {
        let titulo = perguntas[i].childNodes[3].value;
        let cor = perguntas[i].childNodes[5].value;

        let respostaCorreta = perguntas[i].childNodes[9].value;
        let imagemRespostaCorreta = perguntas[i].childNodes[11].value;

        let respostaIncorreta1 = perguntas[i].childNodes[15].value;
        let imagemRespostaIncorreta1 = perguntas[i].childNodes[17].value;

        let respostaIncorreta2 = perguntas[i].childNodes[19].value;
        let imagemRespostaIncorreta2 = perguntas[i].childNodes[21].value;

        let respostaIncorreta3 = perguntas[i].childNodes[23].value;
        let imagemRespostaIncorreta3 = perguntas[i].childNodes[25].value;

        validaHexa(cor);
        validaURL(imagemRespostaCorreta);
        validaURL(imagemRespostaIncorreta1);
        validaURL(imagemRespostaIncorreta2);
        validaURL(imagemRespostaIncorreta3);        

        if(titulo.length >= 20 && validaHexa(cor) && respostaCorreta != "" && validaURL(imagemRespostaCorreta) && respostaIncorreta1 != "" && validaURL(imagemRespostaIncorreta1) && respostaIncorreta2 == "" && respostaIncorreta3 == "") {
            vetorPerguntas.push({
                title: titulo,
                color: cor,
                answers: [
                    {
                        text: respostaCorreta,
                        image: imagemRespostaCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: respostaIncorreta1,
                        image: imagemRespostaIncorreta1,
                        isCorrectAnswer: false
                    }
                ]
            })

            valida++;
        }
        
        else if (respostaIncorreta2 != "" && validaURL(imagemRespostaIncorreta2) && respostaIncorreta3 == "") {
            vetorPerguntas.push({
                title: titulo,
                color: cor,
                answers: [
                    {
                        text: respostaCorreta,
                        image: imagemRespostaCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: respostaIncorreta1,
                        image: imagemRespostaIncorreta1,
                        isCorrectAnswer: false
                    },
                    {
                        text: respostaIncorreta2,
                        image: imagemRespostaIncorreta2,
                        isCorrectAnswer: false
                    }
                ]
            })

            valida++;
        } 
        
        else if(respostaIncorreta3 != "" && validaURL(imagemRespostaIncorreta3)) {
            vetorPerguntas.push({
                title: titulo,
                color: cor,
                answers: [
                    {
                        text: respostaCorreta,
                        image: imagemRespostaCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: respostaIncorreta1,
                        image: imagemRespostaIncorreta1,
                        isCorrectAnswer: false
                    },
                    {
                        text: respostaIncorreta2,
                        image: imagemRespostaIncorreta2,
                        isCorrectAnswer: false
                    },
                    {
                        text: respostaIncorreta3,
                        image: imagemRespostaIncorreta3,
                        isCorrectAnswer: false
                    }
                ]
            })

            valida++;
        }
    }

    console.log(vetorPerguntas);

    if(valida == perguntas.length) {
        tela3();
    } else {
        alert("Um ou mais requisitos não foram validados. Por favor, preencha-os novamente.");
    }
}

function validaHexa(cor) {
    let hexa = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let contador = 0;

    if(cor.length == 7 && cor[0] == '#') {
        contador++;

        for(let j = 1; j < cor.length; j++) {
            for(let k = 0; k < hexa.length; k++) {            
                if(cor[j].toUpperCase() == hexa[k]) {
                    contador++;
                }
            }
        }
    } else return false;

    if(contador == cor.length) return true;
    else return false;
}

function tela3() {
    setTimeout(() => {
        alert(`
    📚 Requisitos para criação das perguntas:

    • Título do nível deve ter no mínimo 10 caracteres.
    • Primeiro nível deve ter 0% de acerto.
    • Próximos níveis devem ter entre 0 e 100% de acerto.
    • URL da Imagem deve ter um formato válido.
    • Descrição do nível deve ter no mínimo 30 caracteres. 
    `);
    }, 200);

    console.log("Executando Tela 3");

    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML = "";

    conteudo.innerHTML += `<h1>Agora, decida os níveis</h1>`;

    for(let i = 0; i < niveis; i++) {
        conteudo.innerHTML += `
        <div class="caixaTela3">                
                <h1>Nível ${i+1}</h1>
                <input type="text" placeholder="Título do nível">
                <input type="text" placeholder="% de acerto mínima">
                <input type="text" placeholder="URL da imagem do nível">
                <input class="descricaoNivel" type="text" placeholder="Descrição do nível">
        </div>
        `;
    }
    
    conteudo.innerHTML += `
        <button class="botaoProsseguir" onClick="finalizaQuizz()">
            <h2>Finalizar Quizz</h2>
        </div>
    `;
}

function finalizaQuizz() {
    vetorNiveis = [];
    let niveis = document.querySelectorAll(".caixaTela3");
    let valida = 0;
    let nivelZero = 0;

    for(let i = 0; i < niveis.length; i++) {
        let titulo = niveis[i].childNodes[3].value;

        let porcentagem = niveis[i].childNodes[5].value;

        let url = niveis[i].childNodes[7].value;

        let descricao = niveis[i].childNodes[9].value;

        if(porcentagem == '0') {
            nivelZero++;
        }

        if(titulo.length > 10 && parseInt(porcentagem) >= 0 && parseInt(porcentagem) <= 100 && validaURL(url) && descricao.length > 30) {
            vetorNiveis.push({
                title: titulo,
                image: url,
                text: descricao,
                minValue: parseInt(porcentagem)
            })

            valida++;
        }
    }

    console.log(vetorNiveis);

    if(valida == niveis.length &&  nivelZero != 0) {
        quizz.questions = vetorPerguntas;
        quizz.levels = vetorNiveis;
        console.log(quizz);
        enviaQuizz()
    } else {
        alert("Um ou mais requisitos não foram validados. Por favor, preencha-os novamente.");
    }
}

function enviaQuizz() {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz);


    promessa.then((sucesso) => {
        console.log(sucesso.data);
        //armazenarQuizz();
        tela4();
        // const pegarQuizz = localStorage.getItem("quizz")
        // const lista = JSON.parse(pegarQuizz)
        // const quizzSerializado = JSON.stringify(sucesso.data)
        // const quizzSerializadoLocal = JSON.stringify(lista)
        // const quizzesLocal = [quizzSerializadoLocal + quizzSerializado]
        const exemploSerializado = JSON.stringify(sucesso.data)
        localStorage.setItem(`${sucesso.data.id}`, exemploSerializado) 
    });

    promessa.catch((erro) => {
        console.log(erro.data);
    })


}

// function armazenarQuizz(sucesso) {
//     localStorage.setItem("quizz", JSON.stringify(sucesso.id));
// }

function tela4() {
    setTimeout(() => {
        alert(`
    PARABÉNS!!!

    SEU QUIZZ FOI CRIADO COM SUCESSO
    🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳
    `);
    }, 200);

    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML = "";

    conteudo.innerHTML = `
    <h1>Seu quizz está pronto!</h1>
    <img src="${imagem}" class="imagemFinal"></img>
    <button class="botaoProsseguir">
        <h2>Acessar Quizz</h2>
    </button>
        <h3 onClick="inicio()">Voltar para home</h3>
    `;
}

