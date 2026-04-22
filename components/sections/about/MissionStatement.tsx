import React from 'react';
import { Brain, Zap, TrendingUp } from 'lucide-react';

const MissionStatement = () => {
  return (
    <section className='bg-secondary/30 py-24 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-4xl font-serif mb-12 font-bold'>
          The core pillars of peak performance
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          <div className='p-8 bg-background shadow-sm border border-border/50'>
            <Brain className='text-primary h-10 w-10 mx-auto mb-4' />
            <h3 className='font-bold uppercase tracking-wider text-sm mb-4'>Master Mindset</h3>
            <p className='text-sm text-muted-foreground'>
              Breaking through the psychological barriers that keep you playing small.
            </p>
          </div>
          <div className='p-8 bg-background shadow-sm border border-border/50'>
            <Zap className='text-primary h-10 w-10 mx-auto mb-4' />
            <h3 className='font-bold uppercase tracking-wider text-sm mb-4'>Vital Energy</h3>
            <p className='text-sm text-muted-foreground'>
              Optimizing your biology to fuel the massive action required for greatness.
            </p>
          </div>
          <div className='p-8 bg-background shadow-sm border border-border/50'>
            <TrendingUp className='text-primary h-10 w-10 mx-auto mb-4' />
            <h3 className='font-bold uppercase tracking-wider text-sm mb-4'>Strategic Impact</h3>
            <p className='text-sm text-muted-foreground'>
              Designing systems and habits that lead to consistent, exponential growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
