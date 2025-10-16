'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Video, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { courses, freeResources } from '@/lib/data';
import InstagramEmbed from '@/components/sections/Instagram';
import TikTokEmbed from '@/components/sections/Tiktok';

export default function OfferingsPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'
          >
            Transform Your Reality
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-xl text-muted-foreground leading-relaxed'
          >
            Resources, courses, and experiences designed to unlock your highest potential.
          </motion.p>
        </div>
      </section>

      {/* Daily Wisdom - Social Media Content */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='space-y-4 text-center'
          >
            <div className='flex items-center justify-center gap-3'>
              <Video className='h-8 w-8 text-accent' />
              <h2 className='font-serif text-3xl md:text-4xl font-bold'>Daily Wisdom</h2>
            </div>
            <p className='text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
              Insights on mindset, philosophy, and personal growth. Shared freely, daily.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* TikTok Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='space-y-4'
            >
              <h3 className='font-serif text-2xl font-bold text-center'>TikTok</h3>
              <div className='bg-muted rounded-lg overflow-hidden border border-border'>
                <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                  <TikTokEmbed />
                </div>
              </div>

            
            </motion.div>

            {/* Instagram Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='space-y-4'
            >
              <h3 className='font-serif text-2xl font-bold text-center'>Instagram</h3>
              <div className=' bg-muted rounded-lg overflow-hidden border border-border'>
                <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                  <InstagramEmbed />
                </div>
              </div>
            
            </motion.div>
          </div>
        </div>
      </section>

      {/* Starter Pack - Ordered by Price */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='space-y-4'
          >
            <div className='flex items-center gap-3'>
              <Download className='h-8 w-8 text-accent' />
              <h2 className='font-serif text-3xl md:text-4xl font-bold'>Starter Pack</h2>
            </div>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Tools to support your journey. Each designed with intention and care.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {freeResources.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className='border-border overflow-hidden group h-full'>
                  <div className='relative aspect-square bg-muted overflow-hidden'>
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className='font-serif text-xl'>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className='flex items-center justify-between'>
                    <span className='text-xl font-bold text-accent'>{product.price}</span>
                    <Button
                      size='sm'
                      className='bg-accent hover:bg-accent/90 text-accent-foreground'
                    >
                      Get Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='space-y-4'
          >
            <div className='flex items-center gap-3'>
              <GraduationCap className='h-8 w-8 text-accent' />
              <h2 className='font-serif text-3xl md:text-4xl font-bold'>The Academy</h2>
            </div>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Structured learning for lasting change. Lifetime access to all materials.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 gap-8'>
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className='border-border h-full hover:border-accent transition-colors'>
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-full ${course.color} flex items-center justify-center mb-4`}
                    >
                      <course.icon className='h-8 w-8' />
                    </div>
                    <CardTitle className='font-serif text-2xl'>{course.title}</CardTitle>
                    <CardDescription className='text-base'>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex gap-4 text-sm text-muted-foreground'>
                      <span>⏱️ {course.duration}</span>
                      <span>📚 {course.modules}</span>
                    </div>
                    <Button className='w-full bg-accent hover:bg-accent/90 text-accent-foreground'>
                      Enroll Now
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
