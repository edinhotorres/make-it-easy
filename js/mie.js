////////////////////////////////////////
// MAIN TOOLS //////////////////////////
////////////////////////////////////////
let i = 0;
function start() {
    const elemento = document.getElementById('certidoes-option');
    elemento.style.opacity = "0%"; // transparece o elemento
    elemento.style.display = 'block'; // torna-o 'visível', mas sem opacidade
}

function filtra(campoFiltrar, campoFiltrado){
    // recebe o VALOR dentro do campo texto e converte para String.
    // após, o campo filtrado substituirá tudo (/tudo/g) que não (^) estiver no intervalo ([0-9]) 
    // stringFiltrar = document.getElementById(campoFiltrar).value.toString();
    // stringFiltrado = stringFiltrar.replace(/[^0-9]/g,''); 
    document.getElementById(campoFiltrado).innerHTML=document.getElementById(campoFiltrar).value.toString().replace(/[^0-9]/g,'');
    campoFiltrar.onchange = detectaCNPJ(document.getElementById(campoFiltrado)); // chama a funcao para detectarCNPJ
    // funcao que adiciona um listener ao "campo-filtrado" para dar opcao de tirar certidoes caso detecte um cnpj valido
    // cnpj valido = 14 dígitos
}

// funcao que detecta se o campo filtrado possui 14 digitos (ou seja, se é CNPJ)
function detectaCNPJ(campoFiltrado){
    try { // tente....
        if (campoFiltrado.innerHTML.length == 14) { // se o campo filtrado tiver tamanho 14, entao assuma ser cnpj
            console.log('Abrindo janela');
            certidoesOption(); // chame a funcao certidoesOption
        } else {
            console.log('Fechando janela');
            retiraCertidoesOption();
        }
    }
     catch (e) { // se nao conseguir tal tarefa, diga-me o erro
         console.log(e);
    }
}

// chama a janela certidoesOption de maneira suave
function certidoesOption() {
    document.getElementById('certidoes-option').style.display = 'block'; // coloca como visivel o elemento (que nao
    // aparecerá pois sua opacidade é 0%...)
    fadeElementIn(document.getElementById('certidoes-option')); // chama funcao para aumentar a opacidade suavemente
}
// exibe o elemento suavemente
function fadeElementIn(elemento) {
    if (i < 101){ // enquanto i for menor que 100, faça:
        elemento.style.opacity = i+'%'; // opacidade = i,
        i++; // aumente 1 no i;
        setTimeout(() => fadeElementIn(elemento), 8); // chame esta funcao novamente em 40 milissegundos
    }
}
//remove o certidoesOption suavemente
function retiraCertidoesOption() {
    fadeElementOut(document.getElementById('certidoes-option'));
}
function fadeElementOut(elemento) {
    if (i > 0){ // enquanto i for menor que 0, faça:
        elemento.style.opacity = i+'%'; // opacidade = i,
        i--; // reduz 1 no i;
        setTimeout(() => fadeElementOut(elemento), 8); // chame esta funcao novamente em 40 milissegundos
    } else {
        document.getElementById('certidoes-option').style.display = 'none';
    }
}
// funcao que limpa dois elementos html e some com o certidoesOption da tela
function limpa(campoFiltrar, campoFiltrado){
    document.getElementById(campoFiltrar).value='';
    document.getElementById(campoFiltrado).innerHTML=''; // insere HTML entre as tags. exemplo: <p> texto inserido </p>
    fadeElementOut(document.getElementById('certidoes-option'));
}
////
// Funcao que busca as principais certidões e copia para o clipboard o cnpj sem pontuações 
////
function busca(e){
    e.preventDefault();
    // copiaCnpj();
    const cnpj = document.getElementById('filtrado').innerHTML;
    document.getElementsByTagName('body')[0].style.opacity = '40%';
    setTimeout(() => {
        window.open('https://www3.comprasnet.gov.br/sicaf-web/index.jsf');
        window.open('http://servicos.receita.fazenda.gov.br/Servicos/certidao/CndConjuntaInter/EmiteCertidaoInternet.asp?ni='+cnpj+'&passagens=1&tipo=1');
        window.open('http://www.portaltransparencia.gov.br/sancoes/ceis?paginacaoSimples=true&tamanhoPagina=&offset=&direcaoOrdenacao=asc&colunasSelecionadas=linkDetalhamento%2CcpfCnpj%2Cnome%2CufSancionado%2Corgao%2CtipoSancao%2CdataPublicacao&cpfCnpj='+cnpj);
        window.open('http://portaltransparencia.gov.br/sancoes/cnep?paginacaoSimples=true&tamanhoPagina=&offset=&direcaoOrdenacao=asc&colunasSelecionadas=linkDetalhamento%2CcpfCnpj%2Cnome%2CufSancionado%2Corgao%2CtipoSancao%2CdataInicialSancao%2CdataFinalSancao%2CvalorMulta&cpfCnpj='+cnpj);
        window.open('https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf');
        window.open('http://www.tst.jus.br/certidao');
        window.open('https://www.cnj.jus.br/improbidade_adm/consultar_requerido.php');
        window.open('http://www8.receita.fazenda.gov.br/SimplesNacional/aplicacoes.aspx?id=21');
    }, 2000);
    document.getElementsByTagName('body')[0].style.opacity = '100%';
}

////////////////////////////////////////
// DOF TOOLS
////////////////////////////////////////
function quebra(campoQuebrar, campoQuebrado){
    // descobre quantos blocos de 78 caracteres existem
    let ciclosInteiros = parseInt((document.getElementById(campoQuebrar).value.toString().length)/78);
    // descobre quantos caracteres ficarão de fora dos blocos de 78
    let caracteresRestantes = (document.getElementById(campoQuebrar).value.toString().length)%78;
    // recebe o texto inserido no campo a ser quebrado
    let texto = document.getElementById(campoQuebrar).value.toString();
    // inicia algoritmo para manipulação do texto
    let contador = 0;
    let textoManipulado = "";
    for (i=0; i<ciclosInteiros; i++) {
        // concatena quebra de linha a cada 78 caracteres (ciclo se repete para todos os possiveis blocos de 78)
        textoManipulado = textoManipulado.concat(texto.substr(contador, 78));
        textoManipulado = textoManipulado.concat("<br>");
        contador = contador + 78;
    }
    // apos terminada a concatenacao dos blocos de 78 com as quebras de linha, concatena os caracteres restantes
    textoManipulado = textoManipulado.concat(texto.substr(contador, caracteresRestantes));
    // lança resultado (texto manipulado) ao campo quebrado para que usuario possa copiar
    document.getElementById(campoQuebrado).innerHTML=textoManipulado;
}
