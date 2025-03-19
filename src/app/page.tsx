'use client';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Articles from '@/components/sections/Articles';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Articles />
      <Contact />
    </main>
  );
}
