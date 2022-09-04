async function getIBGECountryInfo() {
    const responseJSON = await fetch("https://servicodados.ibge.gov.br/api/v1/paises/", {
    }).then((reponse) => reponse.json());
    //console.log('Response ==>' + responseJSON);
    //var responseObj = responseJSON[0];
    //console.log(responseObj)
    //retorna 272 países
    
    return responseJSON
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

