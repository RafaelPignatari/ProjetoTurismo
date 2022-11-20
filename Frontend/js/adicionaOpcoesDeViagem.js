let cidades = JSON.parse(sessionStorage.getItem("cidades"));
let opcoesDeViagem = document.getElementById("opcoesDeViagem");

function adicionaMaisInformações(cidades){
    for (let index = 0; index < cidades.length; index++) {
        const cidade = cidades[index];
        let spanNomePais = document.createElement("span");
        spanNomePais.innerHTML = "<strong>País:</strong>" + cidade['pais'] + " ";

        let spanNomeCidade = document.createElement("span");
        spanNomeCidade.innerHTML = "<strong>Cidade:</strong>" + cidade['cidade'] + " ";

        let buttonMaisInformações = document.createElement("button");
        buttonMaisInformações.innerHTML = "É esse!";
        buttonMaisInformações.value = index;
        buttonMaisInformações.classList = "botao"
        buttonMaisInformações.onclick = function () {
            sessionStorage.setItem("cidade", JSON.stringify(cidades[this.value]));
            window.location.href = "../Views/maisInformacoes.html";
        };

        let divOpcaoDeViagem = document.createElement("div");
        divOpcaoDeViagem.className = "opcaoDeViagem";
        divOpcaoDeViagem.appendChild(spanNomePais);
        divOpcaoDeViagem.appendChild(spanNomeCidade);
        divOpcaoDeViagem.appendChild(buttonMaisInformações);

        opcoesDeViagem.appendChild(divOpcaoDeViagem);
        opcoesDeViagem.appendChild(document.createElement("br"));
    }
}

adicionaMaisInformações(cidades);