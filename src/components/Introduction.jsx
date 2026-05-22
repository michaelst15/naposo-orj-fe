import React, { useEffect, useRef } from "react";

function Introduction({ onDone }) {
  const introRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const t1 = setTimeout(() => {
      intro.classList.add("active");
    }, 100);

    const t2 = setTimeout(() => {
      onDone?.();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className="intro-root" aria-label="introduction">
      <style>{`
        .intro-root {
          background-color: #050505;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          position: fixed;
          inset: 0;
          z-index: 100;
        }

        .bg-light {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(29, 29, 29, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          animation: pulseBg 4s infinite alternate;
        }

        .intro-container {
          text-align: center;
          position: relative;
          opacity: 0;
          transform: scale(0.9);
        }

        .intro-container.active {
          animation: introSequence 0.1s forwards;
          opacity: 1;
          transform: scale(1);
        }

        .text-naposo {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
          position: relative;
          letter-spacing: -2px;
          display: inline-block;
          opacity: 0;
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        }

        .intro-container.active .text-naposo {
          animation: glitchIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation-delay: 0.5s;
        }

        .text-naposo::before,
        .text-naposo::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .text-naposo::before {
          left: 2px;
          text-shadow: -1px 0 #ff0055;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          animation: glitchTop 2s infinite linear alternate-reverse;
          display: none;
        }

        .text-naposo::after {
          left: -2px;
          text-shadow: -1px 0 #00f3ff;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          animation: glitchBottom 1.5s infinite linear alternate-reverse;
          display: none;
        }

        .intro-container.active .text-naposo::before,
        .intro-container.active .text-naposo::after {
          display: block;
          animation-delay: 2s;
        }

        .text-orj {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 700;
          color: #ffd700;
          letter-spacing: 10px;
          margin: 10px 0;
          position: relative;
          display: block;
          opacity: 0;
          transform: translateY(-20px);
        }

        .intro-container.active .text-orj {
          animation: slideDownFade 0.8s forwards;
          animation-delay: 1.2s;
        }

        .text-orj::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 3px;
          background: #ffd700;
          box-shadow: 0 0 10px #ffd700;
          transform: translateX(-50%);
          transition: width 0.5s ease;
        }

        .intro-container.active .text-orj::after {
          width: 100%;
          transition-delay: 1.8s;
        }

        .text-lumban {
          font-size: clamp(1rem, 2.5vw, 2rem);
          font-weight: 800;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 18px;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0;
          width: 0;
        }

        .intro-container.active .text-lumban {
          animation: typeWriter 1.5s steps(30, end) forwards;
          animation-delay: 2s;
        }

        @keyframes glitchIn {
          0% { opacity: 0; transform: scale(2); filter: blur(10px); clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
          20% { opacity: 1; transform: scale(1); filter: blur(0); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          21% { transform: translateX(5px); }
          22% { transform: translateX(-5px); }
          23% { transform: translateX(0); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }

        @keyframes glitchTop {
          0% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          20% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(-2px, 2px); }
          40% { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(2px, -2px); }
          60% { clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 80%); transform: translate(-2px, 2px); }
          80% { clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); transform: translate(2px, -2px); }
          100% { clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%); transform: translate(0); }
        }

        @keyframes glitchBottom {
          0% { clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(0); }
          20% { clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%); transform: translate(2px, -2px); }
          40% { clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); transform: translate(-2px, 2px); }
          60% { clip-path: polygon(0 10%, 100% 10%, 100% 90%, 0 90%); transform: translate(2px, -2px); }
          100% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); transform: translate(0); }
        }

        @keyframes slideDownFade {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes typeWriter {
          from { width: 0; opacity: 1; }
          to { width: 100%; opacity: 1; }
        }

        @keyframes pulseBg {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
      `}</style>

      <div className="bg-light" />
      <div className="intro-container" ref={introRef} id="intro">
        <div className="text-naposo" data-text="NAPOSO">
          NAPOSO
        </div>
        <div className="text-orj">ORJ</div>
        <div className="text-lumban">
          <span>LUMBAN TOBING</span>
          <span aria-hidden className="inline-block h-[1em] border-r-2 border-r-white/50 animate-intro-blink-caret" />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
