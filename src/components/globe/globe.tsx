import { cn } from "@/lib/utils";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import useOnScreen from "@/hooks/useOnScreen";
import { GLOBE_CONFIG } from "./default-globe-config";

type GlobeProps = {
  className?: string;
  config?: COBEOptions;
};

const Globe = ({ className, config = GLOBE_CONFIG }: GlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isOnScreen = useOnScreen(containerRef);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const r = useMotionValue(0);
  const controls = useAnimation();
  let phi = 0;
  let width = 0;

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      controls.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r.get();
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi, r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    if (isOnScreen) {
      window.addEventListener("resize", onResize);
      onResize();

      const globe = createGlobe(canvasRef.current!, {
        ...config,
        width: width * 2,
        height: width * 2,
        onRender,
      });

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 100); // Adding a delay to ensure the globe initialization happens smoothly

      return () => {
        globe.destroy();
        window.removeEventListener("resize", onResize);
      };
    }
  }, [isOnScreen, config, onRender]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      {isOnScreen && (
        <motion.canvas
          className={cn(
            "h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
          )}
          ref={canvasRef}
          onPointerDown={(e) =>
            updatePointerInteraction(
              e.clientX - pointerInteractionMovement.current
            )
          }
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
          animate={controls}
        />
      )}
    </div>
  );
};

export default Globe;
