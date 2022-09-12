let voosAPI = JSON.parse(sessionStorage.getItem("voosAPI"));

function CarregaVoos(voosAPI){
    for (let index = 0; index < voosAPI.length; index++) {
        const voo = voosAPI['data'][index];
        
        let spanMes = document.createElement("span");
        spanMes.innerHTML = "<strong>Mês:</strong>" + voo ;

        let spanPreco = document.createElement("span");
        spanPreco.innerHTML = "<strong>Preço:</strong>" + voo['price'] + " ";

        let spanCompanhia = document.createElement("span");
        spanCompanhia.innerHTML = "<strong>Companhia:</strong>" + voo['airline'] + " ";

        let spanNrVoo = document.createElement("span");
        spanNrVoo.innerHTML = "<strong>Número do Voo:</strong>" + voo['flight_number'] + " ";

        let spanPartida = document.createElement("span");
        spanPartida.innerHTML = "<strong>Partida:</strong>" + voo['departure_at'] + " ";
        
        let spanRetorno = document.createElement("span");
        spanRetorno.innerHTML = "<strong>Retorno:</strong>" + voo['return_at'] + " ";

        let divVoo = document.createElement("div");

        divVoo.appendChild(spanMes);
        divVoo.appendChild(spanPreco);
        divVoo.appendChild(spanCompanhia);
        divVoo.appendChild(spanNrVoo);
        divVoo.appendChild(spanPartida);
        divVoo.appendChild(spanRetorno);
        divVoo.appendChild(document.createElement("br"))
        divVoo.appendChild(document.createElement("br"));
    }
}

CarregaVoos(voosAPI);
