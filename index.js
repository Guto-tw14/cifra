const ul = document.getElementById("lista-cifras");
let res = null;
let cifras = [
  { nome: "cifra 1", autor: "augusto" },
  { nome: "cifra 2", autor: "augusto" },
];

(function montar_ul() {
  cifras.forEach((c) => {
    const img = document.createElement("img");
    img.setAttribute("src", "./imgs/house-regular-full.svg");
    const li = document.createElement("li");
    const nome = document.createElement("h2");
    const autor = document.createElement("span");
    const btnd = document.createElement("button");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    nome.innerText = c.nome;
    autor.innerText = c.autor;
    btnd.innerText = "...";
    div2.appendChild(nome);
    div2.appendChild(autor);
    div.appendChild(img);
    div.appendChild(div2);
    li.appendChild(div);
    li.appendChild(btnd);
    li.addEventListener("click", () => {
      document.location.href = "./cifra.html";
    });
    ul.appendChild(li);
  });
})();

function registrar_sw() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then((r) => {
        res = r;
        console.log("Sw Registrado");
      })
      .catch((err) => {
        console.log("Não foi possivel registrat o sw");
      });
  }
}

function retirar_sw() {
  navigator.serviceWorker
    .getRegistration()
    .then((registros) => {
      registros.forEach((r) => {
        r.unregister();
        console.log("Sw retirado");
      });
    })
    .catch((err) => {
      console.log("Não foi possivel retirar sw");
    });
}
registrar_sw();
