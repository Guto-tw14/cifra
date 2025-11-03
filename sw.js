const arquivos = [
  "./",
  "./form.html",
  "./cifra.html",
  "./css/style.css",
  "./sw.js",
  "./src/db.js",
  "./src/index.js",
  "./src/cifra.js",
  "./src/form.js",
  "./manifest.json",
  "./imgs/house-regular-full.svg"
]
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("v1")
      .then((cache) => {
        cache.addAll(arquivos);
        console.log("Armazenado com sucesso");
      })
      .catch((err) => {
        console.log("Não pôde armazenar");
      })
  );
});
