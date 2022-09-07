async function getIBGECountryInfo() {
    const responseJSON = await fetch("https://servicodados.ibge.gov.br/api/v1/paises/", {
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
            responseFinal['temperatura'] = responseJSON['temp'] + ' C°';
            return responseFinal;
        } else {
            responseFinal['temperatura'] = '-';
            return responseFinal;
        }
    }
    catch {
        console.log("ENTREI AUQI")
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