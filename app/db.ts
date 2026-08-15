import { Dexie, type EntityTable } from 'dexie';
import { type cifra } from '@/app/types'

export const db = new Dexie('cifraDb') as Dexie & {
    cifras: EntityTable<cifra, 'id'>;
};
db.version(1).stores({
    cifras: 'id, name, link, autor',
});
