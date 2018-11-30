var desafiantes;
var listResponses = [];

var listaPontosDesafianteVermelho;
var listaPontosDesafianteAzul;

var totalVermelho = 0;
var totalAzul = 0;

var processouAzul = false;
var processouVermelho = false;



window.onload = function () {
    var btnFight = document.getElementById('btnFight');

    var usuarioDesafianteAzul = document.getElementById('desafianteAzul');
    var usuarioDesafianteVermelho = document.getElementById('desafianteVermelho');

    var totalPontosAzul = document.getElementById('totalPontosAzul');
    var totalPontosVermelho = document.getElementById('totalPontosVermelhos');


    btnFight.addEventListener("click", function () {

        //Validação de inputs estão vazios
        if (usuarioDesafianteAzul.value === "") {
            alert("por favor preencha o campo usuário de github")
            return false;
        }

        if (usuarioDesafianteVermelho.value === "") {
            alert("por favor preencha o campo usuário de github");
            return false;
        }

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
                        divDesafianteAzul.setAttribute('style', 'background-image: url(' + listResponses[0].avatar_url + ')');
                        listaPontosDesafianteAzul = calcPontos(texto);

                        var listaDeCriteriosAzul = document.getElementById('listaDeCriteriosAzul');
                        var listaQuantidadeAzul = document.getElementById('listaQuantidadeAzul');
                        var listaPontodTotaisAzul = document.getElementById('listaPontodTotaisAzul');


                        for (var index = 0; index < listaPontosDesafianteAzul.length; index++) {
                            var tagLiCriterio = document.createElement('li');
                            tagLiCriterio.setAttribute('style', 'text-decoration: line-through blue');
                            var tagLiQuantidade = document.createElement('li');
                            tagLiQuantidade.setAttribute('style', 'text-decoration: underline overline dotted blue');
                            var tagLiTotal = document.createElement('li');
                            tagLiTotal.setAttribute('style', 'text-decoration: underline overline dotted blue');
                            

                            tagLiCriterio.innerText = listaPontosDesafianteAzul[index].criterio;
                            tagLiQuantidade.innerText = listaPontosDesafianteAzul[index].qtd;
                            tagLiTotal.innerText = listaPontosDesafianteAzul[index].total;

                            listaDeCriteriosAzul.append(tagLiCriterio);
                            listaQuantidadeAzul.append(tagLiQuantidade);
                            listaPontodTotaisAzul.append(tagLiTotal);


                            totalAzul = totalAzul + parseInt(listaPontosDesafianteAzul[index].total);
                        }
                        totalPontosAzul.innerHTML = "Total: " + totalAzul;
                        processouAzul = true
                    }

                    if (texto.login.toLowerCase() == desafiantes[1]) {
                        var divDesafianteAzul = document.getElementById('card2');
                        divDesafianteAzul.setAttribute('style', 'background-image: url(' + listResponses[1].avatar_url + ')');
                        listaPontosDesafianteVermelho = calcPontos(texto);

                        


                        var listaDeCriteriosVermelho = document.getElementById('listaDeCriteriosVermelho');
                        var listaQuantidadeVermelho = document.getElementById('listaQuantidadeVermelho');
                        var listaPontodTotaisVermelho = document.getElementById('listaPontodTotaisVermelho');


                        for (var index = 0; index < listaPontosDesafianteVermelho.length; index++) {
                            var tagLiCriterio = document.createElement('li');
                            tagLiCriterio.setAttribute('style', 'text-decoration: line-through red');
                            var tagLiQuantidade = document.createElement('li');
                            tagLiQuantidade.setAttribute('style', 'text-decoration: underline overline dotted red');
                            var tagLiTotal = document.createElement('li');
                            tagLiTotal.setAttribute('style', 'text-decoration: underline overline dotted red');

                            tagLiCriterio.innerText = listaPontosDesafianteVermelho[index].criterio;
                            tagLiQuantidade.innerText = listaPontosDesafianteVermelho[index].qtd;
                            tagLiTotal.innerText = listaPontosDesafianteVermelho[index].total;

                            listaDeCriteriosVermelho.append(tagLiCriterio);
                            listaQuantidadeVermelho.append(tagLiQuantidade);
                            listaPontodTotaisVermelho.append(tagLiTotal);

                            totalVermelho = totalVermelho + parseInt(listaPontosDesafianteVermelho[index].total);

                        }

                        totalPontosVermelho.innerHTML = "Total: " + totalVermelho;
                        processouVermelho = true;
                    }

                    if (processouAzul && processouVermelho) {
                        //chama função que verifica quem ganhou
                        verificaVendedor();
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
    //var totalStars = (perfil.repos_url.length) ? getTotalStars(perfil.repos_url) : 0;
    var totalGists = parseInt(perfil.public_gists);

    var resultado = [
        {
            criterio: "Repositório",
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
        //  {
        //      criterio: "Estrela em repositórios",
        //      qtd: totalStars,
        //      total: totalStars * 10
        //  },
        {
            criterio: "Gists",
            qtd: totalGists,
            total: totalGists * 5
        }

        
    ];
    return resultado;
}

function getTotalStars(repos_url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            var totalStars = 0;
            var repos = (JSON.parse(xhttp.responseText));
            repos.forEach((repo) => {
                totalStars += repo.stargazers_count;
            });
            return parseInt(totalStars);
        }
    };
    xhttp.open("GET", repos_url, true);
    xhttp.send();
}

function verificaVendedor() {
    if (totalAzul > totalVermelho) {
        alert("azul ganhou")
    } else if(totalAzul === totalVermelho){
        alert("empate")
    }
    else  {
        alert("vermelho ganhou")
    }
}






