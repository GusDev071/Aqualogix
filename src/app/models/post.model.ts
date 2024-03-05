export interface Post {
    id: string;
    userId: string; // nuevo campo para el ID del usuario
    calle: string;
    nombre: string;
    colonia: string;
    litros: number; // Cambiado de Number a number
    municipio: string;
    titulo: string;
    contenido: string;
}