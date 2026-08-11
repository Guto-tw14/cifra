"use client";
import React, { ChangeEvent, ReactNode } from "react";
import Image from "next/image";
import { Cifra } from "@/app/cifra";
import { useState } from "react";

type iconeProps = {
  src: string;
  alt: string;
  x: number;
  y: number;
  className?: string;
};

type cifraformData = Omit<Cifra, "id">;
type cifraFormErrors = Partial<Record<keyof cifraformData, string>>;
type cifraFormTouched = Partial<Record<keyof cifraformData, boolean>>;

function Icone({ src, alt, x, y, className = "" }: iconeProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={x}
      height={y}
      draggable={false}
      className={"icone" + className}
    />
  );
}
function MenuPesquisa({
  mudancaPesquisa,
}: {
  mudancaPesquisa: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex gap-3 items-center h-full">
      <div className="flex bg-bg-card p-2 rounded-lg gap-1 h-10/12 focus-within:bg-bg-elevated border border-border-subtle">
        <Icone
          x={40}
          y={40}
          src="/magnifying-glass-solid-full.svg"
          alt="Criar cifra"
        ></Icone>
        <input
          onChange={mudancaPesquisa}
          type="text"
          placeholder="pesquisar..."
          className="w-full focus:outline-0 text-text-main"
        />
      </div>
      <button className="active:bg-bg-elevated p-1 rounded-lg">
        <Icone x={40} y={40} src="/sliders-solid-full.svg" alt="Filtros" />
      </button>
    </div>
  );
}
function Cabecalho({
  abrirForm,
  mudancaPesquisa,
}: {
  abrirForm: (valor: boolean) => void;
  mudancaPesquisa: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <header className="flex gap-6 justify-center rounded-lg h-14 items-center bg-bg-card p-1">
      <div
        className=" flex rounded-full bg-main-active h-fit align-middle
                transition-transform duration-300 ease-in-out hover:scale-110 active:scale-110
                not-dark:bg-main
                "
      >
        <button className="p-1" onClick={() => abrirForm(true)}>
          <Icone
            x={40}
            y={40}
            src="/plus-solid-full.svg"
            alt="Criar cifra"
            className="Branco"
          />
        </button>
      </div>
      <MenuPesquisa mudancaPesquisa={mudancaPesquisa} />
    </header>
  );
}
const campos = [
  {
    nome: "nome",
    type: "text",
    placeholder: "Digite o nome da cifra",
    etiqueta: "Nome",
    obrigatorio: true,
  },
  {
    nome: "link",
    type: "text",
    placeholder: "Digite o link da cifra",
    etiqueta: "Link",
    obrigatorio: true,
  },
  {
    nome: "autor",
    type: "text",
    placeholder: "Preencha com autor",
    etiqueta: "Autor",
    obrigatorio: false,
  },
] as const;

function Formulario({
  fecharForm,
  enviarForm,
}: {
  fecharForm: () => void;
  enviarForm: (e: React.SubmitEvent<HTMLFormElement>) => void;
}) {
  const [formData, setFormData] = useState<cifraformData>({
    nome: "",
    link: "",
    autor: "",
  });
  const [errors, setErrors] = useState<cifraFormErrors>({});
  const [touched, setTouched] = useState<cifraFormTouched>({});

  function validarForm(): boolean {
    const tempErrors: cifraFormErrors = {};
    for (let campo of campos) {
      if (campo.obrigatorio && !formData[campo.nome].trim()) {
        tempErrors[campo.nome] = `Você precisa prencher o ${campo.etiqueta}`;
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length == 0;
  }

  function mudancaInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const fieldName = name as keyof cifraformData;
    setFormData({ ...formData, [fieldName]: value });
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: "" });
    }
  }
  function desfoque(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    const fieldName = name as keyof cifraformData;

    setTouched((touch) => {
      const newTouch = { ...touch, [fieldName]: true };
      validarForm();
      return newTouch;
    });
  }

  function validarEnvio(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const allTouched: cifraFormTouched = {};
    for (const campo of campos) {
      allTouched[campo.nome] = true;
    }
    setTouched(allTouched);
    if (validarForm()) {
      enviarForm(e);
    }
  }
  return (
    <div
      className="fixed inset-0 bg-bg/50
        flex flex-col justify-center items-center
        "
    >
      <form
        className="bg-bg-card p-6 rounded-lg flex flex-col gap-5 min-w-80 text-text-main"
        onSubmit={validarEnvio}
      >
        <header className="flex w-full justify-center">
          <h2 className="justify-self-center text-4xl">Adicionar Cifra</h2>
        </header>
        <section className="flex flex-col gap-3">
          {campos.map((campo, i) => (
            <label className="flex flex-col" key={i}>
              <div className="flex gap-1">
                <span>{campo.etiqueta}</span>
                {campo.obrigatorio && <span className="text-red-500">*</span>}
              </div>
              <input
                autoComplete="off"
                name={campo.nome}
                type={campo.type}
                placeholder={campo.placeholder}
                value={formData[campo.nome]}
                onChange={mudancaInput}
                onBlur={desfoque}
                className={`border border-border-subtle rounded-md p-1
                    focus:outline-0 focus:border-border focus:border
                  ${touched[campo.nome] && errors[campo.nome] && "border-red-500"}
                  `}
              />
              {touched[campo.nome] && errors[campo.nome] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[campo.nome]}!
                </span>
              )}
            </label>
          ))}
        </section>
        <div className="flex justify-center gap-5">
          <button
            onClick={() => fecharForm()}
            type="button"
            className="rounded-md px-3 py-2 border border-border active:bg-bg-elevated"
          >
            Cancelar
          </button>
          <button className="text-black bg-main rounded-md px-3 py-2 active:bg-main-active">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}
