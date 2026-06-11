"use client";
import { useEffect, useRef } from "react";

interface MatrixRainProps {
  isLightMode?: boolean;
}

export default function MatrixRain({ isLightMode = false }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Llenar el canvas de color sólido al iniciar o cambiar de tema para borrar estelas
    ctx.fillStyle = isLightMode ? "#f4f1ea" : "#131210";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Warm colors to match the vintage code theme
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Inicializar las gotas
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Dibuja el fondo negro con opacidad para crear el efecto de desvanecimiento
      // En modo claro usamos un color crema
      ctx.fillStyle = isLightMode ? "rgba(244, 241, 234, 0.05)" : "rgba(19, 18, 16, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color de los caracteres (gris/crema según modo)
      ctx.fillStyle = isLightMode ? "rgba(107, 100, 92, 0.35)" : "rgba(140, 133, 119, 0.35)";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.8
      }}
    />
  );
}
