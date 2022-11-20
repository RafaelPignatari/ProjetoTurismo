let buttonEnviar = document.querySelector("#buttonEnviar");
let continente = document.querySelector("#continente");
let idioma = document.querySelector('#idioma');
let dinheiro = document.querySelector("#dinheiro");
let botaoEnviar = document.getElementById("buttonEnviar");
let paises;
let cidades = [];
let questoes = [];

function showLoadDiv() {
    document.getElementById("loader").style.display = "block";
}

function limitaIdiomas(idiomas, limite) {
    while (idiomas.length > limite) {
        idiomas.splice(Math.floor(Math.random() * idiomas.length), 1);
    }
}

async function getLanguageFromContinent() {
    let continenteValue = document.querySelector("#continente > input:checked").value;
    let idiomas = await getIdiomasByContinente(continenteValue);
    limitaIdiomas(idiomas, 15)
    return idiomas.map(idioma => idioma[0]);
}

buttonEnviar.addEventListener("click", async function(event) {
    event.preventDefault(); //Para que o botão não atualize a página de cara.
    cidades = [];
    let continenteEscolhido = document.querySelector("#continente > input:checked").value;
    let idiomaEscolhido = document.querySelector("#idioma > input:checked").value;
    let climaEscolhido = document.querySelector("#clima > input:checked").value;
    let dinheiroEscolhido = document.querySelector("#dinheiro > input:checked").value;

    showLoadDiv();
    cidades = await getCidades(continenteEscolhido, idiomaEscolhido);
    cidades = cidades.map(cidade => {
        return  {
            "cidade": cidade[0],
            "pais": cidade[1],
            "idioma": cidade[2],
            "moeda": cidade[3],
            "temperatura": cidade[4],
            "historico": cidade[5]
    }});

    for (let number in cidades) {
        valorMonetario = await getMonetaryInfo(cidades[number]['moeda']);
        cidades[number]['dinheiroDisponivel'] = valorMonetario != "-" ? ((dinheiroEscolhido/ valorMonetario).toFixed(2) + " " + cidades[number]['moeda']) : "-";
    }

    cidades = filtraCidadesPorClima(cidades, climaEscolhido);

    sessionStorage.setItem("cidades", JSON.stringify(cidades));
    window.location.href = "../Views/opcoesDeViagem.html";
})

function filtraCidadesPorClima(cidades, clima) {
    let qtdCidades = cidades.length;

    if (qtdCidades < 4)
        return cidades;

    cidades.sort(function(a, b) {
        return b['temperatura'] - a['temperatura']
    })

    switch (clima) {
        case 'calor':
            cidades = cidades.slice(0, 3);
            break;
        case 'ameno':
            cidades = cidades.slice(Math.round(qtdCidades / 2) - 2, Math.round(qtdCidades / 2) + 1);
            break;
        default:
            cidades = cidades.slice(qtdCidades - 3, qtdCidades);
            break;
    }
    return cidades;
}

continente.addEventListener("change", async function(event) {
    if (isChecked(event.currentTarget))
        return;

    let idiomasAPI = await getLanguageFromContinent();
    let label = document.createElement("label");
    let br = document.createElement("br");

    idioma.innerHTML = '';
    label.textContent = 'Qual seu idioma de preferência?';
    idioma.appendChild(label);
    idioma.appendChild(br);

    for (i in idiomasAPI) {
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
    if (isChecked(event.currentTarget))
        return;
    idioma.hidden = true;
    dinheiro.hidden = false;
})

dinheiro.addEventListener("click", function(event) {
    if (isChecked(event.currentTarget))
        return;
    dinheiro.hidden = true;
    clima.hidden = false;
})

clima.addEventListener("click", function(event) {
    if (isChecked(event.currentTarget))
        return;
    botaoEnviar.style.display = "block";
})

function isChecked(div) {
    return div.querySelector("input:checked") === null;
}