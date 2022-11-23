function verificaSessaoUsuario() {
    if(sessionStorage.hasOwnProperty('usuario')) 
        window.location.href = "../Views/index.html";
}

verificaSessaoUsuario()