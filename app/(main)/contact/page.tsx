import type { Metadata } from 'next';
import ContactForm from '@/components/sections/contact/ContactForm';
import FeaturedIn from '@/components/sections/about/FeaturedIn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faq } from '@/utils/data';

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

export default function ContactPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactForm />

      <section className='bg-secondary/30 px-6 py-20 sm:py-24'>
        <div className='mx-auto max-w-4xl space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='mb-4 text-sm font-bold uppercase tracking-[0.4em] text-primary'>
              Common Questions
            </h2>
            <h3 className='font-serif text-3xl font-bold md:text-4xl'>Frequently Asked Questions</h3>
          </div>

          <Accordion type='single' collapsible className='w-full' defaultValue='item-0'>
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className='border-border transition-all duration-300'>
                <AccordionTrigger className='text-left font-serif text-lg font-medium transition-colors hover:text-primary sm:text-xl'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-base leading-relaxed text-muted-foreground sm:text-lg'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FeaturedIn />
    </main>
  );
}
