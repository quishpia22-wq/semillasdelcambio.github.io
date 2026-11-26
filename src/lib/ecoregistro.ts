export const LAUNCH_URL = "ecoregistro://abrir";
export const DOWNLOAD_URL = "/descargas/EcoRegistro.zip";
export function clampZoom(value: number) {
  return Math.min(4, Math.max(1, value));
}
