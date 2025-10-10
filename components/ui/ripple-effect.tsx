import { CSSProperties, memo, useMemo } from "react";

interface RippleProps {
  numCircles?: number;
  mainCircleSize?: number;
  mainCircleOpacity?: number;
}

const Ripple = memo(function Ripple({
  numCircles = 8,
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
}: RippleProps) {
  const circles = useMemo(() => {
    return Array.from({ length: numCircles }, (_, i) => {
      const size = mainCircleSize + i * 70;
      const opacity = mainCircleOpacity - i * 0.03;
      const animationDelay = `${i * 0.06}s`;
      const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
      const borderOpacity = 5 + i * 5;

      return (
        <div
          key={i}
          className={`absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2 animate-ripple rounded-full border bg-foreground/25 shadow-xl [--i:${i}]`}
          style={
            {
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              borderWidth: "1px",
              borderColor: `rgba(var(--foreground-rgb), ${borderOpacity / 100})`,
            } as CSSProperties
          }
        />
      );
    });
  }, [mainCircleSize, mainCircleOpacity, numCircles]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {circles}
    </div>
  );
});

export default Ripple;
