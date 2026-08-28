import { Icon } from "@/app/components/Icon";

export function Options({
  closeOptions,
  deleteCifra,
  editCifra,
  name,
}: {
  closeOptions: () => void;
  deleteCifra: () => void;
  editCifra: () => void;
  name: string;
}) {
  return (
    <div
      className="fixed inset-0 bg-bg/50
        flex flex-col justify-end z-1"
      onClick={() => {
        closeOptions();
      }}
    >
      <section className="bg-bg-card flex flex-col justify-start p-5 gap-3 text-text-main"
      onClick={(e) => {e.stopPropagation()}}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">{name}</h2>
          <button
            className="active:bg-bg-elevated p-1 rounded-lg min-w-10"
            onClick={closeOptions}
          >
            <Icon x={30} y={30} src="/x-solid-full.svg" alt="X" />
          </button>
        </div>
        <div className="flex flex-col justify-start p-5 gap-3">
          <button
          onClick={() => {
            editCifra();
          }}
            type="button"
            className="rounded-md px-3 py-2 border border-border active:bg-bg-elevated"
          >
            Editar
          </button>
          <button
            onClick={() => {
              deleteCifra();
            }}
            type="button"
            className="rounded-md px-3 py-2 bg-red-500 active:bg-red-600"
          >
            Deletar
          </button>
        </div>
      </section>
    </div>
  );
}
