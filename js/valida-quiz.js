
perguntas = ["clima", "idioma", "dinheiro"]


function setObj(){
    let clima = document.querySelector("#clima > input:checked")
    let idioma = document.querySelector("#idioma > input:checked")
    let dinheiro = document.querySelector("#dinheiro > input:checked")
    let obj = []
    if(clima !== null)
        obj["clima"] = clima.value
    if(idioma !== null)
        obj["idioma"] = idioma.value
    if(dinheiro !== null)
        obj["dinheiro"] = dinheiro.value
        
    console.log(Object.keys(obj).length)
    return obj
}

function validaResposta(perguntaNome){
    let pergunta = document.querySelector("#" + perguntaNome + " > input:checked")
    if(pergunta !== null)
        document.querySelector("#erro" + perguntaNome ).style.visibility = "visible";
}

function limpaErros(perguntaNome){
    document.querySelector("#erro" + perguntaNome ).style.visibility = "hidden";
    console.log("Here")
}