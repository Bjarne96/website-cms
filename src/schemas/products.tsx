//Every variant is unique for one combination from the noth selectors
export interface IProduct {
    _id: string,
    name: string,
    variants: [IProductVariant],
    properties: Array<Array<{ name: string, id: Number }>>
}

export interface IProductVariant {
    selector_1: { type: Number, required: true },
    selector_2: { type: Number, required: true },
    pictures: Array<string>,
    price: Number,
    description: string,
}