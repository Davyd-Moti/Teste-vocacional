
const formulario = document.getElementById("formulario");

const resultado = document.getElementById("resultado");

const areasResultado = document.getElementById("areasResultado");

const pontuacoes = document.getElementById("pontuacoes");

const resposta6Resultado = document.getElementById("resposta6Resultado");

const resposta9Resultado = document.getElementById("resposta9Resultado");

const botaoRefazer = document.getElementById("refazer");


// INFORMAÇÕES DAS ÁREAS PROFISSIONAIS

const areas = {

    tecnologia: {
        nome: "Tecnologia e Exatas",

        descricao:
            "Você demonstra afinidade com raciocínio lógico, resolução de problemas, cálculos e tecnologia.",

        profissoes: [
            "Desenvolvedor de Software",
            "Analista de Sistemas",
            "Engenheiro",
            "Cientista de Dados",
            "Analista de Segurança da Informação"
        ]
    },

    saude: {
        nome: "Saúde e Ciências Biológicas",

        descricao:
            "Você demonstra afinidade com ciências, cuidado com as pessoas, natureza e compreensão dos seres vivos.",

        profissoes: [
            "Enfermeiro",
            "Biólogo",
            "Fisioterapeuta",
            "Nutricionista",
            "Biomédico"
        ]
    },

    humanas: {
        nome: "Humanas e Comunicação",

        descricao:
            "Você demonstra afinidade com comunicação, interpretação, relações humanas e compreensão da sociedade.",

        profissoes: [
            "Jornalista",
            "Advogado",
            "Psicólogo",
            "Professor",
            "Historiador"
        ]
    },

    gestao: {
        nome: "Gestão e Administração",

        descricao:
            "Você demonstra afinidade com organização, planejamento, liderança e tomada de decisões.",

        profissoes: [
            "Administrador",
            "Contador",
            "Gestor de Projetos",
            "Economista",
            "Empreendedor"
        ]
    },

    criativa: {
        nome: "Criatividade e Artes",

        descricao:
            "Você demonstra afinidade com criatividade, inovação, expressão artística e desenvolvimento de ideias.",

        profissoes: [
            "Designer",
            "Publicitário",
            "Ilustrador",
            "Artista",
            "Produtor de Conteúdo"
        ]
    }

};


// PONTUAÇÃO DAS ALTERNATIVAS

const pontuacaoRespostas = {

    pergunta1: {
        Conversar: ["humanas", "gestao"],
        Refletir: ["tecnologia", "criativa"],
        Agir: ["tecnologia", "gestao"],
        Emocional: ["saude", "criativa"]
    },

    pergunta2: {
        Honestidade: ["gestao"],
        Respeito: ["saude", "humanas"],
        Justica: ["humanas"],
        Responsabilidade: ["tecnologia", "gestao"]
    },

    pergunta3: {
        Lider: ["gestao"],
        Criativo: ["criativa"],
        Executor: ["tecnologia", "saude"],
        Mediador: ["humanas", "saude"]
    },

    pergunta4: {
        Sozinho: ["tecnologia", "criativa"],
        Grupo: ["humanas", "saude"],
        Ambos: ["gestao"]
    },

    pergunta5: {
        Matematica: ["tecnologia"],
        Portugues: ["humanas"],
        Ciencias: ["saude"],
        Humanas: ["humanas"],
        Tecnologia: ["tecnologia"],
        Artes: ["criativa"]
    },

    pergunta7: {
        Numeros: ["tecnologia"],
        Leitura: ["humanas"],
        Ambos: ["tecnologia", "humanas"]
    },

    pergunta8: {
        Sim: ["humanas"],
        Nao: ["tecnologia"],
        Ambos: ["humanas", "tecnologia"]
    }

};


// PALAVRAS-CHAVE DAS RESPOSTAS ABERTAS

const palavrasChave = {

    tecnologia: [
        "logica", "calculo", "calculos", "matematica",
        "programacao", "programar", "computador",
        "tecnologia", "resolver problemas", "informatica"
    ],

    saude: [
        "ajudar pessoas", "cuidar", "saude", "biologia",
        "animais", "natureza", "corpo humano", "medicina",
        "empatia"
    ],

    humanas: [
        "comunicar", "comunicacao", "escrever", "leitura",
        "ler", "ensinar", "historia", "sociedade",
        "conversar", "interpretacao"
    ],

    gestao: [
        "organizar", "organizacao", "lideranca", "liderar",
        "planejar", "planejamento", "administrar",
        "responsabilidade", "equipe", "decidir"
    ],

    criativa: [
        "criatividade", "desenhar", "desenho", "arte",
        "musica", "imaginar", "criar", "design",
        "inovar", "ideias"
    ]

};


// REMOVE ACENTOS PARA FACILITAR A COMPARAÇÃO

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// ADICIONA PONTOS DE ACORDO COM AS RESPOSTAS ABERTAS

function analisarRespostaAberta(texto, pontos) {

    const resposta = normalizarTexto(texto);

    for (let area in palavrasChave) {

        const palavras = palavrasChave[area];

        palavras.forEach(function(palavra) {

            if (resposta.includes(normalizarTexto(palavra))) {

                pontos[area]++;

            }

        });

    }

}


