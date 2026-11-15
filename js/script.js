
/* ============================================================
   PROJETO PETLIFE
   Arquivo: script.js

   Este arquivo reúne as funcionalidades JavaScript do projeto:

   1. Menu de navegação responsivo
   2. Perguntas frequentes (FAQ)
   3. Sistema de adoção dinâmica
   4. Exibição dos dados do animal
   5. Exibição do formulário de adoção
   6. Validação e envio da solicitação de adoção
   7. Carrossel de depoimentos
   8. Validação e envio do formulário de contato

   Tecnologia: JavaScript ES6
============================================================ */


/* ============================================================
   1. MENU DE NAVEGAÇÃO RESPONSIVO
============================================================ */

// Seleciona o botão responsável por abrir e fechar o menu.
const botaoMenu = document.querySelector(".botao-menu");

// Seleciona o menu de navegação.
const navegacao = document.querySelector(".navegacao");


// Verifica se os elementos existem na página atual.
// Isso evita erros em páginas que não possuem o menu.
if (botaoMenu && navegacao) {

    // Evento executado quando o usuário clica no botão do menu.
    botaoMenu.addEventListener("click", () => {

        // Adiciona ou remove a classe que controla a abertura do menu.
        const menuAberto = navegacao.classList.toggle("menu-aberto");

        // Atualiza o atributo acessível com o estado do menu.
        botaoMenu.setAttribute("aria-expanded", String(menuAberto));

        // Atualiza o nome acessível do botão.
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );

    });


    // Seleciona todos os links que estão dentro do menu.
    navegacao.querySelectorAll("a").forEach((link) => {

        // Fecha o menu depois que o usuário seleciona uma seção.
        link.addEventListener("click", () => {

            navegacao.classList.remove("menu-aberto");

            // Atualiza o estado acessível do botão.
            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );

        });

    });


    // Observa alterações no tamanho da janela.
    window.addEventListener("resize", () => {

        // Quando a tela voltar ao tamanho desktop, fecha o menu.
        if (window.innerWidth > 900) {

            navegacao.classList.remove("menu-aberto");

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );

        }

    });

}


/* ============================================================
   2. FUNCIONALIDADE DO FAQ
   Perguntas frequentes
============================================================ */

// Seleciona todas as perguntas existentes na seção FAQ.
const perguntas = document.querySelectorAll(".duvida-pergunta");


// Percorre todas as perguntas encontradas.
perguntas.forEach((pergunta) => {

    // Adiciona um evento de clique em cada pergunta.
    pergunta.addEventListener("click", () => {

        // Localiza a resposta que vem logo depois da pergunta.
        const resposta = pergunta.nextElementSibling;

        // Verifica se a pergunta já está aberta.
        const estaAberta =
            pergunta.getAttribute("aria-expanded") === "true";


        // Fecha todas as respostas antes de abrir outra.
        perguntas.forEach((outraPergunta) => {

            outraPergunta.setAttribute("aria-expanded", "false");

            const outraResposta = outraPergunta.nextElementSibling;

            // Esconde a resposta.
            if (outraResposta) {
                outraResposta.hidden = true;
            }

            // Localiza o ícone da pergunta.
            const outroIcone =
                outraPergunta.querySelector(".duvida-icone");

            // Altera o ícone para "+".
            if (outroIcone) {
                outroIcone.textContent = "+";
            }

        });


        // Se a pergunta estava fechada, abre sua resposta.
        if (!estaAberta && resposta) {

            pergunta.setAttribute("aria-expanded", "true");

            // Mostra a resposta selecionada.
            resposta.hidden = false;

            // Localiza o ícone da pergunta selecionada.
            const icone = pergunta.querySelector(".duvida-icone");

            // Altera o ícone de "+" para "-".
            if (icone) {
                icone.textContent = "-";
            }

        }

    });

});


// Inicializa o FAQ quando o HTML estiver carregado.
document.addEventListener("DOMContentLoaded", () => {

    // Percorre todas as perguntas.
    perguntas.forEach((pergunta) => {

        // Define inicialmente todas as perguntas como fechadas.
        pergunta.setAttribute("aria-expanded", "false");

        const resposta = pergunta.nextElementSibling;

        // Esconde todas as respostas.
        if (resposta) {
            resposta.hidden = true;
        }

        // Localiza o ícone da pergunta.
        const icone = pergunta.querySelector(".duvida-icone");

        // Define o ícone inicial como "+".
        if (icone) {
            icone.textContent = "+";
        }

    });

});


