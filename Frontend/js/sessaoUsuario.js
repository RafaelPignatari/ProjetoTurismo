function verificaSessaoUsuario () {
    var linksId = document.getElementById("divUserAccess");
    var nameIds = document.getElementById("divUserName");
    if(!sessionStorage.hasOwnProperty('usuario')) {
        linksId.style.visibility = "visible";
        nameIds.style.visibility = "hidden";
    } else {
        linksId.style.visibility = "hidden";
        nameIds.style.visibility = "visible";
        document.getElementById("labelName").innerHTML = sessionStorage.getItem('usuario');
    }
}