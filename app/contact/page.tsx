// 'use client';

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact & Book a Session',
  description:
    'Get in touch with Amor Fati to book a 1:1 coaching session, group masterclass, or speak with Moh Sheriff. Available worldwide via video call.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact & Book a Session | Amor Fati',
    description:
      'Book 1:1 coaching, group masterclasses, or send a message to Moh Sheriff. Coaching available worldwide.',
    url: 'https://www.amorfatihq.com/contact',
  },
};

// FAQ Schema for Google rich results
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I book a 1:1 coaching session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Use the contact form and include your goals and availability. Moh will reply with available times and next steps.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer group coaching or masterclasses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Overconfidence 101 Masterclass is available for teams, schools, and organizations. Reach out to discuss details.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the best way to stay updated on events?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subscribe to the newsletter on the Journal page to be first to know about upcoming retreats and events.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your services available internationally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1:1 coaching is available worldwide via video call. In-person events are currently Lagos-based, with plans to expand.',
      },
    },
  ],
};
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
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
