export interface IProducto {
    _id:             string;
    producto:        string;
    descripcion:     string;
    precio:          number;
    stock:           number;
    categoria:       string;
    agotado:         boolean;
}