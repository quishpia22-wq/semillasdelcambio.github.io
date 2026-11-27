import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type CSSProperties } from "react";
import { Download, FileText, GlassWater, Leaf, Maximize, Minus, Package, Play, Plus, Recycle, Scale, Sprout, Trash2, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import infographic from "@/assets/guia-ecologica.png.asset.json";
import banner from "@/assets/banner-recoleccion.png.asset.json";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { DOWNLOAD_URL, LAUNCH_URL, clampZoom } from "@/lib/ecoregistro";

const SITE_ORIGIN = "https://prompt-shaped-webpage.lovable.app";
const BANNER_URL = `${SITE_ORIGIN}${banner.url}`;
const INFOGRAPHIC_URL = `${SITE_ORIGIN}${infographic.url}`;
const MATERIALS = ["Plástico", "Papel", "Cartón", "Vidrio", "Metal"];
const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#materiales", label: "Materiales" },
  { href: "#pasos", label: "Cómo participar" },
  { href: "#infografia", label: "Infografía" },
  { href: "#descarga", label: "Descarga" },
];
const MATERIAL_CARDS = [
  { name: "Plástico", icon: Recycle, tip: "Botellas y envases limpios y aplastados." },
  { name: "Papel", icon: FileText, tip: "Hojas, cuadernos y periódicos secos." },
  { name: "Cartón", icon: Package, tip: "Cajas desarmadas y sin restos de comida." },
  { name: "Vidrio", icon: GlassWater, tip: "Frascos y botellas enteros, sin tapa." },
  { name: "Metal", icon: UtensilsCrossed, tip: "Latas enjuagadas y comprimidas." },
];
const STEPS = [
  { icon: Trash2, title: "Separa", text: "Clasifica tus residuos por tipo de material." },
  { icon: Scale, title: "Registra", text: "Anota tu aporte en el programa EcoRegistro." },
  { icon: Sprout, title: "Transforma", text: "Tu material vuelve a ser recurso para el planeta." },
];
const SUPPORT_CROPS = [
  { label: "El gabinete", position: "center 6%" },
  { label: "Ventilación", position: "center 42%" },
  { label: "Prevención", position: "center 94%" },
];

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
  const support = useInView<HTMLDivElement>();

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
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
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
        <nav aria-label="Secciones" className="border-t border-border">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-8">
            {NAV.map((item) => (
              <li key={item.href} className="shrink-0"><a href={item.href} className="nav-pill">{item.label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" aria-label="Recolección de material reciclable" className="eco-banner scroll-section relative isolate overflow-hidden border-b border-border">
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

        <section id="materiales" aria-labelledby="materiales-titulo" className="scroll-section mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <SectionHeading number="01" id="materiales-titulo" title="Materiales que recolectamos" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MATERIAL_CARDS.map(({ name, icon: Icon, tip }, index) => (
              <li key={name} className="material-card reveal" style={{ animationDelay: `${index * 90}ms` }}>
                <span className="material-icon"><Icon className="size-7" strokeWidth={1.6} aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-extrabold text-primary">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="pasos" aria-labelledby="pasos-titulo" className="scroll-section bg-card py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <SectionHeading number="02" id="pasos-titulo" title="Cómo participar" />
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="step-card reveal" style={{ animationDelay: `${index * 120}ms` }}>
                  <span className="step-number">{index + 1}</span>
                  <Icon className="size-8 text-accent" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-3 text-xl font-extrabold text-primary">{title}</h3>
                  <p className="mt-2 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="infografia" aria-labelledby="infografia-titulo" className="scroll-section relative isolate overflow-hidden border-y border-border bg-card py-14">
          <Leaf className="drift-leaf" strokeWidth={1.3} aria-hidden="true" />
          <Recycle className="drift-recycle" strokeWidth={1.3} aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
            <SectionHeading number="03" id="infografia-titulo" title="Guía de soporte técnico" />
            <p className="mt-3 max-w-md text-sm leading-relaxed">Tres vistazos a la guía. Toca la tarjeta que quieras para abrirla completa y leerla con calma.</p>
          </div>

          <div ref={support.ref} className={cn("support-deck", support.inView && "is-visible")}>
            <span className="deck-glow" aria-hidden="true" />
            <button type="button" onClick={openViewer} className="deck-cards" aria-label="Abrir la guía de soporte técnico en pantalla completa">
              <span className="sr-only">EcoRegistro soporte técnico: partes del gabinete y sus funciones, importancia de la ventilación, riesgos identificados y recomendaciones preventivas para cuidar tu computadora.</span>
              {SUPPORT_CROPS.map((crop, index) => (
                <span key={crop.label} className="deck-card" style={{ "--i": index, "--crop": crop.position } as CSSProperties}>
                  <img src={INFOGRAPHIC_URL} width={1024} height={1536} alt="" loading="lazy" className="deck-img" />
                  <span className="deck-shine" aria-hidden="true" />
                  <span className="deck-tag">{crop.label}</span>
                </span>
              ))}
            </button>
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 pt-8 sm:px-10">
            <Button onClick={openViewer} className="gap-2"><Maximize aria-hidden="true" />Abrir en pantalla completa</Button>
            <span className="text-xs font-semibold text-muted-foreground">Dentro del visor puedes acercar con + y −</span>
          </div>
        </section>

        <section id="descarga" aria-label="Acceso a EcoRegistro en Visual Basic" className="scroll-section eco-access px-6 py-14 text-center sm:py-16">
          <p className="mb-2 text-sm font-extrabold tracking-[0.2em] text-accent">04</p>
          <h2 className="mb-6 text-3xl font-extrabold text-primary">Descarga EcoRegistro</h2>
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

function SectionHeading({ number, id, title }: { number: string; id: string; title: string }) {
  return (
    <div className="flex items-end gap-4">
      <span className="text-5xl leading-none font-extrabold text-accent/80">{number}</span>
      <h2 id={id} className="border-b-4 border-accent pb-1 text-3xl font-extrabold text-primary">{title}</h2>
    </div>
  );
}
