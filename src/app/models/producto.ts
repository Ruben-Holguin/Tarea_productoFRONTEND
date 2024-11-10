import { Categoria } from "./categoria";

export class Producto {
    id: number;
    nombre: string;
    cantidad: number;
    categoria: Categoria;

    constructor(id: number, nombre: string, cantidad: number, categoria: Categoria) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.categoria = categoria;
    }
}
