async function getIBGECountryInfo() {
    const responseJSON = await fetch("https://servicodados.ibge.gov.br/api/v1/paises/", {
    }).then((response) => response.json());
    
    return responseJSON
}

async function getCitiesbyCountry(country) {
    const responseJSON = await fetch("https://api.api-ninjas.com/v1/city?limit=3&country=" + country, {
        headers: {
            'X-Api-Key': 'ltGCHBdbFL/PPXQTBlyBww==FxmgaTRlWM5qZXAq'
        }
    }).then((response) => response.json());
    
    return responseJSON;
}

async function getWheaterInfo(city) {
    responseFinal = {};
    const responseJSON = await fetch('https://api.api-ninjas.com/v1/weather?city=' + city, {
        headers: {
            'X-Api-Key': 'ltGCHBdbFL/PPXQTBlyBww==FxmgaTRlWM5qZXAq'
        }
    }).then((reponse) => reponse.json());
    responseFinal['temperatura'] = responseJSON['temp'];
    return responseFinal;
}

async function getMonetaryInfo(moeda) {
    var moneyToConvert = moeda;

    if(moneyToConvert != 'BRL') {
        var BRLTomoneyToConvert = 'BRL-' + moneyToConvert;
        const responseJSON = await fetch('https://economia.awesomeapi.com.br/last/' + BRLTomoneyToConvert, {
        }).then((reponse) => reponse.json());
        
        return responseJSON['BRL' + moeda]['high'];
    }
    else {
        return "1"
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