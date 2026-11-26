
/* ==========================================
   IMPORTAÇÕES DO FIREBASE
========================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


/* ==========================================
   CONFIGURAÇÃO DO FIREBASE
========================================== */

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "escolha-tech.firebaseapp.com",
    projectId: "escolha-tech",
    storageBucket: "escolha-tech.firebasestorage.app",
    messagingSenderId: "852970701583",
    appId: "1:852970701583:web:eb8dc34ee526e85972747a",
    measurementId: "G-N3F3M3KL6F"
};


/* ==========================================
   INICIALIZAÇÃO
========================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth.languageCode = "pt-BR";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});


/* ==========================================
   ELEMENTOS HTML
========================================== */

const formCadastro =
    document.getElementById("formCadastro");

const formLogin =
    document.getElementById("formLogin");

const botaoGoogle =
    document.getElementById("botaoGoogle");

const modalRecuperacao =
    document.getElementById("modalRecuperacao");

const abrirRecuperacao =
    document.getElementById("abrirRecuperacao");

const fecharModal =
    document.getElementById("fecharModal");

const voltarLogin =
    document.getElementById("voltarLogin");

const formRecuperacao =
    document.getElementById("formRecuperacao");

const mostrarSenha =
    document.getElementById("mostrarSenha");


/* ==========================================
   FUNÇÕES DE MENSAGEM
========================================== */

function mostrarMensagem(elemento, texto, tipo) {

    if (!elemento) return;

    elemento.textContent = texto;

    elemento.className = "mensagem " + tipo;

    elemento.hidden = false;
}


function limparMensagem(elemento) {

    if (!elemento) return;

    elemento.textContent = "";

    elemento.className = "mensagem";

    elemento.hidden = true;
}


/* ==========================================
   TRADUÇÃO DOS ERROS DO FIREBASE
========================================== */

function traduzirErro(codigo) {

    const erros = {

        "auth/email-already-in-use":
            "Este e-mail já está cadastrado.",

        "auth/invalid-email":
            "Digite um e-mail válido.",

        "auth/weak-password":
            "A senha precisa ter pelo menos 6 caracteres.",

        "auth/user-not-found":
            "Não encontramos uma conta com esse e-mail.",

        "auth/wrong-password":
            "Senha incorreta.",

        "auth/invalid-credential":
            "E-mail ou senha incorretos.",

        "auth/invalid-login-credentials":
            "E-mail ou senha incorretos.",

        "auth/too-many-requests":
            "Muitas tentativas. Tente novamente mais tarde.",

        "auth/popup-closed-by-user":
            "Você fechou a janela de autenticação.",

        "auth/popup-blocked":
            "O navegador bloqueou o pop-up. Permita pop-ups para continuar.",

        "auth/network-request-failed":
            "Falha na conexão. Verifique sua internet.",

        "auth/operation-not-allowed":
            "Este método de autenticação não está ativado no Firebase.",

        "auth/user-disabled":
            "Esta conta foi desativada.",

        "auth/missing-email":
            "Digite seu e-mail.",

        "auth/account-exists-with-different-credential":
            "Este e-mail já está cadastrado usando outro método de login.",

        "auth/cancelled-popup-request":
            "Uma autenticação anterior foi cancelada.",

        "auth/unauthorized-domain":
            "Este domínio não está autorizado no Firebase."

    };

    return erros[codigo] ||
        "Ocorreu um erro inesperado. Tente novamente.";
}


/* ==========================================
   CADASTRO COM E-MAIL E SENHA
========================================== */

if (formCadastro) {

    formCadastro.addEventListener("submit", async (event) => {

        event.preventDefault();

        /* CAPTURAR CAMPOS */

        const email = document
            .getElementById("email")
            .value
            .trim();

        const senha = document
            .getElementById("senha")
            .value;

        /* ELEMENTOS */

        const mensagem =
            document.getElementById("mensagem");

        const botao = formCadastro.querySelector(
            'button[type="submit"]'
        );

        limparMensagem(mensagem);

        /* VALIDAR SENHA */

        if (senha.length < 8) {

            mostrarMensagem(
                mensagem,
                "A senha precisa ter pelo menos 8 caracteres.",
                "erro"
            );

            return;
        }

        /* DESABILITAR BOTÃO */

        const textoOriginal = botao.innerHTML;

        botao.disabled = true;

        botao.textContent = "Criando conta...";

        try {

            /* CRIAR USUÁRIO */

            await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );

            /* SUCESSO */

            mostrarMensagem(
                mensagem,
                "Conta criada com sucesso! Redirecionando...",
                "sucesso"
            );

            /* REDIRECIONAR */

            setTimeout(() => {

                window.location.href = "projeto1.html";

            }, 1200);

        } catch (erro) {

            console.error("Erro no cadastro:", erro);

            mostrarMensagem(
                mensagem,
                traduzirErro(erro.code),
                "erro"
            );

            botao.disabled = false;

            botao.innerHTML = textoOriginal;

        }

    });

}


/* ==========================================
   LOGIN COM E-MAIL E SENHA
========================================== */

