import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Copy, ExternalLink, Leaf, Maximize, Minus, Plus, Recycle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import infographic from "@/assets/guia-ecologica.png.asset.json";
import { EXECUTABLE_PATH, EXECUTABLE_URL, clampZoom } from "@/lib/ecoregistro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoRegistro — Soporte técnico y cuidado ambiental" },
      { name: "description", content: "EcoRegistro: soporte técnico, cuidado y prevención de riesgos en el gabinete de computadora." },
      { property: "og:title", content: "EcoRegistro — Soporte técnico y cuidado ambiental" },
      { property: "og:description", content: "Identificación, cuidado y prevención de riesgos en el gabinete de computadora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [zoom, setZoom] = useState(1);

  async function copyPath() {
    try {
      await navigator.clipboard.writeText(EXECUTABLE_PATH);
      setCopyStatus("Ruta copiada.");
    } catch {
      pathInput.current?.focus();
      pathInput.current?.select();
      setCopyStatus("No se pudo copiar automáticamente. Selecciona y copia la ruta mostrada.");
    }
  }

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
        <section aria-label="Acceso a EcoRegistro en Visual Basic" className="eco-access px-6 py-16 text-center sm:py-20">
          <Leaf className="mx-auto mb-7 size-9 text-primary" strokeWidth={1.3} aria-hidden="true" />
          <Button asChild className="h-auto max-w-full gap-3 whitespace-normal px-6 py-5 text-base font-bold shadow-soft hover:bg-accent sm:text-lg">
            <a href={EXECUTABLE_URL} onClick={() => setNotice(true)}>
              <ExternalLink aria-hidden="true" />
              Abrir EcoRegistro en Visual Basic (.exe)
            </a>
          </Button>
          {notice && (
            <div className="mx-auto mt-7 max-w-2xl rounded-lg border border-border bg-card p-5 text-left" role="status">
              <p className="text-sm leading-relaxed">El navegador puede bloquear la apertura de archivos locales. Si EcoRegistro no se abre, copia esta ruta y pégala en el Explorador de archivos de Windows.</p>
              <input ref={pathInput} aria-label="Ruta del programa EcoRegistro" readOnly value={EXECUTABLE_PATH} className="mt-4 w-full rounded-md border border-input bg-background p-3 font-mono text-xs" />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button variant="outline" onClick={copyPath}><Copy aria-hidden="true" />Copiar ruta</Button>
                <p className="text-sm text-primary">{copyStatus}</p>
              </div>
            </div>
          )}
        </section>

        <section aria-label="Infografía y pie de página" className="w-full">
          <div className="flex justify-end border-y border-border bg-card px-6 py-3 sm:px-10">
            <Button variant="outline" onClick={openViewer}><Maximize aria-hidden="true" />Pantalla completa</Button>
          </div>
          <img src={infographic.url} width={1024} height={1536} alt="EcoRegistro soporte técnico: partes del gabinete y sus funciones, importancia de la ventilación, riesgos identificados y recomendaciones preventivas para cuidar tu computadora." className="block h-auto w-full" fetchPriority="high" />
          <footer className="border-t border-accent/50 bg-primary px-6 py-10 text-center text-primary-foreground">
            <p className="text-lg font-bold">“Pequeños hábitos, grandes cambios”</p>
            <p className="mt-1 text-sm opacity-90">EcoRegistro · Semillas del Cambio · 3.º BTI</p>
          </footer>
        </section>
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
            <img src={infographic.url} width={1024} height={1536} alt="Infografía EcoRegistro ampliada" className="viewer-image" style={{ width: `${zoom * 100}%` }} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
