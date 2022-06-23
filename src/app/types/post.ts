export type PostType = {
    _id: string,
    title: string,
    img: string,
    content: string

};
export type PostCreate = {
    title: string,
    img: string,
    content: string
}