if (formLogin) {

    formLogin.addEventListener("submit", async (event) => {

        event.preventDefault();

        /* CAPTURAR CAMPOS */

        const email = document
            .getElementById("emailLogin")
            .value
            .trim();

        const senha = document
            .getElementById("senhaLogin")
            .value;

        /* ELEMENTOS */

        const mensagem =
            document.getElementById("mensagemLogin");

        const botao = formLogin.querySelector(
            'button[type="submit"]'
        );

        limparMensagem(mensagem);

        const textoOriginal = botao.innerHTML;

        botao.disabled = true;

        botao.textContent = "Entrando...";

        try {

            /* AUTENTICAR USUÁRIO */

            await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );

            /* SUCESSO */

            mostrarMensagem(
                mensagem,
                "Login realizado com sucesso! Redirecionando...",
                "sucesso"
            );

            /* REDIRECIONAR */

            setTimeout(() => {

                window.location.href = "projeto1.html";

            }, 1000);

        } catch (erro) {

            console.error("Erro no login:", erro);

            mostrarMensagem(
                mensagem,
                traduzirErro(erro.code),
                "erro"
            );

            botao.disabled = false;

            botao.innerHTML = textoOriginal;

        }

    });

}


/* ==========================================
   LOGIN COM GOOGLE
========================================== */

if (botaoGoogle) {

    botaoGoogle.addEventListener("click", async () => {

        const textoOriginal = botaoGoogle.innerHTML;

        botaoGoogle.disabled = true;

        botaoGoogle.textContent = "Conectando...";

        try {

            /* ABRIR LOGIN DO GOOGLE */

            const resultado = await signInWithPopup(
                auth,
                googleProvider
            );

            console.log(
                "Usuário autenticado:",
                resultado.user
            );

            /* REDIRECIONAR */

            window.location.href = "projeto1.html";

        } catch (erro) {

            console.error("Erro no Google:", erro);

            alert(traduzirErro(erro.code));

            botaoGoogle.disabled = false;

            botaoGoogle.innerHTML = textoOriginal;

        }

    });

}


/* ==========================================
   MOSTRAR E OCULTAR SENHA
========================================== */

if (mostrarSenha) {

    mostrarSenha.addEventListener("click", () => {

        const campoSenha =
            document.getElementById("senha");

        if (!campoSenha) return;

        if (campoSenha.type === "password") {

            campoSenha.type = "text";

            mostrarSenha.setAttribute(
                "aria-label",
                "Ocultar senha"
            );

        } else {

            campoSenha.type = "password";

            mostrarSenha.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

        }

    });

}


/* ==========================================
   ABRIR MODAL DE RECUPERAÇÃO
========================================== */

if (abrirRecuperacao && modalRecuperacao) {

    abrirRecuperacao.addEventListener("click", () => {

        modalRecuperacao.hidden = false;

        /* COPIAR E-MAIL DA TELA */

        const emailCadastro =
            document.getElementById("email");

        const emailLogin =
            document.getElementById("emailLogin");

        const emailRecuperacao =
            document.getElementById("emailRecuperacao");

        if (emailRecuperacao) {

            if (emailLogin) {

                emailRecuperacao.value =
                    emailLogin.value.trim();

            } else if (emailCadastro) {

                emailRecuperacao.value =
                    emailCadastro.value.trim();

            }

            emailRecuperacao.focus();

        }

        /* LIMPAR MENSAGEM ANTERIOR */

        limparMensagem(
            document.getElementById("mensagemRecuperacao")
        );

    });

}


/* ==========================================
   FECHAR MODAL
========================================== */

function fecharRecuperacao() {

    if (modalRecuperacao) {

        modalRecuperacao.hidden = true;

    }

}


if (fecharModal) {

    fecharModal.addEventListener(
        "click",
        fecharRecuperacao
    );

}


if (voltarLogin) {

    voltarLogin.addEventListener(
        "click",
        fecharRecuperacao
    );

}


/* ==========================================
   FECHAR MODAL CLICANDO FORA
========================================== */

if (modalRecuperacao) {

    modalRecuperacao.addEventListener("click", (event) => {

        if (event.target === modalRecuperacao) {

            fecharRecuperacao();

        }

    });

}


/* ==========================================
   FECHAR MODAL COM ESC
========================================== */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        modalRecuperacao &&
        !modalRecuperacao.hidden
    ) {

        fecharRecuperacao();

    }

});


/* ==========================================
   RECUPERAÇÃO DE SENHA
========================================== */

if (formRecuperacao) {

    formRecuperacao.addEventListener("submit", async (event) => {

        event.preventDefault();

        /* CAPTURAR E-MAIL */

        const email = document
            .getElementById("emailRecuperacao")
            .value
            .trim();

        /* ELEMENTOS */

        const mensagem =
            document.getElementById("mensagemRecuperacao");

        const botao = formRecuperacao.querySelector(
            'button[type="submit"]'
        );

        limparMensagem(mensagem);

        const textoOriginal = botao.innerHTML;

        botao.disabled = true;

        botao.textContent = "Enviando...";

        try {

            /* ENVIAR E-MAIL */

            await sendPasswordResetEmail(
                auth,
                email
            );

            /* SUCESSO */

            mostrarMensagem(
                mensagem,
                "Se houver uma conta vinculada a esse e-mail, enviaremos um link para redefinir sua senha. Confira sua caixa de entrada e o spam.",
                "sucesso"
            );

            /* LIMPAR CAMPO */

            formRecuperacao.reset();

        } catch (erro) {

            console.error(
                "Erro na recuperação de senha:",
                erro
            );

            mostrarMensagem(
                mensagem,
                traduzirErro(erro.code),
                "erro"
            );

        } finally {

            botao.disabled = false;

            botao.innerHTML = textoOriginal;

        }

    });

}
