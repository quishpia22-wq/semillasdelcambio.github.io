import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Color, Group, Shape } from "three";
import { Recycle } from "lucide-react";

function RecyclingSculpture({ colors, moving, onReady }: { colors: string[]; moving: boolean; onReady: () => void }) {
  const group = useRef<Group>(null);
  const ready = useRef(false);
  const shape = useMemo(() => {
    const outline = new Shape();
    outline.absarc(0, 0, 1.48, 0.12, 1.57, false);
    outline.lineTo(0, 1.78);
    outline.lineTo(-0.66, 1.2);
    outline.lineTo(0, 0.81);
    outline.lineTo(0, 1.03);
    outline.absarc(0, 0, 1.03, Math.PI / 2, 0.12, true);
    outline.closePath();
    return outline;
  }, []);
  useFrame((_, delta) => {
    if (!ready.current) { ready.current = true; onReady(); }
    if (group.current && moving) group.current.rotation.z += Math.min(delta, 0.05) * 0.16;
  });
  return (
    <group ref={group} rotation={[0.25, -0.3, 0]}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} rotation={[0, 0, index * Math.PI * 2 / 3]}>
          <extrudeGeometry args={[shape, { depth: 0.25, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.045, bevelThickness: 0.045, curveSegments: 24 }]} />
          <meshStandardMaterial color={colors[0]} emissive={colors[0]} emissiveIntensity={0.13} metalness={0.65} roughness={0.27} />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.38]}>
        <torusGeometry args={[2.05, 0.015, 8, 80]} />
        <meshBasicMaterial color={colors[1]} />
      </mesh>
    </group>
  );
}

export default function EcoScene({ paused }: { paused: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const styles = getComputedStyle(document.documentElement);
    setColors(["--primary", "--accent", "--foreground"].map((token) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = styles.getPropertyValue(token).trim();
      ctx.fillRect(0, 0, 1, 1);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      return new Color(`rgb(${pixel[0] ?? 0}, ${pixel[1] ?? 0}, ${pixel[2] ?? 0})`).getStyle();
    }));
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (wrapper.current) observer.observe(wrapper.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  return (
    <div ref={wrapper} className="eco-scene" data-scene-ready={ready ? "true" : undefined} aria-label="Símbolo de reciclaje tridimensional">
      {colors.length > 0 && (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 46 }} frameloop={visible && !paused && !reduced ? "always" : "demand"} fallback={<Recycle className="scene-fallback" />}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 4, 5]} intensity={3} color={colors[2]} />
          <Environment resolution={64}>
            <Lightformer intensity={3} position={[0, 4, 3]} scale={[8, 4, 1]} color={colors[2]} />
            <Lightformer intensity={2} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} color={colors[1]} />
          </Environment>
          <RecyclingSculpture colors={colors} moving={!paused && !reduced} onReady={() => setReady(true)} />
          <OrbitControls enableZoom={false} enablePan={false} enableDamping={false} />
        </Canvas>
      )}
    </div>
  );
}