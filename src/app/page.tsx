"use client";

import { useEffect, useState } from "react";
import MatrixRain from "@/components/MatrixRain";
import ScrambleText from "@/components/ScrambleText";

export default function Home() {
  const [lines, setLines] = useState<number[]>([]);

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

  return (
    <>
      <MatrixRain />
      
      <div className="line-numbers">
        {lines.map(num => (
          <span key={num}>{num}</span>
        ))}
      </div>

      <header>
        <nav>
          <ul>
            <li><a href="#inicio">~/inicio</a></li>
            <li><a href="#sobre-mi">~/sobre-mi</a></li>
            <li><a href="#proyectos">~/proyectos</a></li>
            <li><a href="#stack">~/stack</a></li>
            <li><a href="#contacto">~/contacto</a></li>
          </ul>
        </nav>
      </header>

      <main className="editor-container">

        <div className="window-frame">
          <div className="window-bar">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            portfolio.ts — Juaquin_Gutierrez
          </div>

          <div className="window-content">
            <section id="inicio" className="hero">
              <p className="comment">/* Bienvenid@ a mi espacio de trabajo */</p>
              <ScrambleText text="Juaquin Gutiérrez Reyes" className="title-elegant" />
              <p className="subtitle">
                <span className="font-elegant">Estudiante de Ing. Civil en Informática</span>
                <span className="cursor">_</span>
              </p>
              <a href="#proyectos" className="btn">ejecutar ./ver_proyectos.sh</a>
            </section>

            <div className="divider">/* ------ */</div>

            <section id="sobre-mi">
              <h2><span className="font-elegant" style={{ color: "var(--accent)" }}>01.</span> &gt; <ScrambleText text="cat sobre_mi.txt" /></h2>
              <p className="font-elegant" style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--fg)" }}>
                Basado en Concepción, Chile. Apasionado por el desarrollo de software y la creación de soluciones elegantes.
                Experiencia construyendo aplicaciones desde el modelado de bases de datos hasta la implementación de lógicas
                de negocio complejas en el backend y frontend.
              </p>
            </section>

            <div className="divider">/* ------ */</div>

            <section id="proyectos">
              <h2><span className="font-elegant" style={{ color: "var(--accent)" }}>02.</span> &gt; <ScrambleText text="ls ./proyectos_destacados" /></h2>
              <div className="grid-proyectos">
                <div className="tarjeta-proyecto">
                  <div className="proyecto-header">
                    <ScrambleText text="Emergencia_PSorda" className="font-elegant" />
                    <a href="https://github.com/jgutierrezr10/Emergencia_PSorda" target="_blank" rel="noopener noreferrer" className="repo-link">🔗 repo</a>
                  </div>
                  <img src="https://opengraph.githubassets.com/1/jgutierrezr10/Emergencia_PSorda" alt="Preview Emergencia_PSorda" className="proyecto-preview" />
                  <p>Sistema orientado a la atención de emergencias para personas sordas. Proyecto en desarrollo con enfoque en accesibilidad.</p>
                </div>

                <div className="tarjeta-proyecto">
                  <div className="proyecto-header">
                    <ScrambleText text="Plataforma Aula" className="font-elegant" />
                    <div>
                      <a href="https://github.com/jgutierrezr10/aula" target="_blank" rel="noopener noreferrer" className="repo-link">🔗 repo</a>
                      <a href="https://aulaproject.vercel.app/login" target="_blank" rel="noopener noreferrer" className="demo-link" style={{ marginLeft: "10px" }}>🌐 demo</a>
                    </div>
                  </div>
                  <div className="iframe-container">
                    <iframe src="https://aulaproject.vercel.app/login" title="Preview Aula Demo" className="proyecto-preview-iframe" scrolling="no"></iframe>
                  </div>
                  <p>Plataforma web educativa e interactiva para la gestión académica y aprendizaje online fluido.</p>
                </div>

                <div className="tarjeta-proyecto">
                  <div className="proyecto-header">
                    <ScrambleText text='App "Pre-Sent"' className="font-elegant" />
                  </div>
                  <p>Aplicación móvil para la automatización de asistencia universitaria. Validación estructurada mediante códigos QR dinámicos y geolocalización GPS.</p>
                </div>

                <div className="tarjeta-proyecto">
                  <div className="proyecto-header">
                    <ScrambleText text="Evaluaciones DISC" className="font-elegant" />
                  </div>
                  <p>Desarrollo full-stack para la gestión y análisis de pruebas de comportamiento. Arquitectura construida con enfoque en la integridad de los datos.</p>
                </div>
              </div>
            </section>

            <div className="divider">/* ------ */</div>

            <section id="stack">
              <h2><span className="font-elegant" style={{ color: "var(--accent)" }}>03.</span> &gt; <ScrambleText text="cat stack_tecnologico.json" /></h2>
              <div className="tags-habilidades">
                <span>"PHP (Laravel)"</span>
                <span>"Java (Spring Boot)"</span>
                <span>"Python"</span>
                <span>"JS (React/Next.js)"</span>
                <span>"PostgreSQL/MySQL"</span>
                <span>"C / C++"</span>
              </div>
            </section>

            <div className="divider">/* ------ */</div>

            <section id="contacto">
              <h2><span className="font-elegant" style={{ color: "var(--accent)" }}>04.</span> &gt; <ScrambleText text="./contactar.sh" /></h2>
              <p className="font-elegant" style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--fg)", marginBottom: "2rem" }}>
                ¿Tienes algún proyecto en mente, buscas colaboración o simplemente quieres charlar sobre código? Siéntete libre de contactarme.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <a href="mailto:jgutierrezreyes2003@gmail.com" className="btn">✉️ enviar_email</a>
                <a href="https://github.com/jgutierrezr10" target="_blank" rel="noopener noreferrer" className="btn">🐙 ver_github</a>
                <a href="https://linkedin.com/in/jgutierrezr10" target="_blank" rel="noopener noreferrer" className="btn">💼 linkedin</a>
                <a href="/tu_cv.pdf" target="_blank" rel="noopener noreferrer" className="btn">📄 descargar_cv</a>
              </div>
            </section>
          </div>
        </div>

      </main>

      <footer>
        <p className="font-elegant">/* © 2026 Juaquin Gutiérrez. Fin del archivo. */</p>
      </footer>
    </>
  );
}
