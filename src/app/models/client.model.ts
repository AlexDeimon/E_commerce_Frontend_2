export interface ICliente {
    _id:       string;
    nombre:    string;
    apellidos: string;
    direccion: string;
    telefono:  string;
    correo:    string;
    compras:  Array<{ _id: string, carrito: { _id: string, cantidad_productos: number, precioTotal: number }, fecha: Date }>;
}