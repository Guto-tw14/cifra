export function Options({ closeOptions }: { closeOptions: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-bg/50
        flex flex-col justify-end"
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