/* ============================================================
   3. SISTEMA DE ADOÇÃO DINÂMICA
   Envio dos dados do animal da página inicial
============================================================ */

// Seleciona os botões de adoção que estão dentro dos cartões.
const botoesAdocao = document.querySelectorAll(
    ".cartao-animal .botao-adotar"
);


// Percorre todos os botões de adoção.
botoesAdocao.forEach((botao) => {

    // Evento executado quando o usuário clica em adotar.
    botao.addEventListener("click", (evento) => {

        // Impede o comportamento padrão do link.
        evento.preventDefault();

        // Localiza o cartão do animal selecionado.
        const cartao = botao.closest(".cartao-animal");

        // Verifica se o cartão foi encontrado.
        if (!cartao) return;

        // Captura a imagem que está dentro do cartão.
        const imagem = cartao.querySelector("img");

        // Cria os parâmetros que serão enviados pela URL.
        const dadosPet = new URLSearchParams();

        // Armazena as informações do animal.
        dadosPet.set("nome", cartao.dataset.nome);
        dadosPet.set("especie", cartao.dataset.especie);
        dadosPet.set("idade", cartao.dataset.idade);
        dadosPet.set("porte", cartao.dataset.porte);
        dadosPet.set("personalidade", cartao.dataset.personalidade);

        // Captura o endereço da imagem.
        if (imagem) {
            dadosPet.set("foto", imagem.currentSrc || imagem.src);
        }

        // Abre a página de adoção enviando os dados do animal.
        window.location.href = "adotar.html?" + dadosPet.toString();

    });

});


/* ============================================================
   4. RECEBIMENTO DOS DADOS NA PÁGINA DE ADOÇÃO
============================================================ */

// Recupera os parâmetros enviados pela URL.
const parametros = new URLSearchParams(window.location.search);

// Seleciona a imagem que exibirá a foto do animal.
const fotoPet = document.getElementById("foto-pet");


// Verifica se a imagem existe.
// Esse elemento é utilizado para identificar a página de adoção.
if (fotoPet) {

    // Recupera os dados enviados pela página inicial.
    const nome = parametros.get("nome");
    const especie = parametros.get("especie");
    const idade = parametros.get("idade");
    const porte = parametros.get("porte");
    const personalidade = parametros.get("personalidade");
    const foto = parametros.get("foto");


    // Verifica se todas as informações foram recebidas.
    if (nome && especie && idade && porte && personalidade && foto) {

        // Exibe o nome do animal.
        document.getElementById("nome-pet").textContent = nome;

        // Exibe a espécie.
        document.getElementById("especie-pet").textContent = especie;

        // Exibe a idade.
        document.getElementById("idade-pet").textContent = idade;

        // Exibe o porte.
        document.getElementById("porte-pet").textContent = porte;

        // Exibe a personalidade.
        document.getElementById("temperamento-pet").textContent =
            personalidade;

        // Define a imagem do animal.
        fotoPet.src = foto;

        // Define o texto alternativo da imagem.
        fotoPet.alt = nome + ", animal disponível para adoção";

        // Exibe a descrição do animal.
        document.getElementById("descricao-pet").textContent =
            nome + " está esperando por uma família que ofereça amor e cuidado.";


        // Atualiza o nome do animal no formulário.
        const petEscolhido = document.getElementById("pet-escolhido");

        if (petEscolhido) {
            petEscolhido.value = nome;
        }

    } else {

        // Caso a página seja aberta sem selecionar um animal,
        // informa ao usuário que nenhum animal foi selecionado.
        const nomePet = document.getElementById("nome-pet");
        const descricaoPet = document.getElementById("descricao-pet");
        const botaoProximoPasso = document.getElementById(
            "botao-proximo-passo"
        );

        if (nomePet) {
            nomePet.textContent = "Nenhum animal selecionado";
        }

        if (descricaoPet) {
            descricaoPet.textContent =
                "Volte à página inicial e escolha um animal para conhecer.";
        }

        // Esconde a imagem.
        fotoPet.hidden = true;

        // Desabilita o botão de continuar.
        if (botaoProximoPasso) {
            botaoProximoPasso.disabled = true;
        }

    }

}


/* ============================================================
   5. BOTÃO PRÓXIMO PASSO
   Exibição do formulário de adoção
============================================================ */

