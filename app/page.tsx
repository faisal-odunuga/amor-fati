// 'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Compass, Book, Calendar, ShoppingBag, User, Mail } from 'lucide-react';
import Hero from '@/components/sections/home/Hero';
import Philosophy from '@/components/sections/home/Philosophy';
import Offerings from '@/components/sections/home/Offerings';
import Events from '@/components/sections/home/Events';
import Newsletter from '@/components/sections/home/Newsletter';
import Contact from '@/components/sections/home/Contact';
import Image from 'next/image';
import About from '@/components/sections/home/About';

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section - Keep as is */}
      <Hero />
      <Philosophy />
      <Offerings />
      <Events />
      <About />
      <Contact />
      <Newsletter />
    </main>
  );
}
