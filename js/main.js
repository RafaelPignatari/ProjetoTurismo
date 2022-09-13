let botaoTestar = document.querySelector("#botaoTestar");
let continente = document.querySelector("#continente");
let paises;
let cidades = [];

async function getLanguageFromContinent() {
    paises = await getIBGECountryInfo();
    let paisesFiltroContinental;
    let continenteValue = document.querySelector("#continente > input:checked").value;
    let idiomas;
    
    paisesFiltroContinental = paises.filter((obj) => obj['localizacao']['regiao']['nome'] == continenteValue)
    idiomas = getAllCountryLanguages(paisesFiltroContinental);
    
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
        
        elemento.id = 'idioma' + idiomasAPI[i];
        elemento.name = 'idioma';
        elemento.type = 'radio';
        elemento.value = idiomasAPI[i];
        
        idiomasAPI[i] = idiomasAPI[i][0].toUpperCase() + idiomasAPI[i].slice(1);
        label.textContent = idiomasAPI[i];
        
        idioma.appendChild(elemento);
        idioma.appendChild(label);
        idioma.appendChild(br);        
    }

    continente.hidden = true;
})

botaoTestar.addEventListener("click", async function(event) {
    event.preventDefault(); //Para que o botão não atualize a página de cara.
    cidades = [];
    let continenteEscolhido = document.querySelector("#continente > input:checked").value;
    let idiomaEscolhido = document.querySelector("#idioma > input:checked").value;
    let climaEscolhido = document.querySelector("#clima > input:checked").value;
    let paisesFiltrados = paises.filter((pais) => pais['localizacao']['regiao']['nome'] == continenteEscolhido && pais['linguas'][0]['nome'] == idiomaEscolhido);
    
    for (let i in paisesFiltrados) {
        let codigoPais = paisesFiltrados[i].id["ISO-3166-1-ALPHA-2"];
        let cidadesAPI = await getCitiesbyCountry(codigoPais);
        
        for(let number in cidadesAPI) {
            clima = await getWheaterInfo(cidadesAPI[number]["name"]);
            valorMonetario = await getMonetaryInfo(paisesFiltrados[i]["unidades-monetarias"][0].id["ISO-4217-ALPHA"]);
            cidadesAPI[number]['temperatura'] = clima['temperatura'];
            cidadesAPI[number]['pais'] = paisesFiltrados[i].nome.abreviado;
            cidadesAPI[number]['historico'] = paisesFiltrados[i].historico;
            cidadesAPI[number]['idioma'] = idiomaEscolhido;   
            cidadesAPI[number]['moeda'] = valorMonetario;                      
        }   
        cidades = cidades.concat(cidadesAPI);
    }; 
    
    cidades.sort(function(a, b){
        return b['temperatura'] - a['temperatura']
    })
    // let qtdCidades = cidades.length;
    
    // if (qtdCidades < 4 ){console.log(cidades)}
    
    // else if (climaEscolhido = 'calor'){
    //     console.log(cidades.slice(3))
    // }
    // else if (climaEscolhido = 'ameno'){
    //     console.log(cidades.slice(Math.round(qtdCidades/2), Math.round(qtdCidades/2) + 3))
    // }
    // else if (climaEscolhido = 'frio'){
    //     console.log(cidades.slice(-3))
    // }
    
    sessionStorage.setItem("cidades", JSON.stringify(cidades));
    window.location.href = "../Views/opcoesDeViagem.html";
})


