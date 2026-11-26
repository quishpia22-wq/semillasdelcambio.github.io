import { describe, expect, it } from "vitest";
import { EXECUTABLE_PATH, EXECUTABLE_URL, clampZoom } from "@/lib/ecoregistro";

describe("Acceso al ejecutable", () => {
  it("mantiene la ruta local exacta solicitada", () => {
    expect(EXECUTABLE_URL).toBe("file:///C:/Users/PC_S/OneDrive/Documents/Pictures/Desktop/ECOREGISTRO/EcoRegistro.exe");
    expect(EXECUTABLE_PATH).toBe(String.raw`C:\Users\PC_S\OneDrive\Documents\Pictures\Desktop\ECOREGISTRO\EcoRegistro.exe`);
  });
  it("limita el zoom a una escala legible", () => {
    expect(clampZoom(0.5)).toBe(1);
    expect(clampZoom(5)).toBe(4);
    expect(clampZoom(2)).toBe(2);
  });
});
