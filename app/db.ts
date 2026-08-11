import { Dexie, type EntityTable } from 'dexie';

type Cifra = {
    id: string;
    nome: string;
    link: string;
    autor: string;
};

const db = new Dexie('cifraDb') as Dexie & {
    cifras: EntityTable<Cifra, 'id'>;
};
db.version(1).stores({
    cifras: 'id, nome, link, autor',
});

export type { Cifra };
export { db };
