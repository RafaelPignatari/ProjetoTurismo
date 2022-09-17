let cidade = JSON.parse(sessionStorage.getItem("cidade-pais"));
let voosAPI;

function preencheCidade (cidade){
    let div = document.getElementById("formularioDeViagem0");    
    let label = document.createElement("label");
    let input = document.createElement("input");
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    
    input.id = "Cidade-País"
    input.name = "Cidade-País"
    input.type = "text";
    input.size = 40;
    input.value = cidade;

    label.textContent = "Cidade - País"
    
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(br);
    div.appendChild(br2);

}

preencheCidade(cidade);

pesquisar.addEventListener("click", async function() {
    //let moeda = document.querySelector("#moeda1 > input").value;
    let moeda = "BRL";
    let origem = document.querySelector("#IATAOrigem > input").value;
    let destino = document.querySelector("#IATADestino > input").value;
    let chegada = document.querySelector("#dataChegada > input").value;
    let partida = document.querySelector("#dataPartida > input").value;

    voosAPI = await getFlights(moeda, origem, destino, chegada, partida);    
    sessionStorage.setItem("voosAPI", JSON.stringify(voosAPI));
    window.location.href = "../Views/voos.html";    
});

preencher.addEventListener("click", function() {
    //document.querySelector("#moeda1 > input").value = 'BRL';
    document.querySelector("#IATAOrigem > input").value = 'LED';
    document.querySelector("#IATADestino > input").value = 'MOW';
    document.querySelector("#dataChegada > input").value = '';
    document.querySelector("#dataPartida > input").value = '';
});