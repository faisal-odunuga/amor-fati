'use client';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function InstagramEmbed() {
  useEffect(() => {
    // Remove any old embed.js script
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existingScript) existingScript.remove();

    // Add Instagram embed script dynamically
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <aside className='space-y-4'>
      <div className='bg-muted rounded-lg overflow-hidden border border-border'>
        <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
          <blockquote
            className='instagram-media'
            data-instgrm-captioned
            data-instgrm-permalink='https://www.instagram.com/reel/DPJsH2MjPtH/?utm_source=ig_embed&utm_campaign=loading'
            data-instgrm-version='14'
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '340px',
              minWidth: '326px',
              padding: 0,
              width: 'calc(100% - 2px)',
            }}
          ></blockquote>
        </div>
      </div>

      <Button asChild variant='outline' className='w-full bg-transparent'>
        <a href='https://instagram.com/amorfati' target='_blank' rel='noopener noreferrer'>
          Follow on Instagram
          <ArrowRight className='ml-2 h-4 w-4' />
        </a>
      </Button>
    </aside>
  );
}
