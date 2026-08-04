'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Cifra } from '@/app/cifra';
import { useState } from 'react';

type IconeProps = {
    src: string;
    alt: string;
    x: number;
    y: number;
};
function Icone({ src, alt, x, y }: IconeProps) {
    return <Image src={src} alt={alt} width={x} height={y} draggable={false} />;
}
function MenuPesquisa() {
    return (
        <div className="flex gap-3 items-center h-full">
            <div className="flex bg-neutral-800 p-2 rounded-lg gap-1 h-10/12">
                <Icone
                    x={40}
                    y={40}
                    src="/magnifying-glass-solid-full.svg"
                    alt="Criar cifra"
                ></Icone>
                <input
                    type="text"
                    placeholder="pesquisar..."
                    className="w-full focus:outline-0 text-white"
                />
            </div>
            <button>
                <Icone
                    x={40}
                    y={40}
                    src="/sliders-solid-full.svg"
                    alt="Filtros"
                />
            </button>
        </div>
    );
}
function Cabecalho({ abrirForm }: { abrirForm: (valor: boolean) => void }) {
    return (
        <header className="flex gap-6 justify-center rounded-lg h-14 items-center">
            <div
                className=" flex rounded-full bg-cyan-700 h-fit align-middle
                transition-transform duration-300 ease-in-out hover:scale-110 active:scale-110"
            >
                <button className="p-1" onClick={() => abrirForm(true)}>
                    <Icone
                        x={40}
                        y={40}
                        src="/plus-solid-full.svg"
                        alt="Criar cifra"
                    />
                </button>
            </div>
            <MenuPesquisa />
        </header>
    );
}
function Formulario({
    fecharForm,
    enviarForm,
}: {
    fecharForm: () => void;
    enviarForm: (e: React.SubmitEvent<HTMLFormElement>) => void;
}) {
    return (
        <div
            className="fixed inset-0 bg-black/50
        flex flex-col justify-center items-center
        "
        >
            <form
                className="bg-zinc-800 p-6 rounded-lg flex flex-col gap-5 min-w-80"
                onSubmit={enviarForm}
            >
                <header className="flex w-full justify-center">
                    <h2 className="justify-self-center text-4xl">
                        Adicionar Cifra
                    </h2>
                </header>
                <section className="flex flex-col gap-3">
                    <label className="flex flex-col">
                        <span>Nome:</span>
                        <input
                            name="nome"
                            type="text"
                            placeholder="Nome da cifra"
                            className="border-2 border-neutral-400 rounded-md p-1
                    focus:outline-0 focus:border-blue-500 focus:border-2"
                        ></input>
                    </label>
                    <label className="flex flex-col">
                        <span>Link:</span>
                        <input
                            name="link"
                            type="text"
                            placeholder="Link da cifra"
                            className="border-2 border-neutral-400 rounded-md p-1
                    focus:outline-0 focus:border-blue-500 focus:border-2"
                        ></input>
                    </label>
                </section>
                <div className="flex justify-center gap-5">
                    <button
                        onClick={() => fecharForm()}
                        type="button"
                        className="rounded-md px-3 py-2 border border-neutral-400 active:brightness-90"
                    >
                        Cancelar
                    </button>
                    <button className="text-black bg-white rounded-md px-3 py-2 active:brightness-90">
                        Adicionar
                    </button>
                </div>
            </form>
        </div>
    );
}
function enviarForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados: FormData = new FormData(e.currentTarget);
    const valores: object = Object.fromEntries(dados.entries());
    console.log(dados);
    console.log(valores);
}
export default function Main() {
    const [formulario, setFormulario] = useState(false);
    return (
        <main className="flex flex-col m-1 justify-center rounded-md">
            <Cabecalho abrirForm={setFormulario} />

            {formulario && (
                <Formulario
                    fecharForm={() => setFormulario(false)}
                    enviarForm={(e) => {
                        enviarForm(e);
                        setFormulario(false);
                    }}
                ></Formulario>
            )}
        </main>
    );
}