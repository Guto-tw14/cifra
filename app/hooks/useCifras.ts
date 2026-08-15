import { useEffect, useState } from 'react';
import { db } from '@/app/db';
import {type cifraFormData} from '@/app/types'
import {type cifra} from '@/app/types'

export function useCifras() {
    const [cifras, setCifras] = useState<cifra[]>([]);

    useEffect(() => {
        db.cifras.toArray().then((cifras) => {
            setCifras(cifras);
        });
    }, []);

    async function addCifra(values: cifraFormData) {
        const cifra: cifra = {
            id: crypto.randomUUID(),
            name: values.name,
            link: values.link,
            autor: values.autor || 'desconhecido',
        };
        await db.cifras.add(cifra);

        setCifras((old) => [...old, cifra]);
    }

    return {
        cifras,
        addCifra,
    };
}
