let botão = document.querySelector("#jogar");
botão.addEventListener("click", () => {
    window.location.href = "jogo.html";
});
let botão2 = document.querySelector("#creditos");
botão2.addEventListener("click", () => {
    confirm("jogo feito por Kevin3033\ngithub: Kevin3033")
});

let parametros = new URLSearchParams(window.location.search);
let pontos = parametros.get("pontos");

if (pontos != null) {
    let div = document.querySelector("#pontos")
    div.innerHTML = "última pontuação: " + pontos
}
