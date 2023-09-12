const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const largura = canvas.width;
const altura = canvas.height;

const gravidade = 4

const jogadorImg = new Image()
jogadorImg.src = "player.png"

let jogador = {
    image: jogadorImg,
    x: 150,
    y: 150,
    width: 50,
    height: 91,
    velocidade: 0,
    atualizar: function () {
        if (this.y <= altura) {
            this.y += this.velocidade
            this.velocidade += gravidade
        } else {
            confirm('Sem choro, você perdeu e pronto. sua pontuação: ' + pontos)
            window.location.href = `index.html?pontos="${pontos}"`

        }
    },
    pular: function () {
        if (this.y >= 0) {
            this.velocidade = -15
        }
    }
}

let pontos = 0;

let canos = {
    larguraCano: 50,
    espaço: 200,
    velocidadeCano: 10,
    canos: [],
    gerarCanos: function () {
        let quantidadeCanos = this.canos.length
        if (quantidadeCanos == 0 || this.canos[quantidadeCanos - 1].x <= 750) {
            let alturaCano = Math.random() * (altura - this.espaço);

            this.canos.push({
                x: largura,
                y: 0,
                altura: alturaCano,
                lugar: "cima",
                passou: false,
            });
            this.canos.push({
                x: largura,
                y: alturaCano + this.espaço,
                altura: altura - alturaCano - this.espaço,
                lugar: "baixo",
                passou: false
            });
        }
    },

    atualizarCanos: function () {
        for (let i = 0; i < this.canos.length; i++) {
            this.canos[i].x -= this.velocidadeCano;
            if (this.canos[i].x + this.larguraCano < jogador.x) {
                this.canos[i].passou = true
                if (!this.canos[i].ganhou) {
                    pontos += 0.5
                    this.canos[i].ganhou = true
                }
            }
            if (this.canos[i].x + this.larguraCano < 0) {
                this.canos.splice(i, 1)
                i--;
            }
        }
    }
}

function verificarColisao() {
    for (const cano of canos.canos) {
        if (!cano.passou) {
            if (cano.lugar == "cima") {
                if (jogador.x + jogador.width >= cano.x &&
                    jogador.y <= cano.y + cano.altura) {
                    confirm('Sem choro, você perdeu e pronto. sua pontuação: ' + pontos)
                    window.location.href = `index.html?pontos="${pontos}"`
                }
            } else {
                if (jogador.x + jogador.width >= cano.x &&
                    jogador.y + jogador.height >= cano.y) {
                    confirm('Sem choro, você perdeu e pronto. sua pontuação: ' + pontos)
                    window.location.href = `index.html?pontos="${pontos}"`
                }
            }

        }
    }
}

function atualizarTela() {
    ctx.clearRect(0, 0, largura, altura);
    verificarColisao()

    jogador.atualizar()
    ctx.drawImage(jogador.image, jogador.x, jogador.y, jogador.width, jogador.height);

    canos.gerarCanos()
    canos.atualizarCanos()
    for (const cano of canos.canos) {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(cano.x, cano.y, canos.larguraCano, cano.altura)
        ctx.fillRect(cano.x, cano.y + cano.altura + canos.espaço, canos.larguraCano, altura - (cano.y + cano.altura + canos.espaço))
    }


}

let interval = setInterval(atualizarTela, 60);

document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        jogador.pular()
    }
});