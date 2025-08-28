import { Icon } from "@iconify/react";
import React from "react";

interface SpinnerProps {
  thickness?: "thin" | "normal" | "thick";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: string; // Hex code like "#FF5733"
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  thickness = "normal",
  size = "md",
  color = "#ffff", // default gray-500
  className = "",
}) => {
  // Map sizes to Tailwind w/h (also map to fontSize for Iconify)
  const sizeMap: Record<string, string> = {
    xs: "1rem",   // 16px
    sm: "1.5rem", // 24px
    md: "2rem",   // 32px (default)
    lg: "2.5rem", // 40px
    xl: "3rem",   // 48px
    "2xl": "4rem", // 64px
  };

  // Thickness as scale (scales icon size slightly)
  const thicknessMap: Record<string, number> = {
    thin: 0.85,
    normal: 1,
    thick: 1.2,
  };

  return (
    <Icon
      icon="codex:loader"
      className={`animate-spin ${className}`}
      style={{
        fontSize: `calc(${sizeMap[size]} * ${thicknessMap[thickness]})`,
        color,
      }}
    />
  );
};

export default Spinner;