// Seleciona o botão Próximo passo.
const botaoProximo = document.getElementById("botao-proximo-passo");


// Verifica se o botão existe na página.
if (botaoProximo) {

    // Adiciona o evento de clique.
    botaoProximo.addEventListener("click", () => {

        // Localiza a seção que contém o formulário.
        const formulario = document.getElementById(
            "secao-formulario-adocao"
        );

        // Verifica se a seção foi encontrada.
        if (!formulario) return;

        // Mostra a seção do formulário.
        formulario.hidden = false;

        // Esconde o botão depois do clique.
        botaoProximo.hidden = true;

        // Leva o usuário até o formulário com rolagem suave.
        formulario.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* ============================================================
   6. ENVIO DA SOLICITAÇÃO DE ADOÇÃO
   Validação e mensagem de confirmação
============================================================ */

// Localiza o formulário de solicitação de adoção.
const formularioAdocao = document.getElementById(
    "formulario-solicitacao"
);


// Verifica se o formulário existe na página atual.
if (formularioAdocao) {

    // Evento executado quando o usuário envia o formulário.
    formularioAdocao.addEventListener("submit", function(event) {

        // Impede o recarregamento automático da página.
        event.preventDefault();


        // Verifica se todos os campos obrigatórios são válidos.
        if (!formularioAdocao.checkValidity()) {

            // Exibe as mensagens de validação do navegador.
            formularioAdocao.reportValidity();

            // Interrompe a execução caso existam erros.
            return;

        }


        // Captura a área de mensagem de retorno.
        const mensagem = document.getElementById("retorno-adocao");


        // Exibe a mensagem de sucesso.
        if (mensagem) {

            mensagem.textContent =
                "Solicitação enviada com sucesso! Obrigado pelo interesse em adotar. Você será redirecionado para a página inicial.";

            mensagem.classList.add("sucesso");

        }


        // Localiza o botão de envio do formulário.
        const botaoEnviar = formularioAdocao.querySelector(
            'button[type="submit"]'
        );


        // Desabilita o botão para evitar cliques repetidos.
        if (botaoEnviar) {

            botaoEnviar.disabled = true;

            botaoEnviar.textContent = "Solicitação enviada!";

        }


        // Aguarda 3 segundos e retorna à página inicial.
        setTimeout(function() {

            window.location.href = "index.html";

        }, 3000);

    });

}


/* ============================================================
   7. CARROSSEL DE DEPOIMENTOS
   Navegação entre os cartões de depoimentos
============================================================ */

// Seleciona a estrutura principal do carrossel.
const carrossel = document.querySelector(".carrossel-depoimentos");


// Verifica se o carrossel existe na página.
if (carrossel) {

    // Seleciona o trilho que contém os cartões.
    const trilho = carrossel.querySelector(".trilho-depoimentos");

    // Verifica se o trilho existe.
    if (trilho) {

        // Armazena todos os cartões em um array.
        const cartoes = Array.from(
            trilho.querySelectorAll(".cartao-depoimento")
        );

        // Seleciona os botões de navegação.
        const botaoAnterior = carrossel.querySelector(".anterior");
        const botaoProximo = carrossel.querySelector(".proximo");

        // Seleciona os indicadores do carrossel.
        const indicadores = document.querySelectorAll(
            ".indicadores-depoimentos .indicador"
        );

        // Seleciona a seção completa dos depoimentos.
        const secao = document.querySelector(".secao-depoimentos");

        // Controla a posição atual do carrossel.
        let indiceAtual = 0;

        // Armazena o intervalo da passagem automática.
        let intervalo;


        // Continua somente se existirem cartões e botões.
        if (
            cartoes.length > 0 &&
            botaoAnterior &&
            botaoProximo &&
            secao
        ) {


            /* ------------------------------------------------
               7.1. QUANTIDADE DE CARTÕES VISÍVEIS
            ------------------------------------------------ */

            // Define quantos cartões aparecem conforme a tela.
            function quantidadeVisivel() {

                // Celulares: um cartão.
                if (window.innerWidth <= 600) {
                    return 1;
                }

                // Tablets: dois cartões.
                if (window.innerWidth <= 900) {
                    return 2;
                }

                // Computadores: três cartões.
                return 3;

            }


            /* ------------------------------------------------
               7.2. TOTAL DE POSIÇÕES DO CARROSSEL
            ------------------------------------------------ */

            // Calcula a quantidade máxima de posições.
            function totalPosicoes() {

                return Math.max(
                    1,
                    cartoes.length - quantidadeVisivel() + 1
                );

            }


            /* ------------------------------------------------
               7.3. ATUALIZAÇÃO DO CARROSSEL
            ------------------------------------------------ */

            // Atualiza a posição dos cartões na tela.
            function atualizarCarrossel() {

                // Recupera a largura do primeiro cartão.
                const larguraCartao =
                    cartoes[0].getBoundingClientRect().width;

                // Recupera o espaçamento entre os cartões.
                const espaco =
                    parseFloat(getComputedStyle(trilho).gap) || 0;

                // Calcula o deslocamento necessário.
                const deslocamento =
                    indiceAtual * (larguraCartao + espaco);

                // Move o trilho horizontalmente.
                trilho.style.transform =
                    `translateX(-${deslocamento}px)`;


                // Atualiza os indicadores.
                indicadores.forEach((indicador, indice) => {

                    indicador.classList.toggle(
                        "ativo",
                        indice === indiceAtual
                    );

                });


                // Atualiza o estado dos botões de navegação.
                botaoAnterior.disabled = indiceAtual === 0;

                botaoProximo.disabled =
                    indiceAtual >= totalPosicoes() - 1;

            }


            /* ------------------------------------------------
               7.4. PRÓXIMO DEPOIMENTO
            ------------------------------------------------ */

            // Avança para o próximo cartão.
            function proximoDepoimento() {

                if (indiceAtual < totalPosicoes() - 1) {

                    indiceAtual++;

                } else {

                    // Retorna ao primeiro cartão.
                    indiceAtual = 0;

                }

                atualizarCarrossel();

            }


            /* ------------------------------------------------
               7.5. DEPOIMENTO ANTERIOR
            ------------------------------------------------ */

            // Volta para o cartão anterior.
            function depoimentoAnterior() {

                if (indiceAtual > 0) {

                    indiceAtual--;

                } else {

                    // Vai para a última posição.
                    indiceAtual = totalPosicoes() - 1;

                }

                atualizarCarrossel();

            }


            /* ------------------------------------------------
               7.6. EVENTOS DAS SETAS
            ------------------------------------------------ */

            // Evento do botão próximo.
            botaoProximo.addEventListener("click", () => {

                proximoDepoimento();

                // Reinicia a passagem automática.
                reiniciarIntervalo();

            });


            // Evento do botão anterior.
            botaoAnterior.addEventListener("click", () => {

                depoimentoAnterior();

                // Reinicia a passagem automática.
                reiniciarIntervalo();

            });


            /* ------------------------------------------------
               7.7. EVENTOS DOS INDICADORES
            ------------------------------------------------ */

            // Permite selecionar diretamente uma posição.
            indicadores.forEach((indicador, indice) => {

                indicador.addEventListener("click", () => {

                    // Garante que o índice esteja dentro do limite.
                    indiceAtual = Math.min(
                        indice,
                        totalPosicoes() - 1
                    );

                    atualizarCarrossel();

                    // Reinicia a passagem automática.
                    reiniciarIntervalo();

                });

            });


            /* ------------------------------------------------
               7.8. PASSAGEM AUTOMÁTICA
            ------------------------------------------------ */

            // Inicia a troca automática a cada 5 segundos.
            function iniciarIntervalo() {

                // Evita criar intervalos duplicados.
                pararIntervalo();

                intervalo = setInterval(
                    proximoDepoimento,
                    5000
                );

            }


            // Interrompe a passagem automática.
            function pararIntervalo() {

                clearInterval(intervalo);

            }


            // Reinicia o temporizador.
            function reiniciarIntervalo() {

                pararIntervalo();

                iniciarIntervalo();

            }


            /* ------------------------------------------------
               7.9. PAUSA AO INTERAGIR COM A SEÇÃO
            ------------------------------------------------ */

            // Pausa quando o mouse entra na seção.
            secao.addEventListener("mouseenter", pararIntervalo);

            // Retoma quando o mouse sai da seção.
            secao.addEventListener("mouseleave", iniciarIntervalo);


            /* ------------------------------------------------
               7.10. VISIBILIDADE DA PÁGINA
            ------------------------------------------------ */

            // Verifica se a página está visível.
            document.addEventListener("visibilitychange", () => {

                if (document.hidden) {

                    // Pausa quando o usuário muda de aba.
                    pararIntervalo();

                } else {

                    // Retoma quando o usuário volta.
                    iniciarIntervalo();

                }

            });


            /* ------------------------------------------------
               7.11. REDIMENSIONAMENTO DA TELA
            ------------------------------------------------ */

            // Atualiza a posição quando a tela muda de tamanho.
            window.addEventListener("resize", () => {

                // Ajusta o índice ao novo limite.
                indiceAtual = Math.min(
                    indiceAtual,
                    totalPosicoes() - 1
                );

                atualizarCarrossel();

            });


            /* ------------------------------------------------
               7.12. ACESSIBILIDADE E MOVIMENTO REDUZIDO
            ------------------------------------------------ */

            // Verifica a preferência do usuário por menos animações.
            const movimentoReduzido = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

            // Só inicia a passagem automática se o usuário
            // não tiver solicitado movimento reduzido.
            if (!movimentoReduzido.matches) {

                iniciarIntervalo();

            }


            // Atualiza o carrossel na primeira exibição.
            atualizarCarrossel();

        }

    }

}


/* ============================================================
   8. FORMULÁRIO DE CONTATO
   Validação dos campos e confirmação da mensagem
============================================================ */

// Seleciona o formulário de contato.
const formularioContato = document.getElementById(
    "formulario-contato"
);


// Verifica se o formulário existe na página atual.
if (formularioContato) {


    /* --------------------------------------------------------
       8.1. SELEÇÃO DOS CAMPOS
    -------------------------------------------------------- */

    // Captura os campos do formulário.
    const assunto = document.getElementById("assunto");
    const nome = document.getElementById("nome-completo");
    const email = document.getElementById("email-contato");
    const mensagem = document.getElementById("mensagem-contato");


    // Captura os espaços destinados às mensagens de erro.
    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroMensagem = document.getElementById("erro-mensagem");
    const erroAssunto = document.getElementById("erro-assunto");


    // Seleciona a área de retorno para o usuário.
    const mensagemRetorno = document.getElementById(
        "mensagem-retorno"
    );


    /* --------------------------------------------------------
       8.2. FUNÇÃO PARA MOSTRAR ERROS
    -------------------------------------------------------- */

    // Recebe o campo, o local da mensagem e o texto do erro.
    function mostrarErro(campo, elementoErro, texto) {

        // Adiciona uma classe visual ao campo.
        campo.classList.add("campo-invalido");

        // Informa aos leitores de tela que existe um erro.
        campo.setAttribute("aria-invalid", "true");

        // Exibe a mensagem de erro.
        if (elementoErro) {

            elementoErro.textContent = texto;

        }

    }


    /* --------------------------------------------------------
       8.3. FUNÇÃO PARA LIMPAR ERROS
    -------------------------------------------------------- */

    // Remove a indicação de erro de um campo.
    function limparErro(campo, elementoErro) {

        // Remove a classe visual.
        campo.classList.remove("campo-invalido");

        // Remove o atributo de erro.
        campo.removeAttribute("aria-invalid");

        // Apaga a mensagem de erro.
        if (elementoErro) {

            elementoErro.textContent = "";

        }

    }


    /* --------------------------------------------------------
       8.4. EVENTO DE ENVIO DO FORMULÁRIO
    -------------------------------------------------------- */

    formularioContato.addEventListener("submit", function(evento) {

        // Impede o envio tradicional e o recarregamento da página.
        evento.preventDefault();

        // Controla se todos os campos estão válidos.
        let formularioValido = true;


        // Limpa os erros anteriores antes de validar novamente.
        limparErro(assunto, erroAssunto);
        limparErro(nome, erroNome);
        limparErro(email, erroEmail);
        limparErro(mensagem, erroMensagem);


        // Limpa mensagens anteriores.
        mensagemRetorno.textContent = "";

        mensagemRetorno.classList.remove("sucesso", "erro");


        /* ----------------------------------------------------
           8.5. VALIDAÇÃO DO ASSUNTO
        ---------------------------------------------------- */

        // Verifica se o usuário selecionou uma opção.
        if (assunto.value.trim() === "") {

            mostrarErro(
                assunto,
                erroAssunto,
                "Por favor, selecione um assunto."
            );

            formularioValido = false;

        }


        /* ----------------------------------------------------
           8.6. VALIDAÇÃO DO NOME
        ---------------------------------------------------- */

        // Verifica se o nome foi preenchido.
        if (nome.value.trim() === "") {

            mostrarErro(
                nome,
                erroNome,
                "Informe seu nome completo."
            );

            formularioValido = false;

        }

        // Verifica se o nome possui pelo menos 3 caracteres.
        else if (nome.value.trim().length < 3) {

            mostrarErro(
                nome,
                erroNome,
                "O nome deve possuir pelo menos 3 caracteres."
            );

            formularioValido = false;

        }

        // Verifica se o usuário informou nome e sobrenome.
        else if (nome.value.trim().split(/\s+/).length < 2) {

            mostrarErro(
                nome,
                erroNome,
                "Informe seu nome e sobrenome."
            );

            formularioValido = false;

        }


        /* ----------------------------------------------------
           8.7. VALIDAÇÃO DO E-MAIL
        ---------------------------------------------------- */

        // Expressão regular para verificar o formato do e-mail.
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Verifica se o e-mail foi preenchido.
        if (email.value.trim() === "") {

            mostrarErro(
                email,
                erroEmail,
                "Informe seu endereço de e-mail."
            );

            formularioValido = false;

        }

        // Verifica se o formato do e-mail é válido.
        else if (!formatoEmail.test(email.value.trim())) {

            mostrarErro(
                email,
                erroEmail,
                "Digite um e-mail válido. Exemplo: nome@email.com."
            );

            formularioValido = false;

        }


        /* ----------------------------------------------------
           8.8. VALIDAÇÃO DA MENSAGEM
        ---------------------------------------------------- */

        // Verifica se a mensagem foi preenchida.
        if (mensagem.value.trim() === "") {

            mostrarErro(
                mensagem,
                erroMensagem,
                "Digite sua mensagem."
            );

            formularioValido = false;

        }

        // Verifica se a mensagem possui pelo menos 10 caracteres.
        else if (mensagem.value.trim().length < 10) {

            mostrarErro(
                mensagem,
                erroMensagem,
                "A mensagem deve possuir pelo menos 10 caracteres."
            );

            formularioValido = false;

        }


        /* ----------------------------------------------------
           8.9. RESULTADO DA VALIDAÇÃO
        ---------------------------------------------------- */

        // Se algum campo estiver incorreto, interrompe o envio.
        if (!formularioValido) {

            mensagemRetorno.textContent =
                "Verifique os campos destacados e corrija as informações.";

            mensagemRetorno.classList.add("erro");


            // Localiza o primeiro campo que apresenta erro.
            const primeiroCampoInvalido =
                formularioContato.querySelector(
                    '[aria-invalid="true"]'
                );


            // Coloca o foco no primeiro campo incorreto.
            if (primeiroCampoInvalido) {

                primeiroCampoInvalido.focus();

            }

            return;

        }


        /* ----------------------------------------------------
           8.10. CONFIRMAÇÃO DO ENVIO
        ---------------------------------------------------- */

        // O envio é simulado porque o projeto não utiliza backend.
        mensagemRetorno.textContent =
            "Mensagem enviada com sucesso! Obrigado por entrar em contato com a PetLife. ";

        // Aplica a classe visual de sucesso.
        mensagemRetorno.classList.add("sucesso");
        

        // Limpa os campos após a confirmação.
        formularioContato.reset();
        
         setTimeout(function() {

            window.location.href = "index.html";

        }, 3000);


    });


    /* --------------------------------------------------------
       8.11. LIMPAR ERROS AO PREENCHER OS CAMPOS
    -------------------------------------------------------- */

    // Limpa o erro do assunto quando uma opção é selecionada.
    assunto.addEventListener("change", function() {

        limparErro(assunto, erroAssunto);

    });


    // Limpa o erro do nome enquanto o usuário digita.
    nome.addEventListener("input", function() {

        limparErro(nome, erroNome);

    });


    // Limpa o erro do e-mail enquanto o usuário digita.
    email.addEventListener("input", function() {

        limparErro(email, erroEmail);

    });


    // Limpa o erro da mensagem enquanto o usuário digita.
    mensagem.addEventListener("input", function() {

        limparErro(mensagem, erroMensagem);

    });

}


/* ============================================================
   FIM DO JAVASCRIPT DO PROJETO PETLIFE
============================================================ */
