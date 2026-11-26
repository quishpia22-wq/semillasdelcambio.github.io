import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Download, Leaf, Maximize, Minus, Play, Plus, Recycle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import infographic from "@/assets/guia-ecologica.png.asset.json";
import banner from "@/assets/banner-recoleccion.png.asset.json";
import { DOWNLOAD_URL, LAUNCH_URL, clampZoom } from "@/lib/ecoregistro";

const SITE_ORIGIN = "https://prompt-shaped-webpage.lovable.app";
const BANNER_URL = `${SITE_ORIGIN}${banner.url}`;
const INFOGRAPHIC_URL = `${SITE_ORIGIN}${infographic.url}`;
const MATERIALS = ["Plástico", "Papel", "Cartón", "Vidrio", "Metal"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoRegistro — Recolección de material reciclable" },
      { name: "description", content: "EcoRegistro: recolección y registro de material reciclable, soporte técnico y cuidado ambiental." },
      { property: "og:title", content: "EcoRegistro — Recolección de material reciclable" },
      { property: "og:description", content: "Plástico, papel, cartón, vidrio y metal: registra tus aportes y cuida tu computadora." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: BANNER_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: BANNER_URL },
    ],
  }),
  component: Index,
});

function Index() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(1);

  function openViewer() {
    const element = dialog.current;
    if (!element) return;
    setZoom(1);
    element.showModal();
    if (element.requestFullscreen) void element.requestFullscreen().catch(() => {});
  }

  async function closeViewer() {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch { /* The full-window dialog still closes. */ }
    }
    dialog.current?.close();
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-6 sm:px-10">
          <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
            <Recycle className="size-10" strokeWidth={1.3} />
            <Leaf className="absolute size-4 bg-primary" strokeWidth={1.7} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-primary">EcoRegistro</h1>
            <p className="mt-1 text-sm text-foreground">Soporte técnico y cuidado ambiental</p>
          </div>
        </div>
      </header>

      <main>
        <section aria-label="Recolección de material reciclable" className="eco-banner relative isolate overflow-hidden border-b border-border">
          <img src={BANNER_URL} width={1536} height={1024} alt="Ilustración de contenedores de recolección con botellas de plástico, papel, cartón, frascos de vidrio y latas de metal, y unas manos depositando una botella" className="banner-art" fetchPriority="high" />
          <div className="relative mx-auto flex min-h-[21rem] max-w-6xl items-center px-6 py-10 sm:min-h-[27rem] sm:px-10">
            <div className="max-w-md rounded-xl bg-card/95 p-6 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
              <p className="text-xs font-extrabold tracking-[0.18em] text-accent uppercase">Recolección de material reciclable</p>
              <h2 className="mt-3 text-3xl leading-tight font-extrabold text-primary sm:text-4xl">Separamos hoy lo que mañana vuelve a servir</h2>
              <p className="mt-4 text-base leading-relaxed">Plástico, papel, cartón, vidrio y metal: cada aporte que registras en EcoRegistro deja de ser basura y se convierte en recurso para el planeta.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {MATERIALS.map((material) => (
                  <li key={material} className="rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-primary">{material}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-label="Infografía" className="w-full">
          <div className="flex justify-end border-y border-border bg-card px-6 py-3 sm:px-10">
            <Button variant="outline" onClick={openViewer}><Maximize aria-hidden="true" />Pantalla completa</Button>
          </div>
          <img src={INFOGRAPHIC_URL} width={1024} height={1536} alt="EcoRegistro soporte técnico: partes del gabinete y sus funciones, importancia de la ventilación, riesgos identificados y recomendaciones preventivas para cuidar tu computadora." className="block h-auto w-full" fetchPriority="high" />
        </section>

        <section aria-label="Acceso a EcoRegistro en Visual Basic" className="eco-access px-6 py-14 text-center sm:py-16">
          <Leaf className="mx-auto mb-6 size-9 text-primary" strokeWidth={1.3} aria-hidden="true" />
          <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed">¿Listo para registrar tus aportes de material reciclable? Descarga el programa EcoRegistro para Windows, extrae el archivo ZIP y abre EcoRegistro.exe.</p>
          <Button asChild className="h-auto max-w-full gap-3 whitespace-normal px-6 py-5 text-base font-bold shadow-soft hover:bg-accent sm:text-lg">
            <a href={DOWNLOAD_URL} download>
              <Download aria-hidden="true" />
              Descargar EcoRegistro para Windows (.zip)
            </a>
          </Button>
          <div className="mt-4">
            <Button asChild variant="outline" className="h-auto max-w-full gap-3 whitespace-normal px-6 py-4 text-base font-bold">
              <a href={LAUNCH_URL}>
                <Play aria-hidden="true" />
                Abrir EcoRegistro (equipos configurados)
              </a>
            </Button>
          </div>
        </section>

        <footer className="border-t border-accent/50 bg-primary px-6 py-10 text-center text-primary-foreground">
          <p className="text-lg font-bold">“Pequeños hábitos, grandes cambios”</p>
          <p className="mt-1 text-sm opacity-90">EcoRegistro · Semillas del Cambio · 3.º BTI</p>
        </footer>
      </main>

      <dialog ref={dialog} aria-label="Infografía en pantalla completa" className="infographic-dialog" onCancel={(event) => { event.preventDefault(); void closeViewer(); }}>
        <div className="flex h-full flex-col bg-background">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 py-3">
            <p className="hidden font-bold text-primary sm:block">EcoRegistro · Soporte técnico</p>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" title="Alejar" aria-label="Alejar" disabled={zoom <= 1} onClick={() => setZoom((value) => clampZoom(value - 0.5))}><Minus /></Button>
              <output className="w-14 text-center text-sm font-bold" aria-live="polite">{Math.round(zoom * 100)}%</output>
              <Button size="icon" variant="outline" title="Acercar" aria-label="Acercar" disabled={zoom >= 4} onClick={() => setZoom((value) => clampZoom(value + 0.5))}><Plus /></Button>
              <Button size="icon" variant="outline" title="Cerrar" aria-label="Cerrar" onClick={() => void closeViewer()}><X /></Button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain">
            <img src={INFOGRAPHIC_URL} width={1024} height={1536} alt="Infografía EcoRegistro ampliada" className="viewer-image" style={{ width: `${zoom * 100}%` }} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
