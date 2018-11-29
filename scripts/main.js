var desafiantes;
var listResponses = [];

var totalPontosDesafianteVermelho;
var totalPontosDesafianteAzul;


window.onload = function () {
    var btnFight = document.getElementById('btnFight');

    var usuarioDesafianteAzul = document.getElementById('desafianteAzul');
    var usuarioDesafianteVermelho = document.getElementById('desafianteVermelho');

    var totalPontosAzul = document.getElementById('totalPontosAzul');
    var totalPontosVermelho = document.getElementById('totalPontosVermelho');


    btnFight.addEventListener("click", function () {
        listResponses = [];
        desafiantes = [usuarioDesafianteAzul.value, usuarioDesafianteVermelho.value];

        desafiantes.forEach((nome) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = async function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(xhttp.responseText);
                    var texto = (JSON.parse(xhttp.responseText));
                    listResponses.push(texto);

                    if (texto.login.toLowerCase() == desafiantes[0]) {
                        var divDesafianteAzul = document.getElementById('card1');
                        divDesafianteAzul.setAttribute('style', 'background-image: url(' + listResponses[0].avatar_url +')'); 
                        totalPontosDesafianteAzul = calcPontos(this.responseText); 
                        totalPontosAzul.innerHTML = "Total: " + totalPontosDesafianteAzul;          
                    }

                    if (texto.login.toLowerCase() == desafiantes[1]) {               
                        var divDesafianteAzul = document.getElementById('card2');
                        divDesafianteAzul.setAttribute('style', 'background-image: url(' + listResponses[1].avatar_url + ')'); 
                        totalPontosDesafianteVermelho = calcPontos(this.responseText);  
                        totalPontosVermelho.innerHTML = "Total: " + totalPontosDesafianteVermelho;                 
                    }
                }
            };
            xhttp.open("GET", "https://api.github.com/users/" + nome, true);
            xhttp.send();
        });


    });
};

function calcPontos(perfil) {
    var totalRepos = parseInt(perfil.public_repos);
    var totalFollowers = parseInt(perfil.followers);
    var totalFollowing = parseInt(perfil.following);
    var totalStars = (perfil.repos_url.length) ? getTotalStars(perfil.repos_url) : 0;
    var totalGists = parseInt(perfil.public_gists);
    
    var resultado = [
        {
            criterio: "Repositório publico",
            qtd: totalRepos,
            total: totalRepos * 20
        },
        {
            criterio: "Followers",
            qtd: totalFollowers,
            total: totalFollowers * 10
        },
        {
            criterio: "Following",
            qtd: totalFollowing,
            total: totalFollowing * 5
        },
        {
            criterio: "Estrela em repositórios",
            qtd: totalStars,
            total: totalStars * 10
        },
        {
            criterio: "Gists",
            qtd: totalGists,
            totalGists: totalGists * 5
        }
    ];
    return resultado;
}
function getTotalStars(repos_url) {
    const xhttp = new XMLHttpRequest();         
    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            var totalStars = 0;
            var repos = (JSON.parse(xhttp.responseText));
            repos.forEach((repo) => {
                totalStars += repo.stargazers_count;
            });
            return parseInt(totalStars);
        }
    };         
    xhttp.open("GET", repos_url , true); 
    xhttp.send();
}

function verificaVendedor(){
    if (totalPontosDesafianteAzul > totalPontosDesafianteVermelho) {
        
    }else{

    }
    if (totalPontosDesafianteAzul === totalPontosDesafianteVermelho) {
        
    }
}






