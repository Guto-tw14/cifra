import { useEffect, useState } from "react";
import { db } from "@/app/db";
import { type cifraFormData } from "@/app/types";
import { type cifra } from "@/app/types";

export function useCifras() {
  const [cifras, setCifras] = useState<cifra[]>([]);

  useEffect(() => {
    db.cifras.toArray().then((cifras) => {
      setCifras(cifras);
    });
  }, []);

  async function addCifra(values: cifraFormData) {
    let link = values.link;
    if (!link.includes("https://") && !link.includes("http://")) {
      link = "http://" + link;
    }
    const cifra: cifra = {
      id: crypto.randomUUID(),
      name: values.name,
      link: link,
      autor: values.autor || "desconhecido",
    };
    await db.cifras.add(cifra);

    setCifras((old) => [...old, cifra]);
  }

  async function deleteCifra(id: string) {
    db.cifras.delete(id);

    setCifras((old) => old.filter((cifra) => id != cifra.id));
  }

  return { cifras, addCifra, deleteCifra };
}