// QUANDO O USUÁRIO FINALIZAR O TESTE

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    // PERGUNTAS QUE PRECISAM SER RESPONDIDAS

    const perguntasObrigatorias = [
        "pergunta1",
        "pergunta2",
        "pergunta3",
        "pergunta4",
        "pergunta5",
        "pergunta7",
        "pergunta8"
    ];


    // VERIFICA SE TODAS AS ALTERNATIVAS FORAM MARCADAS

    for (let pergunta of perguntasObrigatorias) {

        const resposta = formulario.querySelector(
            `input[name="${pergunta}"]:checked`
        );

        if (!resposta) {

            alert("Por favor, responda todas as perguntas de alternativa.");

            return;

        }

    }


    // INICIA A PONTUAÇÃO DE TODAS AS ÁREAS

    let pontos = {

        tecnologia: 0,
        saude: 0,
        humanas: 0,
        gestao: 0,
        criativa: 0

    };


    // LÊ AS RESPOSTAS DO FORMULÁRIO

    const respostas = new FormData(formulario);


    // CALCULA OS PONTOS DAS PERGUNTAS DE ALTERNATIVA

    for (let pergunta in pontuacaoRespostas) {

        const resposta = respostas.get(pergunta);

        const areasRecebidas = pontuacaoRespostas[pergunta][resposta];

        areasRecebidas.forEach(function(area) {

            pontos[area]++;

        });

    }


    // ANALISA AS DUAS RESPOSTAS ABERTAS

    const textoPergunta6 = respostas.get("pergunta6") || "";

    const textoPergunta9 = respostas.get("pergunta9") || "";

    analisarRespostaAberta(textoPergunta6, pontos);

    analisarRespostaAberta(textoPergunta9, pontos);


    // DESCOBRE A MAIOR PONTUAÇÃO

    const maiorPontuacao = Math.max(...Object.values(pontos));


    // ENCONTRA TODAS AS ÁREAS COM A MAIOR PONTUAÇÃO

    const melhoresAreas = Object.keys(pontos).filter(function(area) {

        return pontos[area] === maiorPontuacao;

    });


    // LIMPA RESULTADOS ANTERIORES

    areasResultado.innerHTML = "";

    pontuacoes.innerHTML = "";

// MOSTRA AS ÁREAS DE MAIOR AFINIDADE

melhoresAreas.forEach(function(area) {

    const informacoes = areas[area];

    const caixa = document.createElement("div");

    caixa.className = "area-destaque";

    // TÍTULO DA ÁREA

    const titulo = document.createElement("h2");

    titulo.textContent = informacoes.nome;

    // DESCRIÇÃO

    const descricao = document.createElement("p");

    descricao.textContent = informacoes.descricao;

    // TÍTULO DAS PROFISSÕES

    const tituloProfissoes = document.createElement("h3");

    tituloProfissoes.textContent =
        "Profissões que você pode explorar";

    // LISTA DE PROFISSÕES

    const lista = document.createElement("ul");

    informacoes.profissoes.forEach(function(profissao) {

        const item = document.createElement("li");

        item.textContent = profissao;

        lista.appendChild(item);

    });

    // ADICIONA OS ELEMENTOS

    caixa.appendChild(titulo);
    caixa.appendChild(descricao);
    caixa.appendChild(tituloProfissoes);
    caixa.appendChild(lista);

    areasResultado.appendChild(caixa);

});


    // ORGANIZA AS ÁREAS PELA PONTUAÇÃO

    const ranking = Object.keys(pontos).sort(function(a, b) {

        return pontos[b] - pontos[a];

    });


    // MOSTRA A PONTUAÇÃO DE CADA ÁREA

    ranking.forEach(function(area) {

        const linha = document.createElement("div");

        linha.className = "linha-pontuacao";


        const cabecalho = document.createElement("div");

        cabecalho.className = "cabecalho-pontuacao";


        const nome = document.createElement("span");

        nome.textContent = areas[area].nome;


        const valor = document.createElement("strong");

        valor.textContent = pontos[area] + " pontos";


        cabecalho.appendChild(nome);

        cabecalho.appendChild(valor);


        const barraFundo = document.createElement("div");

        barraFundo.className = "barra-fundo";


        const barraPreenchida = document.createElement("div");

        barraPreenchida.className = "barra-preenchida";


        const porcentagem = maiorPontuacao > 0
            ? (pontos[area] / maiorPontuacao) * 100
            : 0;

        barraPreenchida.style.width = porcentagem + "%";


        barraFundo.appendChild(barraPreenchida);

        linha.appendChild(cabecalho);

        linha.appendChild(barraFundo);

        pontuacoes.appendChild(linha);

    });


    // MOSTRA AS RESPOSTAS ABERTAS

    resposta6Resultado.textContent =
        textoPergunta6.trim() || "Nenhuma resposta informada.";

    resposta9Resultado.textContent =
        textoPergunta9.trim() || "Nenhuma resposta informada.";


    // MOSTRA O RESULTADO

    resultado.hidden = false;

    resultado.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});


// BOTÃO PARA REFAZER O TESTE

botaoRefazer.addEventListener("click", function() {

    formulario.reset();

    resultado.hidden = true;

    formulario.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});
