self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("v1")
      .then((cache) => {
        cache.addAll(["./", "./script.js", "./style.css"]);
        console.log("Armazenado com sucesso");
      })
      .catch((err) => {
        console.log("Não pôde armazenar");
      })
  );
});
