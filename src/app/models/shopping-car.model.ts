export interface ICarrito {
    _id:                string;
    idCliente:          string;
    cantidad_productos: number;
    productos:          Array<{ _id: string, producto:string, precio:  number, cantidadCarrito: number, imagen: string }>;
    precioTotal:        number;
}