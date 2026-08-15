import { Icon } from '@/app/components/Icon';

function SearchMenu({
    searchChange,
}: {
    searchChange: (value: string) => void;
}) {
    return (
        <div className="flex gap-3 items-center h-full">
            <div className="flex bg-bg-card p-2 rounded-lg gap-1 h-10/12 focus-within:bg-bg-elevated border border-border-subtle">
                <Icon
                    x={40}
                    y={40}
                    src="/magnifying-glass-solid-full.svg"
                    alt="Criar cifra"
                ></Icon>
                <input
                    onChange={(e) => searchChange(e.target.value)}
                    type="text"
                    placeholder="pesquisar..."
                    className="w-full focus:outline-0 text-text-main"
                />
            </div>
            <button className="active:bg-bg-elevated p-1 rounded-lg">
                <Icon
                    x={40}
                    y={40}
                    src="/sliders-solid-full.svg"
                    alt="Filtros"
                />
            </button>
        </div>
    );
}

export function Header({
    openForm,
    searchChange,
}: {
    openForm: (value: boolean) => void;
    searchChange: (value: string) => void;
}) {
    return (
        <header className="flex gap-6 justify-center rounded-lg h-14 items-center bg-bg-card p-1">
            <div
                className=" flex rounded-full bg-main-active h-fit align-middle
                transition-transform duration-300 ease-in-out hover:scale-110 active:scale-110
                not-dark:bg-main
                "
            >
                <button className="p-1" onClick={() => openForm(true)}>
                    <Icon
                        x={40}
                        y={40}
                        src="/plus-solid-full.svg"
                        alt="Criar cifra"
                        className="Branco"
                    />
                </button>
            </div>
            <SearchMenu searchChange={searchChange} />
        </header>
    );
}
