let botaoTestar = document.querySelector("#botaoTestar");
let continente = document.querySelector("#continente");
let idioma = document.querySelector('#idioma');
let dinheiro = document.querySelector("#dinheiro");
let paises;
let cidades = [];
let questoes = [];

function showLoadDiv(){
    document.getElementById("loader").style.display = "block";
}

function limitaIdiomas(idiomas, limite){
    while(idiomas.length > limite){
        idiomas.splice(Math.floor(Math.random() * idiomas.length), 1);
    }
}

async function getLanguageFromContinent() {
    paises = await getIBGECountryInfo();
    let paisesFiltroContinental;
    let continenteValue = document.querySelector("#continente > input:checked").value;
    let idiomas;
    
    paisesFiltroContinental = paises.filter((obj) => obj['localizacao']['regiao']['nome'] == continenteValue)
    idiomas = getAllCountryLanguages(paisesFiltroContinental).sort();
    limitaIdiomas(idiomas, 15)
    return idiomas;
}

botaoTestar.addEventListener("click", async function(event) {
    event.preventDefault(); //Para que o botão não atualize a página de cara.
    cidades = [];
    let continenteEscolhido = document.querySelector("#continente > input:checked").value;
    let idiomaEscolhido = document.querySelector("#idioma > input:checked").value;
    let climaEscolhido = document.querySelector("#clima > input:checked").value;
    let paisesFiltrados = paises.filter((pais) => pais['localizacao']['regiao']['nome'] == continenteEscolhido && pais['linguas'][0]['nome'] == idiomaEscolhido);
    
    showLoadDiv();
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
    
    // cidades.sort(function(a, b){
    //     return b['temperatura'] - a['temperatura']
    // })

    // if (cidades.length < 4 ){console.log(cidades)}

    // else if (climaEscolhido = 'calor'){
    //     var test = cidades.slice(3)
    //     console.log(test)
    // }
    // else if (climaEscolhido = 'ameno'){
    //     var test = cidades.slice(Math.round(qtdCidades/2), Math.round(qtdCidades/2) + 3)
    //     console.log(test)
    // }
    // else if (climaEscolhido = 'frio'){
    //     var test = cidades.slice(-3)
    //     console.log(test)
    // }
    
    sessionStorage.setItem("cidades", JSON.stringify(cidades));
    window.location.href = "../Views/opcoesDeViagem.html";
})

continente.addEventListener("change", async function(event) {
    if(isChecked(event.currentTarget))
        return;
    
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

idioma.addEventListener("click", function(event) {
    if(isChecked(event.currentTarget))
        return;
    idioma.hidden = true;
    dinheiro.hidden = false;
})

dinheiro.addEventListener("click", function(event) {
    if(isChecked(event.currentTarget))
        return;
    dinheiro.hidden = true;
    clima.hidden = false;
})

function isChecked(div){
    return div.querySelector("input:checked") === null;
}