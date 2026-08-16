import { cifra } from '@/app/types'
import { Icon } from '@/app/components/Icon'

export function ListCifras({
    cifras,
    search,
    options,
}: {
    cifras: cifra[];
    search: string;
    options: (id: string) => void;
}) {
    function markSearch(text: string, search: string) {
        if (search.trim() == '') {
            return text;
        }
        const textLower = text.toLowerCase();
        const searchLower = search.toLowerCase();

        const elements: React.ReactNode[] = [];
        let start = 0;

        while (true) {
            const index = textLower.indexOf(searchLower, start);
            if (index == -1) {
                elements.push(text.slice(start));
                break;
            }
            elements.push(text.slice(start, index));
            elements.push(
                <b key={index}>
                    {text.slice(index, index + search.length)}
                </b>,
            );
            start = index + search.length;
        }
        return elements;
    }
    return (
        <section className="flex flex-col gap-1 text-text-main rounded-md overflow-y-auto">
            {cifras.map((cifra) => (
                <div key={cifra.id} className="flex w-full">
                    <button
                        onClick={() => {options(cifra.id)}}
                        className="rounded-lg bg-bg-card active:bg-bg-elevated p-2"
                    >
                        <Icon
                            x={40}
                            y={40}
                            src="/ellipsis-vertical-solid-full.svg"
                            alt="Editar"
                        ></Icon>
                    </button>
                    <a
                        href={cifra.link}
                        target="_blank"
                        className="grow flex flex-col justify-start ml-1 rounded-md bg-bg-card p-2 active:bg-bg-elevated"
                    >
                        <span className="text-xl">
                            {markSearch(cifra.name, search)}
                        </span>
                        <span className="text-sm text-text-subtle">
                            {markSearch(cifra.autor, search)}
                        </span>
                    </a>
                </div>
            ))}
        </section>
    );
}