const voltar = document.getElementById("voltar");
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

const embed = document.createElement('embed')

abrirPdf(id).then(c => {
  console.log(c)
  embed.src = c;
  embed.type = "application/pdf";
  document.body.appendChild(embed)
})

voltar.addEventListener("click", () => {
  document.location.href = "./index.html";
});
