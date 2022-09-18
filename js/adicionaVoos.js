let voosAPI = JSON.parse(sessionStorage.getItem("voosAPI"));

function carregaVoos(voosAPI){
    for (let voo in voosAPI.data) {
        let spanMes = document.createElement("span");
        spanMes.innerHTML = "<strong>Mês: </strong>" + formataDataAPI(voo) +" ";

        let spanPreco = document.createElement("span");
        spanPreco.innerHTML = "<strong>Preço:</strong> R$" + voosAPI.data[voo]['price'] + " ";

        let spanCompanhia = document.createElement("span");
        spanCompanhia.innerHTML = "<strong>Companhia: </strong>" + voosAPI.data[voo]['airline'] + " ";

        let spanNrVoo = document.createElement("span");
        spanNrVoo.innerHTML = "<strong>Número do Voo: </strong>" + voosAPI.data[voo]['flight_number'] + " ";

        let spanPartida = document.createElement("span");
        spanPartida.innerHTML = "<strong>Partida: </strong>" + formataDataAPI(voosAPI.data[voo]['departure_at']) + " ";
        
        let spanRetorno = document.createElement("span");
        spanRetorno.innerHTML = "<strong>Retorno: </strong>" + formataDataAPI(voosAPI.data[voo]['return_at']) + " ";

        let divVoo = document.getElementById("Voos");
        divVoo.className = "styledDiv";

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

function formataDataAPI(data) {
    let dataFormatada = "";

    if (data.length <= 7) {
        dataFormatada = data[5] + data[6] +"/" +data.substring(0, 4);
    }
    else{
        dataFormatada += data[8] + data[9] +"/"; //Dia
        dataFormatada += data[5] + data[6] +"/";; //Mês
        dataFormatada += data.substring(0, 4) +" "; //Ano

        dataFormatada += data[11] + data[12] + ":"; //Hora
        dataFormatada += data[14] + data[15] + ":"; //Minuto
        dataFormatada += data[17] + data[18] +" "; //Segundo

        dataFormatada += "GMT: " +data[19] +data[20] +data[21];
    }
    
    return dataFormatada;
}

carregaVoos(voosAPI);
