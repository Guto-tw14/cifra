import Image from 'next/image';

type iconProps = {
    src: string;
    alt: string;
    x: number;
    y: number;
    className?: string;
};

export function Icon({ src, alt, x, y, className = '' }: iconProps) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    return (
        <Image
            src={`${basePath}${src}`}
            alt={alt}
            width={x}
            height={y}
            draggable={false}
            className={'icone' + className}
        />
    );
}