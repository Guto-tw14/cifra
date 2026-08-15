'use client';
import { useState } from 'react';
import { Form } from '@/app/components/Form';
import { Header } from '@/app/components/Header';
import { ListCifras } from '@/app/components/Cifras';
import { Options } from '@/app/components/Options';
import { useCifras } from '@/app/hooks/useCifras';

export default function Main() {
    const [form, setForm] = useState(false);
    const [options, setOptions] = useState(false);
    const [search, setSearch] = useState('');

    const { cifras, addCifra } = useCifras();

    const filterCifras = cifras.filter(
        (cifra) =>
            cifra.name.toLowerCase().includes(search.toLowerCase()) ||
            cifra.autor
                ?.toLocaleLowerCase()
                .includes(search.toLowerCase()),
    );

    return (
        <main className="flex flex-col p-1 gap-1 min-h-screen bg-bg">
            <Header openForm={setForm} searchChange={setSearch} />

            {form && (
                <Form
                    closeForm={() => setForm(false)}
                    submitForm={async (values) => {
                        await addCifra(values);
                        setForm(false);
                    }}
                ></Form>
            )}
            <ListCifras
                cifras={filterCifras}
                search={search}
                options={() => {
                    setOptions(true);
                }}
            ></ListCifras>
            {options && (
                <Options closeOptions={() => setOptions(false)}></Options>
            )}
        </main>
    );
}
