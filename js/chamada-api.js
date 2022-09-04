
async function getIBGECountryInfo() {
    const responseJSON = await fetch("https://servicodados.ibge.gov.br/api/v1/paises/", {
    }).then((reponse) => reponse.json());
    //console.log('Response ==>' + responseJSON);
    //var responseObj = responseJSON[0];
    //console.log(responseObj)
    //retorna 272 países
    
    return responseJSON
}