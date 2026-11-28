import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SupportImageViewer({ src, onClose }: { src: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  return (
    <TransformWrapper minScale={1} maxScale={4} initialScale={1} centerOnInit onTransform={(_, state) => setScale(state.scale)} wheel={{ step: 0.08 }}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="flex h-full flex-col bg-background">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border bg-card px-3 py-3 sm:px-5">
            <p className="hidden font-bold text-primary sm:block">EcoRegistro · Soporte técnico</p>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" title="Alejar" aria-label="Alejar" disabled={scale <= 1} onClick={() => zoomOut(0.5)}><Minus /></Button>
              <output className="w-14 text-center text-sm font-bold" aria-live="polite">{Math.round(scale * 100)}%</output>
              <Button size="icon" variant="outline" title="Acercar" aria-label="Acercar" disabled={scale >= 4} onClick={() => zoomIn(0.5)}><Plus /></Button>
              <Button size="icon" variant="outline" title="Restablecer imagen" aria-label="Restablecer imagen" onClick={() => resetTransform()}><RotateCcw /></Button>
              <Button size="icon" variant="outline" title="Cerrar" aria-label="Cerrar" onClick={onClose}><X /></Button>
            </div>
          </div>
          <div className="viewer-surface min-h-0 flex-1">
            <TransformComponent wrapperClass="pan-wrapper" contentClass="pan-content">
              <img src={src} width={1024} height={1536} alt="Infografía EcoRegistro ampliada: gabinete, ventilación y recomendaciones preventivas" draggable={false} className="pan-image" />
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
}