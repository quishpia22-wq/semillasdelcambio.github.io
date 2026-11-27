import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useRef, useState, type PointerEvent } from "react";
import { Cpu, Download, FileText, GlassWater, Leaf, Maximize, Package, Pause, Play, Recycle, Scale, Sprout, Trash2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import infographic from "@/assets/guia-ecologica.png.asset.json";
import banner from "@/assets/banner-recoleccion.png.asset.json";
import { SupportImageViewer } from "@/components/support-image-viewer";
import { DOWNLOAD_URL, LAUNCH_URL } from "@/lib/ecoregistro";

const EcoScene = lazy(() => import("@/components/eco-scene"));

function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--tilt-x", `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 16}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 16}deg`);
}
function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

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
  const [paused, setPaused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  function openViewer() {
    const element = dialog.current;
    if (!element) return;
    setViewerOpen(true);
    element.showModal();
    if (element.requestFullscreen) void element.requestFullscreen().catch(() => {});
  }

  async function closeViewer() {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch { /* The full-window dialog still closes. */ }
    }
    dialog.current?.close();
    setViewerOpen(false);
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4 sm:px-10">
          <div className="brand-symbol relative flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/50 text-primary" aria-hidden="true">
            <Recycle className="size-8" strokeWidth={1.3} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">EcoRegistro</h1>
            <p className="mt-1 text-xs text-muted-foreground">Tecnología que cuida el planeta</p>
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
          <div className="hero-inner relative mx-auto max-w-6xl px-6 sm:px-10">
            <div className="hero-copy relative z-10">
              <p className="text-xs font-extrabold text-accent uppercase">Recolección de material reciclable</p>
              <h2 className="hero-title mt-3 font-extrabold text-foreground">EcoRegistro</h2>
              <p className="mt-3 text-xl font-bold text-primary">Separamos hoy lo que mañana vuelve a servir.</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground">Plástico, papel, cartón, vidrio y metal: cada aporte que registras en EcoRegistro deja de ser basura y se convierte en recurso para el planeta.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {MATERIALS.map((material) => (
                  <li key={material} className="rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-primary">{material}</li>
                ))}
              </ul>
            </div>
            <ClientOnly fallback={<Recycle className="scene-fallback" aria-hidden="true" />}>
              <Suspense fallback={<Recycle className="scene-fallback" aria-hidden="true" />}><EcoScene paused={paused} /></Suspense>
            </ClientOnly>
            <Button variant="outline" size="icon" className="motion-control" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Reanudar animación 3D" : "Pausar animación 3D"} title={paused ? "Reanudar animación 3D" : "Pausar animación 3D"}>{paused ? <Play /> : <Pause />}</Button>
          </div>
        </section>

        <section id="materiales" aria-labelledby="materiales-titulo" className="scroll-section mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <SectionHeading number="01" id="materiales-titulo" title="Materiales que recolectamos" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MATERIAL_CARDS.map(({ name, icon: Icon, tip }, index) => (
              <li key={name} onPointerMove={tilt} onPointerLeave={resetTilt} className="material-card reveal" style={{ animationDelay: `${index * 90}ms` }}>
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

        <section id="infografia" aria-labelledby="infografia-titulo" className="scroll-section relative border-y border-border bg-card py-8">
          <div className="support-layout mx-auto max-w-6xl px-6 sm:px-10">
            <div>
              <div className="mb-3 flex items-center gap-2 text-accent"><Cpu className="cpu-pulse size-5" aria-hidden="true" /><span className="text-xs font-bold">TECNOLOGÍA + MEDIO AMBIENTE</span></div>
              <SectionHeading number="03" id="infografia-titulo" title="Soporte técnico" />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">El gabinete, la ventilación y el mantenimiento preventivo: una computadora cuidada también reduce los residuos electrónicos.</p>
              <Button onClick={openViewer} className="mt-5 gap-2"><Maximize aria-hidden="true" />Ver guía completa</Button>
            </div>
            <Button variant="ghost" onPointerMove={tilt} onPointerLeave={resetTilt} onClick={openViewer} className="support-preview" aria-label="Abrir la guía de soporte técnico en pantalla completa">
              <img src={INFOGRAPHIC_URL} width={1024} height={1536} alt="Guía EcoRegistro: CPU, gabinete, ventilación y prevención" loading="lazy" />
              <span className="preview-corner"><Maximize className="size-4" aria-hidden="true" /></span>
            </Button>
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

        <footer className="border-t border-accent/50 bg-card px-6 py-8 text-center text-foreground">
          <p className="text-lg font-bold">“Pequeños hábitos, grandes cambios”</p>
          <p className="mt-1 text-sm opacity-90">EcoRegistro · Semillas del Cambio · 3.º BTI</p>
        </footer>
      </main>

      <dialog ref={dialog} aria-label="Infografía en pantalla completa" className="infographic-dialog" onCancel={(event) => { event.preventDefault(); void closeViewer(); }}>
        {viewerOpen && <SupportImageViewer src={INFOGRAPHIC_URL} onClose={() => void closeViewer()} />}
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
