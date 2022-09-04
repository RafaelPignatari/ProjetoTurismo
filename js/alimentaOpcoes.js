function adicionaOpcao(pais){
    let pHistorico = document.createElement("p");
    pHistorico.innerHTML = pais['historico'];

    let spanIdiomas = document.createElement("span");
    spanIdiomas.innerHTML = "<strong>Idiomas:</strong>" + pais['idiomas'] + "<br>";

    let spanClima = document.createElement("span");
    spanClima.innerHTML = "<strong>Clima:</strong>" + pais['clima'] + "C° <br>";

    let spanMoeda = document.createElement("span");
    spanMoeda.innerHTML = "<strong>Moeda:</strong>" + pais['moeda'] + "<br>";

    let spanNomePais = document.createElement("span");
    spanNomePais.innerHTML = "<strong>Nome do país:</strong>" + pais['nome'] + "<br>";

    let spanNomeCidade = document.createElement("span");
    spanNomeCidade.innerHTML = "<strong>Nome do cidade:</strong>" + pais['cidade'] + "<br>";

    let divOpcaoDeViagem = document.createElement("div");
    divOpcaoDeViagem.appendChild(spanNomePais);
    divOpcaoDeViagem.appendChild(spanNomeCidade);
    divOpcaoDeViagem.appendChild(spanIdiomas);
    divOpcaoDeViagem.appendChild(spanMoeda);
    divOpcaoDeViagem.appendChild(spanClima);
    divOpcaoDeViagem.appendChild(pHistorico);

    opcoesDeViagem.appendChild(divOpcaoDeViagem);
}

