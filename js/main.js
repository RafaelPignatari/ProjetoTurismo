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

continente.addEventListener("change", async function() {
    let idioma = document.getElementById("idioma");
    let idiomasAPI = await getLanguageFromContinent();
    let label = document.createElement("label");
    let br = document.createElement("br");

    idioma.innerHTML = '';
    label.textContent = 'Qual seu idioma de preferência?';
    idioma.appendChild(label);
    idioma.appendChild(br);

    for (i in idiomasAPI)
    {
        let elemento = document.createElement("input")
        let label = document.createElement("label")
        let br = document.createElement("br");

        idiomasAPI[i] = idiomasAPI[i][0].toUpperCase() + idiomasAPI[i].slice(1);
        label.textContent = idiomasAPI[i];
        
        elemento.id = 'idioma' + idiomasAPI[i];
        elemento.name = 'idioma';
        elemento.type = 'radio';
        elemento.value = idiomasAPI[i];

        idioma.appendChild(elemento);
        idioma.appendChild(label);
        idioma.appendChild(br);
        
    }
    
})

botaoTestar.addEventListener("click", function(event) {
    continente = document.querySelector("#continente > input:checked").value
    event.preventDefault(); //Para que o botão não atualize a página de cara.
    // perguntas.forEach(limpaErros);
    // perguntas.forEach(validaResposta);
    
    // console.log(setObj())

    getLanguageFromContinent();
})