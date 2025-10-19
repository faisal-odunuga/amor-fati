import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { contactMethods, faq, formFields } from '@/lib/data';
import { getContactHref } from '@/lib/utils';
import { siteMetadata } from '@/lib/metadata';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Contact',
  description:
    'Connect with Amor Fati and Sheriff Muhammad for collaborations, coaching, or speaking engagements. Let’s create something worth reliving.',
};

export default function ContactPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* ---------- HERO ---------- */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold'>Get in Touch</h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Ready to start your transformation? Let’s talk about how we can work together.
          </p>
        </div>
      </section>

      {/* ---------- CONTACT FORM + INFO ---------- */}
      <section className='py-16 px-6'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <Card className='border-border shadow-md hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='font-serif text-2xl'>Send a Message</CardTitle>
            </CardHeader>

            <CardContent>
              <form className='space-y-6'>
                {formFields.map((field) => (
                  <div key={field.id} className='space-y-2'>
                    <Label htmlFor={field.id}>{field.label}</Label>

                    {field.component === 'input' ? (
                      <Input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    ) : (
                      <Textarea
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={field.rows}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}

                <Button
                  type='submit'
                  className='w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all'
                >
                  {'Send Message'}
                  <Send className='ml-2 h-4 w-4' />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className='space-y-8'>
            <div className='space-y-6'>
              <h2 className='font-serif text-3xl font-bold'>Let’s Connect</h2>
              <p className='text-muted-foreground leading-relaxed'>
                Whether you're interested in 1:1 coaching, booking a masterclass, or just want to
                say hello, I’d love to hear from you.
              </p>
            </div>

            {/* Dynamic Contact List */}
            <div className='space-y-4'>
              {contactMethods.map((item) => (
                <div key={item.title} className='flex items-start gap-4'>
                  <div className='h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0'>
                    <item.icon className='h-5 w-5 text-accent' />
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>{item.title}</h3>
                    <Link
                      href={getContactHref(item)}
                      target={item.type === 'social' ? '_blank' : '_self'}
                      rel={item.type === 'social' ? 'noopener noreferrer' : undefined}
                      className='text-muted-foreground hover:underline break-words'
                    >
                      {item.value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time */}
            <Card className='border-border bg-secondary/30'>
              <CardContent className='p-6'>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  <span className='font-semibold text-foreground'>Response time:</span> typically
                  within 24–48 hours. For urgent inquiries, mention it in your subject line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-center'>
            Frequently Asked Questions
          </h2>

          <div className='space-y-6'>
            <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
              {faq.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className='transition-transform hover:scale-[1.01]'
                >
                  <AccordionTrigger className='text-xl font-semibold'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col gap-4 text-balance'>
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}
