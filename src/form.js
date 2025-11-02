const cancelar = document.getElementById('cancelar')
const form = document.getElementById('form')
const nome = document.getElementById('nome')
const autor = document.getElementById('autor')
const arquivo = document.getElementById('arquivo')


cancelar.addEventListener('click', ()=>{
    document.location.href = "./index.html"
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    cifra = {
        id: window.crypto.randomUUID(),
        nome: nome.value,
        autor: autor.value,
        arquivo: arquivo.files[0]
    }
    addCifra(cifra)
})