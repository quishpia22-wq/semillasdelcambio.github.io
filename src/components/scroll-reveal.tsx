import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export function ScrollReveal({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} className={inView ? "scroll-reveal is-visible" : "scroll-reveal"}>{children}</div>;
}