export type cifra = {
    id: string;
    name: string;
    link: string;
    autor: string;
};

export type cifraFormData = Omit<cifra, 'id'>;
export type cifraFormErrors = Partial<Record<keyof cifraFormData, string>>;
export type cifraFormTouched = Partial<Record<keyof cifraFormData, boolean>>;
export type cifraFields = Partial<cifraFormData>
export type FormMode = "add" | "edit" | null;