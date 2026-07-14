import React, { lazy, Suspense } from "react";

import Hero from "./sections/Hero.jsx";
import RegisterForm from "./sections/RegisterForm.jsx";

import HeroOrg from "./sections/HeroOrg.jsx";
import RegisterFormOrg from "./sections/RegisterFormOrg.jsx";

import StickyBar from "./components/StickyBar.jsx";

const PainMirror = lazy(() => import("./sections/PainMirror.jsx"));
const StatsBand = lazy(() => import("./sections/StatsBand.jsx"));
const BeforeAfter = lazy(() => import("./sections/BeforeAfter.jsx"));
const Mechanism = lazy(() => import("./sections/Mechanism.jsx"));
const Coach = lazy(() => import("./sections/Coach.jsx"));
const Testimonials = lazy(() => import("./sections/Testimonials.jsx"));
const FAQ = lazy(() => import("./sections/FAQ.jsx"));
const FinalCTA = lazy(() => import("./sections/FinalCTA.jsx"));
const Footer = lazy(() => import("./sections/Footer.jsx"));

const ThankYou = lazy(() => import("./pages/ThankYou.jsx"));
const ThankYouOrg = lazy(() => import("./pages/ThankYouOrg.jsx"));

const Fallback = () => <div className="h-40" aria-hidden />;

function SharedSections() {
  return (
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
  );
}

export default function App() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // Removes trailing slash: /org/ becomes /org
  const path = pathname.replace(/\/+$/, "") || "/";

  // ORG thank-you page
  // Keep this before the general /ty-* condition
  if (path === "/ty-gcr-org") {
    return (
      <Suspense fallback={<Fallback />}>
        <ThankYouOrg />
      </Suspense>
    );
  }

  // Existing thank-you pages
  if (path.startsWith("/ty-") || path === "/thank-you") {
    return (
      <Suspense fallback={<Fallback />}>
        <ThankYou />
      </Suspense>
    );
  }

  // ORG landing page
  if (path === "/org") {
    return (
      <>
        <main id="main">
          <HeroOrg />
          <RegisterFormOrg />
          <SharedSections />
        </main>

        <StickyBar />
      </>
    );
  }

  // Existing normal landing page
  return (
    <>
      <main id="main">
        <Hero />
        <RegisterForm />
        <SharedSections />
      </main>

      <StickyBar />
    </>
  );
}