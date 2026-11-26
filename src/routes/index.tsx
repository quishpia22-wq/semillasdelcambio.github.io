import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoRegistro — Semillas del Cambio" },
      { name: "description", content: "EcoRegistro: registro de materiales reciclables del equipo Semillas del Cambio de 3.º BTI." },
      { property: "og:title", content: "EcoRegistro — Semillas del Cambio" },
      { property: "og:description", content: "Pequeños hábitos, grandes cambios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Aporte = { id: number; material: string; cantidad: number; fecha: string };
const MATERIALES = ["Plástico", "Papel", "Cartón", "Vidrio", "Metal"];
const META = 100;

function Leaf({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
      <circle cx="24" cy="24" r="22" className="fill-primary" />
      <path d="M24 12c6 0 10 4 10 10-6 0-10-4-10-10Z" className="fill-primary-foreground" />
      <path d="M14 30a10 10 0 0 0 17 4" fill="none" className="stroke-primary-foreground" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M31 30v4h-4" fill="none" className="stroke-primary-foreground" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 22a10 10 0 0 0-12-6" fill="none" className="stroke-accent" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  { href: "#presentacion", label: "Presentación" },
  { href: "#boton", label: "Botón" },
  { href: "#impacto", label: "Impacto" },
  { href: "#historia", label: "Historia" },
];

function Index() {
  const [aportes, setAportes] = useState<Aporte[]>([
    { id: 1, material: "Plástico", cantidad: 12, fecha: "2026-11-03" },
    { id: 2, material: "Papel", cantidad: 8, fecha: "2026-11-07" },
    { id: 3, material: "Cartón", cantidad: 15, fecha: "2026-11-12" },
    { id: 4, material: "Vidrio", cantidad: 6, fecha: "2026-11-18" },
  ]);
  const [material, setMaterial] = useState(MATERIALES[0]!);
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [menu, setMenu] = useState(false);
  const [aviso, setAviso] = useState("");

  const total = aportes.reduce((s, a) => s + a.cantidad, 0);
  const pct = Math.min(100, Math.round((total / META) * 100));
  const porTipo = MATERIALES.map((m) => ({
    m,
    n: aportes.filter((a) => a.material === m).reduce((s, a) => s + a.cantidad, 0),
  }));
  const porFecha = [...aportes].sort((a, b) => b.fecha.localeCompare(a.fecha));

  function guardar(e: FormEvent) {
    e.preventDefault();
    const n = Number(cantidad);
    if (!n || n <= 0 || !fecha) {
      setAviso("Completa la cantidad y la fecha.");
      return;
    }
    setAportes((p) => [...p, { id: Date.now(), material, cantidad: n, fecha }]);
    setCantidad("");
    setFecha("");
    setAviso("¡Aporte guardado!");
  }

  const card = "rounded-2xl bg-card p-6 shadow-soft";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground shadow-soft">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#presentacion" className="flex min-w-0 items-center gap-3">
            <Logo />
            <div className="min-w-0">
              <p className="text-xl font-extrabold leading-tight">EcoRegistro</p>
              <p className="truncate text-xs opacity-90">“Pequeños hábitos, grandes cambios”</p>
            </div>
          </a>
          <button className="rounded-lg border border-primary-foreground/40 px-3 py-2 text-sm md:hidden" aria-expanded={menu} aria-controls="nav" onClick={() => setMenu(!menu)}>
            Menú
          </button>
          <nav id="nav" aria-label="Principal" className={`${menu ? "block" : "hidden"} absolute left-0 right-0 top-full bg-primary px-4 pb-4 md:static md:block md:p-0`}>
            <ul className="flex flex-col gap-1 md:flex-row md:gap-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setMenu(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-primary-foreground/15">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        <section id="presentacion" className="scroll-mt-24 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1 text-sm font-semibold text-primary">
            <Leaf className="h-4 w-4" /> Semillas del Cambio · 3.º BTI
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-primary md:text-6xl">Dales una segunda vida a tus materiales</h1>
          <div id="boton" className="mt-8 scroll-mt-24">
            <button type="button" onClick={() => document.getElementById("visualizar")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent">
              ingresar a visual Basic l
            </button>
          </div>
        </section>

        <section id="visualizar" aria-labelledby="vis-t" className={`${card} scroll-mt-24`}>
          <h2 id="vis-t" className="mb-5 flex items-center gap-2 text-2xl font-bold text-primary"><Leaf /> Visualizar</h2>
          <form onSubmit={guardar} className="grid gap-4 md:grid-cols-4 md:items-end">
            <label className="grid gap-1 text-sm font-semibold">
              <span className="flex items-center gap-1"><Leaf className="h-4 w-4 text-primary" /> Material</span>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2.5">
                {MATERIALES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Cantidad (kg)
              <input type="number" min="0.1" step="0.1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2.5" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Fecha
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2.5" />
            </label>
            <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 font-bold text-primary-foreground transition-colors hover:bg-primary/90">Guardar</button>
          </form>
          <p role="status" className="mt-3 min-h-5 text-sm font-semibold text-accent">{aviso}</p>
        </section>

        <section id="historia" aria-labelledby="hist-t" className={`${card} scroll-mt-24`}>
          <h2 id="hist-t" className="mb-5 flex items-center gap-2 text-2xl font-bold text-primary"><Leaf /> Historial de aportes</h2>
          <div className="overflow-x-auto rounded-xl bg-background">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr><th scope="col" className="px-4 py-3">#</th><th scope="col" className="px-4 py-3">Material</th><th scope="col" className="px-4 py-3">Cantidad (kg)</th><th scope="col" className="px-4 py-3">Fecha</th></tr>
              </thead>
              <tbody>
                {aportes.map((a, i) => (
                  <tr key={a.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">{i + 1}</td><td className="px-4 py-3">{a.material}</td><td className="px-4 py-3">{a.cantidad}</td><td className="px-4 py-3">{a.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="impacto" aria-labelledby="imp-t" className="scroll-mt-24">
          <h2 id="imp-t" className="mb-2 text-3xl font-extrabold text-primary">Impacto Ambiental / Impacto Verde</h2>
          <p className="mb-6 text-accent font-semibold">pequeños hábitos, grandes cambios</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[["Total reciclado", `${total} kg`], ["Aportes registrados", String(aportes.length)], ["Meta mensual", `${META} kg`]].map(([t, v]) => (
              <div key={t} className={card}>
                <Leaf className="h-6 w-6 text-primary" />
                <p className="mt-2 text-sm">{t}</p>
                <p className="text-3xl font-extrabold text-primary">{v}</p>
              </div>
            ))}
          </div>
          <div className={`${card} mt-4`}>
            <div className="mb-2 flex justify-between text-sm font-semibold"><span>Avance de la meta mensual del curso</span><span>{pct}%</span></div>
            <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Avance de la meta mensual" className="h-4 overflow-hidden rounded-full bg-background">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className={card}>
              <h3 className="mb-3 font-bold text-primary">Por tipo</h3>
              <ul className="space-y-2">
                {porTipo.map(({ m, n }) => (
                  <li key={m} className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" />{m}</span><span className="font-semibold">{n} kg</span></li>
                ))}
              </ul>
            </div>
            <div className={card}>
              <h3 className="mb-3 font-bold text-primary">Por fecha</h3>
              <ul className="space-y-2">
                {porFecha.map((a) => (
                  <li key={a.id} className="flex justify-between gap-2"><span>{a.fecha}</span><span className="font-semibold">{a.material} · {a.cantidad} kg</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-8 text-center text-primary-foreground">
        <p className="text-lg font-bold">“Pequeños hábitos, grandes cambios”</p>
        <p className="mt-1 text-sm opacity-90">EcoRegistro · Semillas del Cambio · 3.º BTI</p>
      </footer>
    </div>
  );
}
