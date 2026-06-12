"use client";
import { useState } from "react";
import { motion, useDragControls, useAnimation } from "framer-motion";
import { GripHorizontal, Minus, Square, X } from "lucide-react";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function TerminalWindow({ title, children, id, className = "" }: TerminalWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const controls = useDragControls();
  const animationControls = useAnimation(); // Used to reset window position

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const errors = [
      "ERR: Permiso denegado",
      "ERR: root access required",
      "ERR: kill signal ignored",
      "ERR: segmentation fault"
    ];
    setErrorMsg(errors[Math.floor(Math.random() * errors.length)]);
    
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleDockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Si la ventana estaba arrastrada, la regresamos a su origen suavemente
    animationControls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });

    // Encontrar la ventana actual en el DOM
    const currentWindow = (e.currentTarget as HTMLElement).closest('.window-frame');
    if (!currentWindow) return;

    const currentRect = currentWindow.getBoundingClientRect();
    const allWindows = Array.from(document.querySelectorAll('.window-frame'));
    
    let nextWindow: Element | null = null;
    let minDiff = Infinity;

    // Buscar la ventana que esté físicamente más cerca hacia abajo
    allWindows.forEach(win => {
      if (win === currentWindow) return;
      const rect = win.getBoundingClientRect();
      const diff = rect.top - currentRect.top;
      
      // Tolerancia de 10px para evitar ventanas en la misma fila en modo grid
      if (diff > 10 && diff < minDiff) { 
        minDiff = diff;
        nextWindow = win;
      }
    });

    // Hacer scroll suave hacia la siguiente ventana
    if (nextWindow) {
      const elementPosition = nextWindow.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 100; // Offset para que no quede pegada al tope
  
      window.scrollTo({
           top: offsetPosition,
           behavior: "smooth"
      });
    }
  };

  return (
    <motion.div 
      drag 
      dragControls={controls}
      dragListener={false} // Solo arrastrable usando el botón específico
      dragMomentum={false}
      animate={animationControls}
      whileDrag={{ scale: 1.01, zIndex: 100, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
      className={`window-frame ${className}`}
      id={id}
      style={{ position: "relative", zIndex: 10, background: "var(--bg)" }}
    >
      <div 
        className="window-bar" 
        style={{ touchAction: "none", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="window-controls">
            <button 
              className="btn-drag" 
              onPointerDown={(e) => controls.start(e)} 
              title="Mover"
            >
              <GripHorizontal size={14} />
            </button>
          </div>
          <span style={{ userSelect: "none", pointerEvents: "none" }}>{title}</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {errorMsg && (
            <span style={{ color: "var(--red)", fontSize: "0.8rem", fontWeight: "bold" }}>
              {errorMsg}
            </span>
          )}
          <div className="window-controls" style={{ marginRight: 0 }}>
            <button 
              onClick={handleMinimizeClick} 
              title="Minimizar"
            >
              <Minus size={14} />
            </button>
            <button 
              onClick={handleDockClick} 
              title="Ir a la siguiente sección"
            >
              <Square size={12} />
            </button>
            <button 
              onClick={handleCloseClick} 
              title="Cerrar"
              style={{ backgroundColor: "var(--red)", color: "#ffffff", borderColor: "transparent" }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <div className="window-content" style={{ padding: "2.5rem 2rem" }}>
          {children}
        </div>
      )}
    </motion.div>
  );
}
