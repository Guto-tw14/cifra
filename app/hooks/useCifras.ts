import { useEffect, useState } from "react";
import { db } from "@/app/db";
import { type cifraFormData } from "@/app/types";
import { type cifra } from "@/app/types";

function linkProtocol(link: string) {
  if (!link.includes("https://") && !link.includes("http://")) {
    link = "http://" + link;
  }
  return link;
}

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
      link: linkProtocol(values.link),
      autor: values.autor || "desconhecido",
    };
    await db.cifras.add(cifra);

    setCifras((old) => [...old, cifra]);
  }

  async function deleteCifra(id: string) {
    db.cifras.delete(id);

    setCifras((old) => old.filter((cifra) => id != cifra.id));
  }

  async function editCifra(id: string, values: cifraFormData) {
    db.cifras.update(id, {
      id,
      name: values.name,
      link: linkProtocol(values.link),
      autor: values.autor || "desconhecido",
    });
  }

  return { cifras, addCifra, deleteCifra, editCifra };
}
