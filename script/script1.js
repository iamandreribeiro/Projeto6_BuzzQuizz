// Começo do meu código
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