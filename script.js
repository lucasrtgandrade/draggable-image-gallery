const galeria = document.getElementById('galeria-de-imagens');
let estaArrastando = false;
let posInicial = 0;
arrastandoParaEsquerda = 0;

galeria.addEventListener('mousedown', (event) => {
    estaArrastando = true;
    posInicial = event.pageX - galeria.offsetLeft;
    arrastandoParaEsquerda = galeria.arrastandoParaEsquerda;
    galeria.style.cursor = 'grabbing';
})

galeria.addEventListener('mouseleave', () => {
    estaArrastando = false;
    galeria.style.cursor = 'grab';
})

galeria.addEventListener('mouseup', () => {
    estaArrastando = false;
    galeria.style.cursor = 'grab';
})

galeria.addEventListener('mousemove', (event) =>{
    if (!estaArrastando) return;
    event.preventDefault();
    const comprimento = event.pageX - galeria.offsetLeft;
    const arrastar = (comprimento - posInicial) * 2;
    galeria.arrastandoParaEsquerda = arrastandoParaEsquerda - arrastar;
})