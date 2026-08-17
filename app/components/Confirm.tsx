export function Confirm({
  confirm,
  cancel,
  text,
}: {
  confirm: () => void;
  cancel: () => void;
  text: string;
}) {
  return (
    <div
      className="fixed inset-0 bg-bg/50
        flex flex-col justify-center items-center z-1
        "
    >
      <section className="bg-bg-card flex flex-col gap-5 justify-center p-7 text-text-main rounded-md">
        <h2 className="text-2xl">{text}</h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              cancel();
            }}
            type="button"
            className="rounded-md px-3 py-2 border border-border active:bg-bg-elevated flex-1"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              confirm();
            }}
            type="button"
            className="rounded-md px-3 py-2 bg-red-500 active:bg-red-600 flex-1"
          >
            Deletar
          </button>
        </div>
      </section>
    </div>
  );
}
