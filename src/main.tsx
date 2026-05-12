import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BinaryFade } from './components/BinaryFade';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="demo-page">
      <section className="hero-card">
        <BinaryFade direction="left-to-right" className="hero-card__binary" />
        <div className="hero-card__content">
          <h1>CONSORGIUM</h1>
          <p>DIGITAL</p>
        </div>
      </section>

      <section className="direction-grid" aria-label="Aperçu des directions disponibles">
        <article>
          <BinaryFade direction="right-to-left" lines={9} minDigits={5} maxDigits={18} />
          <span>right-to-left</span>
        </article>
        <article>
          <BinaryFade direction="top-to-bottom" lines={11} minDigits={5} maxDigits={16} />
          <span>top-to-bottom</span>
        </article>
        <article>
          <BinaryFade direction="bottom-to-top" lines={11} minDigits={5} maxDigits={16} />
          <span>bottom-to-top</span>
        </article>
      </section>
    </main>
  </StrictMode>,
);
