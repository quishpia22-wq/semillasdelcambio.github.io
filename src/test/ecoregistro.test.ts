import { describe, expect, it } from "vitest";
import { DOWNLOAD_URL, clampZoom } from "@/lib/ecoregistro";

describe("Acceso al ejecutable", () => {
  it("descarga el programa desde el propio sitio", () => {
    expect(DOWNLOAD_URL).toBe("/descargas/EcoRegistro.zip");
  });
  it("limita el zoom a una escala legible", () => {
    expect(clampZoom(0.5)).toBe(1);
    expect(clampZoom(5)).toBe(4);
    expect(clampZoom(2)).toBe(2);
  });
});
