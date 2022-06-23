export type Product = {
    _id: string,
    name: string,
    img: string,
    price: number,
    description: string,

};
export type ProductCart = {
    value: number,
    _id: string,
    name: string,
    img: string,
    price: number,
    description: string
}
export type ProductCreate = {

    name: string,
    img: string,
    price: number,
    description: string,
};