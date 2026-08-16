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
    const [selectedCifra, setSelectedCifra] = useState<string | null>(null);

    const { cifras, addCifra, deleteCifra } = useCifras();

    const filterCifras = cifras.filter(
        (cifra) =>
            cifra.name.toLowerCase().includes(search.toLowerCase()) ||
            cifra.autor?.toLocaleLowerCase().includes(search.toLowerCase()),
    );

    return (
        <main className="flex flex-col p-1 gap-1 h-screen bg-bg overflow-hidden">
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
                options={(id) => {
                    setSelectedCifra(id);
                    setOptions(true);
                }}
            ></ListCifras>
            {options && selectedCifra && (
                <Options
                    id={selectedCifra}
                    closeOptions={() => setOptions(false)}
                    deleteCifra={(id) => {
                        deleteCifra(id)
                        setSelectedCifra(null)
                    }}
                ></Options>
            )}
        </main>
    );
}
