let amigos = [];
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    if (nombre === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }
    
    amigos.push(nombre);
    inputAmigo.value = '';
    mostrarListaAmigos();
}

function mostrarListaAmigos() {
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.className = 'boton-eliminar';
        botonEliminar.onclick = () => eliminarAmigo(index);
        li.appendChild(botonEliminar);
        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    mostrarListaAmigos();
}

// ✨ Esta es la función `sortearAmigo()` corregida y completa ✨
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Debes agregar al menos 2 amigos para realizar el sorteo.');
        return;
    }

    // Deshabilita los controles
    inputAmigo.disabled = true;
    document.querySelector('.button-add').disabled = true;

    const amigosParaSorteo = [...amigos];
    const sorteados = [];
    resultado.innerHTML = '';

    while (amigosParaSorteo.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * amigosParaSorteo.length);
        const amigoSecreto = amigosParaSorteo[indiceAleatorio];
        sorteados.push(amigoSecreto);
        amigosParaSorteo.splice(indiceAleatorio, 1);
    }
    
    let sorteoValido = false;
    while (!sorteoValido) {
        sorteados.sort(() => Math.random() - 0.5);
        sorteoValido = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === sorteados[i]) {
                sorteoValido = false;
                break;
            }
        }
    }

    sorteados.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${amigos[index]}</strong> le regalará a <strong>${amigo}</strong>`;
        resultado.appendChild(li);
    });
}

function reiniciar() {
    amigos = [];
    listaAmigos.innerHTML = '';
    resultado.innerHTML = '';

    inputAmigo.disabled = false;
    document.querySelector('.button-add').disabled = false;
}