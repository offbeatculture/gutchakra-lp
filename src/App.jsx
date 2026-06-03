import React, { lazy, Suspense } from 'react';
import Hero from './sections/Hero.jsx';
import RegisterForm from './sections/RegisterForm.jsx';
import StickyBar from './components/StickyBar.jsx';

const PainMirror   = lazy(() => import('./sections/PainMirror.jsx'));
const StatsBand    = lazy(() => import('./sections/StatsBand.jsx'));
const BeforeAfter  = lazy(() => import('./sections/BeforeAfter.jsx'));
const Mechanism    = lazy(() => import('./sections/Mechanism.jsx'));
const Coach        = lazy(() => import('./sections/Coach.jsx'));
const Testimonials = lazy(() => import('./sections/Testimonials.jsx'));
const FAQ          = lazy(() => import('./sections/FAQ.jsx'));
const FinalCTA     = lazy(() => import('./sections/FinalCTA.jsx'));
const Footer       = lazy(() => import('./sections/Footer.jsx'));
const ThankYou     = lazy(() => import('./pages/ThankYou.jsx'));

const Fallback = () => <div className="h-40" aria-hidden />;

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  // Any /ty-* path renders the thank-you page (covers /ty-fb11 and future variants).
  if (path.startsWith('/ty-') || path === '/thank-you') {
    return (
      <Suspense fallback={<Fallback />}>
        <ThankYou />
      </Suspense>
    );
  }

  return (
    <>
      <main id="main">
        <Hero />
        <RegisterForm />
        <Suspense fallback={<Fallback />}>
          <PainMirror />
          <StatsBand />
          <BeforeAfter />
          <Mechanism />
          <Coach />
          <Testimonials />
          <FAQ />
          <FinalCTA />
          <Footer />
        </Suspense>
      </main>
      <StickyBar />
    </>
  );
}
