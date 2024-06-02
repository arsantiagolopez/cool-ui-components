import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

type CursorFollowGradientButtonProps = {
  children: ReactNode | string;
  className?: string;
  gradientRadius: number;
  gradientRgba: `rgba(${number},${number},${number},${number})`;
};

const CursorFollowGradientButton = ({
  children,
  className,
  gradientRadius,
  gradientRgba,
}: CursorFollowGradientButtonProps) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const radialGradientBackground = useMotionTemplate`
    radial-gradient(
      ${gradientRadius}px circle at ${mouseX}px ${mouseY}px,
      ${gradientRgba},
      transparent 80%
    )
  `;

  return (
    <button
      onMouseMove={handleMouseMove}
      className={cn("relative group rounded-xl w-fit", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: radialGradientBackground,
        }}
      />
      {children}
    </button>
  );
};

export { CursorFollowGradientButton };
