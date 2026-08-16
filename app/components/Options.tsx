export function Options({
    closeOptions,
    deleteCifra,
    id,
}: {
    closeOptions: () => void;
    deleteCifra: (id: string) => void;
    id: string;
}) {
    return (
        <div
            className="fixed inset-0 bg-bg/50
        flex flex-col justify-end z-1"
        >
            <section className="bg-bg-card flex flex-col justify-start p-5 gap-3 text-text-main">
                <div className="flex justify-between">
                    <span>Nome Cifra</span>
                    <button onClick={closeOptions}>X</button>
                </div>
                <div className="flex flex-col justify-start p-5 gap-3">
                    <button
                        type="button"
                        className="rounded-md px-3 py-2 border border-border active:bg-bg-elevated"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => {deleteCifra(id)}}
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
