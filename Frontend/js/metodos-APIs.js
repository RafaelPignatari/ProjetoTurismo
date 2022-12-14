const { PassThrough } = require("stream");

async function getIBGECountryInfo() {
    const responseJSON = await fetch("https://servicodados.ibge.gov.br/api/v1/paises/", {
}).then((response) => response.json());

return responseJSON
}

async function getIdiomasByContinente(continente) {
    let url = "https://countryinfoturismo.azurewebsites.net/idiomas?continente=" + continente;
    const responseJSON = await fetch(url, {
    }).then((response) => response.json());
    
    return responseJSON
}

async function getCidades(continente, idioma) {
    let url = "https://countryinfoturismo.azurewebsites.net/cidades?continente=" + continente + "&idioma=" + idioma;
    const responseJSON = await fetch(url, {
    }).then((response) => response.json());
    
    return responseJSON
}

async function getCitiesbyCountry(country) {
    try {
        const responseJSON = await fetch("https://api.api-ninjas.com/v1/city?limit=3&country=" + country, {
        headers: {
            'X-Api-Key': 'ltGCHBdbFL/PPXQTBlyBww==FxmgaTRlWM5qZXAq'
        }
    }).then((response) => response.json());
    return responseJSON;
}
catch {
    return "-"
}
}

async function getWheaterInfo(city) {
    responseFinal = {};
    try {
        const responseJSON = await fetch('https://api.api-ninjas.com/v1/weather?city=' + city, {
        headers: {
            'X-Api-Key': 'ltGCHBdbFL/PPXQTBlyBww==FxmgaTRlWM5qZXAq'
        }
    }).then((reponse) => reponse.json());
    if (typeof(responseJSON['temp']) != "undefined") {
        responseFinal['temperatura'] = responseJSON['temp'];
        return responseFinal;
    } else {
        responseFinal['temperatura'] = '-';
        return responseFinal;
    }
}
catch {
    return responseFinal['temperatura'] = " - ";
}
}

async function getMonetaryInfo(moeda) {
    var moneyToConvert = moeda;
    try {
        if(moneyToConvert != 'BRL') {
            var BRLTomoneyToConvert =moneyToConvert +'-BRL';
            const responseJSON = await fetch('https://economia.awesomeapi.com.br/last/' + BRLTomoneyToConvert, {
        }).then((reponse) => reponse.json());
        return responseJSON[moeda + 'BRL']['high'];
    }
    else {
        return "1"
    }
} 
catch {
    return "-"
}
}

function getAllCountryLanguages(responseJSON) {
    let nameCollection = [];
    
    for (let key in responseJSON) {
        if(responseJSON[key].linguas)
        languages = responseJSON[key].linguas;
        for (let key2 in languages) {
            languageString = languages[key2].nome;
            if (!nameCollection.includes(languageString) && languageString != undefined)
            nameCollection.push(languageString);
        }
    }
    
    return nameCollection;
}

async function getFlights(moeda, origem, destino) {
    try{
        var https = 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/monthly?destination=' + destino + '&origin=' + origem + '&length=3&currency=' + moeda;
        console.log(https);
        const responseJSON = await fetch
        (https , {
            headers: {
                'X-Access-Token': '6a5137d6f8f202bf06af2a39771f56b1',
                'X-RapidAPI-Key': '2af99389efmsh21438fb8207ce25p11f7ffjsn11881ae5aa85'
            }
        }).then((reponse) => reponse.json());
        return responseJSON;
    } 
    catch {
        return "Nenhum voo dispon??vel com os dados enviados"
    }
}

function enviaDadosCadastro() {
    let data = {
        nome: document.getElementById('nome_cad').value,
        login: document.getElementById('login_cad').value,
        senha: document.getElementById('senha_cad').value,
        idade: document.getElementById('idade_cad').value,
    };
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://cadastroapijava.azurewebsites.net/api/usuario/salvar', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    do {
        
    } while (xhr.status != 200);
    sessionStorage.setItem('usuario', data['nome']);
    window.location.href = "../Views/index.html";
}

async function fazLogin() {
    let data = {
        login: document.getElementById('login_cad').value,
        senha: document.getElementById('senha_cad').value,
    };    

    let url = 'https://cadastroapijava.azurewebsites.net/api/usuario/login?login=' + data['login'] + '&senha=' + data['senha'];

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    var usuario = JSON.parse(xmlHttp.responseText);
    var nome = usuario['nome'];
    sessionStorage.setItem('usuario', nome);
    window.location.href = "../Views/index.html";
}