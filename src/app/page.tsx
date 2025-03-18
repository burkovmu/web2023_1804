'use client';

import Hero from '@/components/sections/Hero';
import Portfolio from '@/components/sections/Portfolio';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Technologies from '@/components/sections/Technologies';
import Articles from '@/components/sections/Articles';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Technologies />
      <Articles />
      <Contact />
    </main>
  );
}
