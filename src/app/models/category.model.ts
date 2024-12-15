export interface ICategoria {
    _id:       string;
    nombre:    string;
    productos: Array<{ _id: string, producto: string}>;
}