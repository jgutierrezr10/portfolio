"use client";

import { useEffect, useState } from "react";
import MatrixRain from "@/components/MatrixRain";
import ScrambleText from "@/components/ScrambleText";
import TerminalWindow from "@/components/TerminalWindow";
import { Sun, Moon, LayoutList, Layers, Mail, Code, Briefcase, FileText, Link, Globe } from "lucide-react";

export default function Home() {
  const [lines, setLines] = useState<number[]>([]);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isStacked, setIsStacked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jgutierrezreyes2003@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Generate line numbers based on approximate scroll height
    const calculateLines = () => {
      const lineCount = Math.floor(document.body.scrollHeight / 35);
      setLines(Array.from({ length: Math.max(lineCount, 50) }, (_, i) => i + 1));
    };

    calculateLines();
    window.addEventListener('resize', calculateLines);

    // Smooth scrolling implementation
    const links = document.querySelectorAll('nav a');
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const targetId = target.getAttribute('href');

      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      window.removeEventListener('resize', calculateLines);
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle("light-mode");
  };

  const toggleLayout = () => {
    setIsStacked(!isStacked);
  };

  return (
    <>
      <MatrixRain isLightMode={isLightMode} />
      
      <div className="line-numbers">
        {lines.map(num => (
          <span key={num}>{num}</span>
        ))}
      </div>

      <header>
        <div className="logo-pixel">
          <a href="#inicio">&gt;JGR_</a>
        </div>
        <nav>
          <ul>
            <li><a href="#inicio">~/inicio</a></li>
            <li><a href="#sobre-mi">~/sobre-mi</a></li>
            <li><a href="#proyectos">~/proyectos</a></li>
            <li><a href="#stack">~/stack</a></li>
            <li><a href="#certificaciones">~/certificados</a></li>
            <li style={{ marginLeft: "1.5rem" }}>
              <button 
                onClick={toggleLayout} 
                className="btn" 
                style={{ padding: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px" }}
                title={isStacked ? "Modo Lista" : "Modo Apilado"}
              >
                {isStacked ? <LayoutList size={18} /> : <Layers size={18} />}
              </button>
            </li>
            <li>
              <button 
                onClick={toggleTheme} 
                className="btn" 
                style={{ padding: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px" }} 
                title={isLightMode ? "Modo Claro" : "Modo Oscuro"}
              >
                {isLightMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className={`editor-container ${isStacked ? "layout-stacked" : "layout-list"}`}>
        
        <div className="col-left">
          <TerminalWindow id="win-inicio" title="portfolio.ts — Juaquin_Gutierrez">
            <section id="inicio" className="hero" style={{ padding: "1rem 0" }}>
                <p className="comment">/* Bienvenid@ a mi espacio de trabajo */</p>
                <ScrambleText text="Juaquin Gutiérrez Reyes" className="title-elegant" />
                <p className="subtitle">
                  <span className="font-elegant">Estudiante de Ing. Civil en Informática</span>
                  <span className="cursor">_</span>
                </p>
                <div className="social-links-container">
                  <button onClick={handleCopyEmail} className="social-link">
                    <Mail size={16} color="#ea4335" /> <span>{copied ? "copiado!" : "jgutierrezreyes2003@gmail.com"}</span>
                  </button>
                  <a href="https://github.com/jgutierrezr10" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Code size={16} color={isLightMode ? "#24292e" : "#fafbfc"} /> <span>github</span>
                  </a>
                  <a href="https://linkedin.com/in/jgutierrezr10" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Briefcase size={16} color="#0a66c2" /> <span>linkedin</span>
                  </a>
                  <a href="/tu_cv.pdf" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FileText size={16} color="#10b981" /> <span>cv</span>
                  </a>
                </div>
                <div style={{ marginTop: "2.5rem" }}>
                  <a href="#proyectos" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>./ver_proyectos.sh</a>
                </div>
            </section>
        </TerminalWindow>

        <TerminalWindow id="win-sobre-mi" title="sobre_mi.txt">
            <section id="sobre-mi" style={{ padding: "1rem 0" }}>
                <h2><span className="font-elegant">01.</span> &gt; <ScrambleText text="cat sobre_mi.txt" /></h2>
                <p className="font-elegant" style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--fg)" }}>
                  Basado en Concepción, Chile. Apasionado por el desarrollo de software y la creación de soluciones elegantes. 
                  Experiencia construyendo aplicaciones desde el modelado de bases de datos hasta la implementación de lógicas 
                  de negocio complejas en el backend y frontend.
                </p>
            </section>
          </TerminalWindow>

          <TerminalWindow id="win-stack" title="stack_tecnologico.json">
              <section id="stack" style={{ padding: "1rem 0" }}>
                  <h2><span className="font-elegant">03.</span> &gt; <ScrambleText text="cat stack_tecnologico.json" /></h2>
                  <div className="tags-habilidades">
                      <span>"PHP (Laravel)"</span>
                      <span>"Java (Spring Boot)"</span>
                      <span>"Python"</span>
                      <span>"JS (React/Next.js)"</span>
                      <span>"PostgreSQL/MySQL"</span>
                      <span>"C / C++"</span>
                  </div>
              </section>
          </TerminalWindow>

        </div>

        <div className="col-right">
          <TerminalWindow id="win-proyectos" title="proyectos_destacados/">
            <section id="proyectos" style={{ padding: "1rem 0" }}>
                <h2><span className="font-elegant">02.</span> &gt; <ScrambleText text="ls ./proyectos_destacados" /></h2>
                <div className="grid-proyectos">
                    <div className="tarjeta-proyecto">
                        <div className="proyecto-header">
                            <div>
                                <ScrambleText text="Emergencia_PSorda" className="font-elegant" style={{ fontSize: "1.4rem", color: "var(--fg)", display: "block" }} />
                                <span className="badge-status desarrollo">en desarrollo</span>
                            </div>
                            <a href="https://github.com/jgutierrezr10/Emergencia_PSorda" target="_blank" rel="noopener noreferrer" className="repo-link" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Link size={14} /> repo</a>
                        </div>
                        <img src="https://opengraph.githubassets.com/1/jgutierrezr10/Emergencia_PSorda" alt="Preview Emergencia_PSorda" className="proyecto-preview" />
                        <p>Sistema orientado a la atención de emergencias para personas sordas. Proyecto en desarrollo con enfoque en accesibilidad.</p>
                    </div>
                    
                    <div className="tarjeta-proyecto">
                        <div className="proyecto-header">
                            <div>
                                <ScrambleText text="Plataforma Aula" className="font-elegant" style={{ fontSize: "1.4rem", color: "var(--fg)", display: "block" }} />
                                <span className="badge-status finalizado">finalizado</span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <a href="https://github.com/jgutierrezr10/aula" target="_blank" rel="noopener noreferrer" className="repo-link" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Link size={14} /> repo</a>
                                <a href="https://aulaproject.vercel.app/login" target="_blank" rel="noopener noreferrer" className="demo-link" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Globe size={14} /> demo</a>
                            </div>
                        </div>
                        <img src="/aula-preview.png" alt="Preview Plataforma Aula" style={{ width: "100%", height: "auto", borderRadius: "4px", border: "1px solid var(--card-border)", margin: "1.5rem 0" }} />
                        <p>Plataforma web educativa e interactiva para la gestión académica y aprendizaje online fluido.</p>
                    </div>
                    
                    <div className="tarjeta-proyecto">
                        <div className="proyecto-header">
                            <div>
                                <ScrambleText text='App "Pre-Sent"' className="font-elegant" style={{ fontSize: "1.4rem", color: "var(--fg)", display: "block" }} />
                                <span className="badge-status idea">idea</span>
                            </div>
                        </div>
                        <p>Aplicación móvil para la automatización de asistencia universitaria. Validación estructurada mediante códigos QR dinámicos y geolocalización GPS.</p>
                    </div>
                    
                    <div className="tarjeta-proyecto">
                        <div className="proyecto-header">
                            <div>
                                <ScrambleText text="Evaluaciones DISC" className="font-elegant" style={{ fontSize: "1.4rem", color: "var(--fg)", display: "block" }} />
                                <span className="badge-status desarrollo">en desarrollo</span>
                            </div>
                        </div>
                        <p>Desarrollo full-stack para la gestión y análisis de pruebas de comportamiento. Arquitectura construida con enfoque en la integridad de los datos.</p>
                    </div>
                </div>
            </section>
          </TerminalWindow>

          <TerminalWindow id="win-certificaciones" title="certificados_y_cursos/">
              <section id="certificaciones" style={{ padding: "1rem 0" }}>
                <h2><span className="font-elegant">04.</span> &gt; <ScrambleText text="ls ./certificados_y_cursos" /></h2>
                <div className="grid-proyectos">
                  <div className="tarjeta-proyecto" style={{ padding: "1.5rem" }}>
                    <div className="proyecto-header" style={{ marginBottom: "0.8rem" }}>
                      <h3 className="font-elegant" style={{ fontSize: "1.2rem" }}>Certificación Scrum Master</h3>
                      <span style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>[ completado ]</span>
                    </div>
                    <p>Certificación en metodologías ágiles, gestión de equipos de desarrollo y facilitación de proyectos bajo el marco de trabajo Scrum.</p>
                  </div>
                  
                  <div className="tarjeta-proyecto" style={{ padding: "1.5rem" }}>
                    <div className="proyecto-header" style={{ marginBottom: "0.8rem" }}>
                      <h3 className="font-elegant" style={{ fontSize: "1.2rem" }}>Nombre del Curso / BootCamp</h3>
                      <span style={{ color: "var(--gray)", fontSize: "0.85rem", fontStyle: "italic" }}>[ completado ]</span>
                    </div>
                    <p>Aquí puedes agregar otra certificación de AWS, Cisco, Platzi, Udemy o un curso universitario relevante que destaque tus habilidades.</p>
                  </div>
                </div>
              </section>
          </TerminalWindow>
        </div>

      </main>

      <footer>
        <p className="font-elegant">/* © 2026 Juaquin Gutiérrez. Fin del archivo. */</p>
      </footer>
    </>
  );
}
