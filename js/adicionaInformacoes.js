let divMaisInformacoes = document.getElementById("maisInformacoes");
let centerDiv = document.getElementById("centerDiv");
let cidade = JSON.parse(sessionStorage.getItem("cidade"));

function adicionaMaisInformações(cidade){
    let pHistorico = document.createElement("p");
    pHistorico.innerHTML = cidade['historico'];

    let spanIdiomas = document.createElement("span");
    spanIdiomas.innerHTML = "<strong>Idiomas:</strong>" + cidade['idioma'] + "<br>";

    let spanClima = document.createElement("span");
    spanClima.innerHTML = "<strong>Clima:</strong>" + cidade['temperatura'] + "C° <br>";

    let spanMoeda = document.createElement("span");
    spanMoeda.innerHTML = "<strong>Moeda:</strong>" + cidade['moeda'] + "<br>";

    let spanNomePais = document.createElement("span");
    spanNomePais.innerHTML = "<strong>Nome do país:</strong>" + cidade['pais'] + "<br>";

    let spanNomeCidade = document.createElement("span");
    spanNomeCidade.innerHTML = "<strong>Nome da cidade:</strong>" + cidade['name'] + "<br>";

    let buttonPartiu = document.createElement("button");
    buttonPartiu.innerHTML = "Partiu!";
    buttonPartiu.className = "botao";
    
    buttonPartiu.onclick = function () {
        sessionStorage.setItem("cidade-pais", JSON.stringify(cidade['name'] + " - " + cidade['pais']));
        window.location.href = "../Views/formularioDeViagem.html";
    };

    divMaisInformacoes.appendChild(spanNomePais);
    divMaisInformacoes.appendChild(spanNomeCidade);
    divMaisInformacoes.appendChild(spanIdiomas);
    divMaisInformacoes.appendChild(spanMoeda);
    divMaisInformacoes.appendChild(spanClima);
    divMaisInformacoes.appendChild(pHistorico);
    centerDiv.appendChild(buttonPartiu);

}

adicionaMaisInformações(cidade);