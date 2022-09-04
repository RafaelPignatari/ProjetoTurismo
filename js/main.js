let botaoTestar = document.querySelector("#botaoTestar");
let continente = document.querySelector("#continente");

async function getLanguageFromContinent() {
    let paises = await getIBGECountryInfo();
    let continenteValue = document.querySelector("#continente > input:checked").value;
    let idiomas;

    paises = paises.filter((obj) => obj['localizacao']['regiao']['nome'] == continenteValue)
    idiomas = getAllCountryLanguages(paises);
    console.log(idiomas);

    return idiomas;
}

continente.addEventListener("change", function() {
    let idioma = document.getElementById("idioma");
    let idiomasAPI = getLanguageFromContinent();
    
    //idioma.append
})

botaoTestar.addEventListener("click", function(event) {
    continente = document.querySelector("#continente > input:checked").value
    event.preventDefault(); //Para que o botão não atualize a página de cara.
    // perguntas.forEach(limpaErros);
    // perguntas.forEach(validaResposta);
    
    // console.log(setObj())

    getLanguageFromContinent();
})