let opcoesDeViagem = document.getElementById("opcoesDeViagem");
let opcao = {nome : "Brasil", cidade : "São Paulo"}
let opcao2 = {nome : "Brasil2", cidade : "São Paulo"}
let opcao3 = {nome : "Brasil3", cidade : "São Paulo"}

let paises = [opcao, opcao2, opcao3]

function adicionaMaisInformações(paises){
    for (let index = 0; index < paises.length; index++) {
        const pais = paises[index];
        let spanNomePais = document.createElement("span");
        spanNomePais.innerHTML = "<strong>País:</strong>" + pais['nome'] + " ";

        let spanNomeCidade = document.createElement("span");
        spanNomeCidade.innerHTML = "<strong>Cidade:</strong>" + pais['cidade'] + " ";

        let buttonMaisInformações = document.createElement("button");
        buttonMaisInformações.innerHTML = "É esse!";
        buttonMaisInformações.value = index;

        let divOpcaoDeViagem = document.createElement("div");
        divOpcaoDeViagem.appendChild(spanNomePais);
        divOpcaoDeViagem.appendChild(spanNomeCidade);
        divOpcaoDeViagem.appendChild(buttonMaisInformações);

        opcoesDeViagem.appendChild(divOpcaoDeViagem);
        opcoesDeViagem.appendChild(document.createElement("br"));
    }
    
}

adicionaMaisInformações(paises)