function ListaCifras({ cifras }: { cifras: Cifra[] }) {
  function destacarPesquisa(texto: string, pesquisa: string){
    if(pesquisa.trim() == ""){
      return texto
    }
    const inicio = texto.toLowerCase().indexOf(pesquisa.toLowerCase())
    const fim = inicio + pesquisa.length
    return(
      <span>
        {texto.slice(0, inicio)}
        <b>{texto.slice(inicio, fim)}</b>
        {texto.slice(fim)}
      </span>
    )
  }
  return (
    <section className="flex flex-col gap-1 text-text-main rounded-md p-1">
      {cifras.map((cifra) => (
        <div key={cifra.id} className="flex w-full">
          <button className="rounded-lg bg-bg-card active:bg-bg-elevated p-2">
            <Icone
              x={40}
              y={40}
              src="/ellipsis-vertical-solid-full.svg"
              alt="Criar cifra"
            ></Icone>
          </button>
          <a
            href={cifra.link}
            target="_blank"
            className="grow flex flex-col justify-start ml-1 rounded-md bg-bg-card p-2 active:bg-bg-elevated"
          >
            <span className="text-xl">{cifra.nome}</span>
            <span className="text-sm text-text-subtle">{cifra.autor}</span>
          </a>
        </div>
      ))}
    </section>
  );
}
function enviarForm(e: React.SubmitEvent<HTMLFormElement>): cifraformData {
  const dados: FormData = new FormData(e.currentTarget);
  const valores = Object.fromEntries(dados.entries()) as cifraformData;
  return valores;
}
export default function Main() {
  const [formulario, setFormulario] = useState(false);
  const [Cifras, setCifras] = useState<Cifra[]>([]);
  const [Pesquisa, setPesquisa] = useState("");
  const cifrasFiltradas = Cifras.filter(
    (cifra) =>
      cifra.nome.toLowerCase().includes(Pesquisa.toLowerCase()) ||
      cifra.autor?.toLocaleLowerCase().includes(Pesquisa.toLocaleLowerCase()),
  );

  return (
    <main className="flex flex-col p-1 gap-1 min-h-screen bg-bg">
      <Cabecalho
        abrirForm={setFormulario}
        mudancaPesquisa={(e) => {
          setPesquisa(e.target.value);
        }}
      />

      {formulario && (
        <Formulario
          fecharForm={() => setFormulario(false)}
          enviarForm={(e) => {
            const dados = enviarForm(e);
            const novaCifra: Cifra = {
              id: crypto.randomUUID(),
              nome: dados.nome,
              link: dados.link,
              autor: dados.autor || "desconhecido",
            };
            setCifras((anteriores) => [...anteriores, novaCifra]);
            setFormulario(false);
          }}
        ></Formulario>
      )}
      <ListaCifras cifras={cifrasFiltradas}></ListaCifras>
    </main>
  );
}
