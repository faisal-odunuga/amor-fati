// 'use client';

import React from 'react';
import ContactForm from '@/components/sections/contact/ContactForm';
import FeaturedIn from '@/components/sections/about/FeaturedIn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faq } from '@/lib/data';

export default function ContactPage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <ContactForm />

      {/* FAQ Section */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='text-sm font-bold tracking-[0.4em] uppercase text-primary mb-4'>
              Common Questions
            </h2>
            <h3 className='font-serif text-3xl md:text-4xl font-bold'>
              Frequently Asked Questions
            </h3>
          </div>

          <div className='space-y-6'>
            <Accordion type='single' collapsible className='w-full' defaultValue='item-0'>
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className='border-border transition-all duration-300'
                >
                  <AccordionTrigger className='text-xl font-serif font-medium hover:text-primary transition-colors'>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground leading-relaxed text-lg'>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <FeaturedIn />
    </main>
  );
}
