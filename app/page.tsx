"use client";
import { useState } from "react";
import { Form } from "@/app/components/Form";
import { Header } from "@/app/components/Header";
import { ListCifras } from "@/app/components/Cifras";
import { Options } from "@/app/components/Options";
import { useCifras } from "@/app/hooks/useCifras";
import { Confirm } from "@/app/components/Confirm";
import { cifraFormData, FormMode } from "./types";

export default function Main() {
  const [form, setFormMode] = useState<FormMode>(null);
  const [options, setOptions] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCifra, setSelectedCifra] = useState<string | null>(null);

  const { cifras, addCifra, deleteCifra, editCifra } = useCifras();

  const filterCifras = cifras.filter(
    (cifra) =>
      cifra.name.toLowerCase().includes(search.toLowerCase()) ||
      cifra.autor?.toLocaleLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="flex flex-col p-1 gap-1 h-screen bg-bg overflow-hidden">
      <Header openForm={() => setFormMode("add")} searchChange={setSearch} />

      {form && (
        <Form
          closeForm={() => setFormMode(null)}
          filledFields={form == "edit" ? cifras.find(cifra => cifra.id == selectedCifra) : undefined}
          submitForm={async (values) => {
            if (form == "edit" && selectedCifra) {
              await editCifra(selectedCifra, values);
            } else {
              await addCifra(values);
            }
            setFormMode(null);
          }}
        />
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
          name={
            cifras.find((cifra) => cifra.id == selectedCifra)?.name || "Cifra"
          }
          closeOptions={() => setOptions(false)}
          deleteCifra={() => {
            setConfirm(true);
          }}
          editCifra={() => {
            setFormMode('edit')
          }}
        ></Options>
      )}
      {confirm && selectedCifra && (
        <Confirm
          confirm={() => {
            deleteCifra(selectedCifra);
            setSelectedCifra(null);
            setConfirm(false);
          }}
          cancel={() => {
            setConfirm(false);
          }}
          text="Você tem certeza?"
        ></Confirm>
      )}
    </main>
  );
}
