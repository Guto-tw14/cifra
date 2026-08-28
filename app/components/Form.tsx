import React, { ChangeEvent, useState } from "react";
import { cifraFields, type cifraFormData } from "@/app/types";
import { type cifraFormErrors } from "@/app/types";
import { type cifraFormTouched } from "@/app/types";

const fields = [
  {
    name: "name",
    type: "text",
    placeholder: "Digite o nome da cifra",
    label: "Nome",
    required: true,
  },
  {
    name: "link",
    type: "text",
    placeholder: "Digite o link da cifra",
    label: "Link",
    required: true,
  },
  {
    name: "autor",
    type: "text",
    placeholder: "Preencha com autor",
    label: "Autor",
    required: false,
  },
] as const;

export function Form({
  closeForm,
  submitForm,
  filledFields,
}: {
  closeForm: () => void;
  submitForm: (data: cifraFormData) => void;
  filledFields?: cifraFields;
}) {
  const [formData, setFormData] = useState<cifraFormData>({
    name: filledFields?.name ?? "",
    link: filledFields?.link ?? "",
    autor: filledFields?.autor ?? "",
  });
  const [errors, setErrors] = useState<cifraFormErrors>({});
  const [touched, setTouched] = useState<cifraFormTouched>({});

  function validateForm(): boolean {
    const tempErrors: cifraFormErrors = {};
    for (let field of fields) {
      if (field.required && !formData[field.name].trim()) {
        tempErrors[field.name] = `Você precisa prencher o ${field.label}`;
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length == 0;
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const fieldName = name as keyof cifraFormData;
    setFormData({ ...formData, [fieldName]: value });
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: "" });
    }
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    const fieldName = name as keyof cifraFormData;

    setTouched((touch) => {
      const newTouch = { ...touch, [fieldName]: true };
      validateForm();
      return newTouch;
    });
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const allTouched: cifraFormTouched = {};

    for (const field of fields) {
      allTouched[field.name] = true;
    }

    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    const data: FormData = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries()) as cifraFormData;
    submitForm(values);
  }

  return (
    <div
      className="fixed inset-0 bg-bg/50
        flex flex-col justify-center items-center z-10
        "
      onClick={closeForm}
    >
      <form
        className="bg-bg-card p-6 rounded-lg flex flex-col gap-5 min-w-80 text-text-main"
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="flex w-full justify-center">
          <h2 className="justify-self-center text-4xl">Adicionar Cifra</h2>
        </header>
        <section className="flex flex-col gap-3">
          {fields.map((field, i) => (
            <label className="flex flex-col" key={i}>
              <div className="flex gap-1">
                <span>{field.label}</span>
                {field.required && <span className="text-red-500">*</span>}
              </div>
              <input
                autoCapitalize={field.name != "link" ? "words" : "off"}
                autoComplete="off"
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleInput}
                onBlur={handleBlur}
                className={`border border-border-subtle rounded-md p-1
                    focus:outline-0 focus:border-border focus:border
                  ${touched[field.name] && errors[field.name] && "border-red-500"}
                  `}
              />
              {touched[field.name] && errors[field.name] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[field.name]}!
                </span>
              )}
            </label>
          ))}
        </section>
        <div className="flex justify-center gap-5">
          <button
            onClick={() => closeForm()}
            type="button"
            className="rounded-md px-3 py-2 border border-border active:bg-bg-elevated"
          >
            Cancelar
          </button>
          <button className="text-black bg-main rounded-md px-3 py-2 active:bg-main-active">
            {filledFields == undefined ? "Adicionar" : "Editar"}
          </button>
        </div>
      </form>
    </div>
  );
}
