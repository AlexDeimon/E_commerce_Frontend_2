export interface ICompra {
    _id: string;
    idCliente: string;
    carrito: { _id: string, cantidad_productos: number, precioTotal: number };
    fecha: string;
}