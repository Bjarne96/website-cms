//Every variant is unique for one combination from the noth selectors
export interface IProduct {
    _id: string,
    name: string,
    variants: [IProductVariant],
    properties: Array<Array<IProductProps>>
}

export interface IProductProps {
    name: string,
    id: number
}

export interface IProductVariant {
    selector_1: number,
    selector_2: number,
    pictures: Array<string>,
    price: number,
    description: string,
}

export interface IProductSelected {
    _id: string,
    name: string,
    variant: IProductVariant,
    properties: Array<Array<IProductProps>>
    count: number;
    total: number;
}