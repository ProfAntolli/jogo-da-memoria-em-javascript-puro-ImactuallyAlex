const cartas = document.querySelectorAll('.carta');

let carta_virada = false;
let pausado = false;
let carta1, carta2;

function girarcarta() {
    if(pausado) return;
    if(this === carta1) return;

    this.classList.add('flip');

    if(!carta_virada) {
        carta_virada = true;
        carta1 = this;
        return;
    }

    carta2 = this;
    
    checagem();
}

function checagem() {
    let igual = (carta1.dataset.valor === carta2.dataset.valor);

    igual ? pararcartas() : desvirarcartas();
}

function pararcartas() {
        carta1.removeEventListener('click', girarcarta);
        carta2.removeEventListener('click', girarcarta);  
        
        resetar()
}

function desvirarcartas() {
    pausado = true

    setTimeout(() => { 
        carta1.classList.remove('flip');
        carta2.classList.remove('flip');

        resetar()
    }, 1500);    
}

function resetar() {
    [carta_virada, pausado] = [false, false];
    [carta1, carta2] = [null, null];
}

(function embaralhar() {
    cartas.forEach(c => {
        let posicao_aleatoria = Math.floor(Math.random() *12);
        c.style.order = posicao_aleatoria;
    });
})();

cartas.forEach(c => c.addEventListener('click', girarcarta));