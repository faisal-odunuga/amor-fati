import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const pillars = [
  {
    number: '01',
    title: 'Radical Ownership',
    description:
      'The external world is uncontrollable. The internal world is your kingdom. Taking 100% responsibility for your reaction to every event is the first step to true power.',
    icon: '👑',
  },
  {
    number: '02',
    title: 'Strategic Silence',
    description:
      'In a world of noise, silence is a weapon. We teach the art of withholding reaction, finding the gap between stimulus and response, and acting with surgical precision.',
    icon: '🤫',
  },
  {
    number: '03',
    title: 'Amor Fati',
    description:
      'Love your fate. Not just the good parts. The pain, the loss, the failure—these are not obstacles, they are the raw material for your transformation. Use them.',
    icon: '🔥',
  },
  {
    number: '04',
    title: 'Memento Mori',
    description:
      "Remember you will die. This isn't morbid; it's the ultimate clarifier. When you realize your time is finite, you stop wasting it on things that don't matter.",
    icon: '💀',
  },
];

const PillarsOfFate = () => {
  return (
    <section className='py-32 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-20'>
          <h2 className='text-sm font-bold tracking-[0.4em] uppercase text-primary mb-4'>
            The Framework
          </h2>
          <h3 className='font-serif text-4xl md:text-6xl font-bold text-balance'>
            The Four Pillars of Fate
          </h3>
        </div>

        <div className='grid md:grid-cols-2 gap-px bg-border border border-border'>
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className='bg-background p-12 hover:bg-muted/30 transition-colors duration-500 group border-border'
            >
              <div className='flex justify-between items-start mb-8'>
                <span className='font-serif text-6xl font-black text-muted-foreground/20 group-hover:text-primary/20 transition-colors'>
                  {pillar.number}
                </span>
                <span className='text-4xl grayscale group-hover:grayscale-0 transition-all'>
                  {pillar.icon}
                </span>
              </div>
              <h4 className='font-serif text-3xl font-bold mb-4'>{pillar.title}</h4>
              <p className='text-muted-foreground leading-relaxed text-lg'>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsOfFate;
