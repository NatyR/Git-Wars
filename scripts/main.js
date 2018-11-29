var desafiantes;
var listResponses = [];


window.onload = function () {
    var btnFight = document.getElementById('btnFight');

    var usuarioDesafianteAzul = document.getElementById('desafianteAzul');
    var usuarioDesafianteVermelho = document.getElementById('desafianteVermelho');

    btnFight.addEventListener("click", function () {
        desafiantes = [usuarioDesafianteAzul.value, usuarioDesafianteVermelho.value];
            
        desafiantes.forEach((nome) => { 
            const xhttp = new XMLHttpRequest();         
            xhttp.onreadystatechange = async function() {
                if (this.readyState == 4 && this.status == 200) {
                   console.log(xhttp.responseText); 
                   var texto = (JSON.parse(xhttp.responseText));
                   listResponses.push(texto);
                }
            };         
            xhttp.open("GET", "https://api.github.com/users/" + nome , true); 
            xhttp.send();
          });       
    });
    

};






