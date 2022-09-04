async function f() {
    var paises = await getIBGECountryInfo()
    paises.filter((obj) => obj['localizacao']['regiao']['nome'] == 'Europa')
    console.log(paises);
}

//await f();
var paises = await getIBGECountryInfo()
console.log(paises);