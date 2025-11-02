const indexedDB = 
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const request = indexedDB.open('DadosCifras', 2)

request.onerror = e => {
    console.error(e)
}

request.onupgradeneeded = () => {
    const db = request.result
    const store = db.createObjectStore('cifras', {keyPath: 'id'})
    store.createIndex('nome', ['nome'], {unique: false})
    store.createIndex('autor', ['autor'], {unique: false})
}

function addCifra(cifra){
    const request = indexedDB.open('DadosCifras', 2)
    request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction('cifras', 'readwrite')
        const store = transaction.objectStore('cifras')
        store.add(cifra)
        transaction.oncomplete = () => db.close()
        transaction.onerror = _ => console.log('erro:', transaction.error);
    }
}

function abrirPdf(id) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('DadosCifras', 2)

        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('cifras', 'readonly')
            const store = transaction.objectStore('cifras')
            const idQuery = store.get(id)
            idQuery.onsuccess = _ => {
                const cifra = idQuery.result
                    console.log("Valor bruto vindo do DB:", cifra);
                    console.log("Arquivo:", cifra.arquivo);
                    console.log("É Blob?", cifra.arquivo instanceof Blob);
                    console.log("Tipo MIME:", cifra.arquivo?.type);
                resolve(URL.createObjectURL(cifra.arquivo))
            }
            idQuery.onerror = _ => reject(idQuery.error)
            transaction.oncomplete = () => db.close()
            transaction.onerror = _ => console.log('erro:', transaction.error);
        }
        request.onerror = _ => reject(request.error)
    })
}

function listar(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('DadosCifras', 2)

        request.onsuccess = () => {
            const db = request.result
            const transaction = db.transaction('cifras', 'readonly')
            const store = transaction.objectStore('cifras')
            const query = store.getAll()
            query.onsuccess = _ => resolve(query.result)
            query.onerror = _ => reject(query.error)
            transaction.oncomplete = _ => db.close()
            transaction.onerror = _ => console.log('erro:', transaction.error);
        }
        request.onerror = _ => reject(request.error)
    })

}