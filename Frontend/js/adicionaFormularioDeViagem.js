let cidade = JSON.parse(sessionStorage.getItem("cidade-pais"));
let voosAPI;

function preencheCidade (cidade){
    let cbCidade = document.getElementById("cidadePais");

    console.log(cidade);
    cbCidade.value = cidade;
}

preencheCidade(cidade);

pesquisar.addEventListener("click", async function() {
    let moeda = "BRL";
    let origem = document.querySelector("#IATAOrigem > input").value;
    let destino = document.querySelector("#IATADestino > input").value;
    let chegada = document.querySelector("#dataChegada > input").value;
    let partida = document.querySelector("#dataPartida > input").value;

    voosAPI = await getFlights(moeda, origem, destino, chegada, partida);    
    sessionStorage.setItem("voosAPI", JSON.stringify(voosAPI));
    window.location.href = "../Views/voos.html";    
});

// preencher.addEventListener("click", function() {
//     //document.querySelector("#moeda1 > input").value = 'BRL';
//     document.querySelector("#IATAOrigem > input").value = 'LED';
//     document.querySelector("#IATADestino > input").value = 'MOW';
//     document.querySelector("#dataChegada > input").value = '';
//     document.querySelector("#dataPartida > input").value = '';
// });