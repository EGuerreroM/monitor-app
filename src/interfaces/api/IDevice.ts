export interface IDevice {
  id: string;
  nombre: string;
  humedad_medida: number;
  temperatura_medida: number;
  riego_activado: boolean;
  imagen_url: string;
  usuario: number;
  planta: number;
}