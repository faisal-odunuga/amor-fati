'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function TikTokEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Clean up existing script (avoid duplicates)
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (existingScript) existingScript.remove();

    // Add TikTok embed script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    // Detect when TikTok embed finishes initializing
    script.onload = () => {
      // TikTok replaces the blockquote automatically; wait a bit before hiding loader
      setTimeout(() => setIsLoaded(true), 1000);
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <aside className='space-y-4'>
      <div className='bg-muted rounded-lg overflow-hidden border border-border'>
        <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
          <div className='bg-muted rounded-lg overflow-hidden border border-border'>
            <div className='w-full h-full flex items-center justify-center text-muted-foreground relative min-h-[500px]'>
              {!isLoaded && (
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-muted'>
                  <Loader2 className='animate-spin h-8 w-8 mb-2 text-gray-500' />
                  <p className='text-sm text-gray-500'>Loading TikTok video...</p>
                </div>
              )}

              <blockquote
                className='tiktok-embed'
                cite='https://www.tiktok.com/@moh.sheriff/video/7449060412634451205'
                data-video-id='7449060412634451205'
                style={{
                  maxWidth: '605px',
                  minWidth: '325px',
                }}
              >
                <section>
                  <a
                    target='_blank'
                    title='@moh.sheriff'
                    href='https://www.tiktok.com/@moh.sheriff?refer=embed'
                  >
                    @moh.sheriff
                  </a>{' '}
                  Send it to your mummy or daddy so they’ll buy for you. 2025, we must grow! CLICK
                  LINK IN MY BIO to BUY, or DM me for any ENQUIRY.{' '}
                  <a
                    title='mindset'
                    target='_blank'
                    href='https://www.tiktok.com/tag/mindset?refer=embed'
                  >
                    #mindset
                  </a>{' '}
                  <a
                    title='booktok'
                    target='_blank'
                    href='https://www.tiktok.com/tag/booktok?refer=embed'
                  >
                    #booktok
                  </a>{' '}
                  <a
                    target='_blank'
                    title='♬ original sound - Moh Sheriff | 09061447022'
                    href='https://www.tiktok.com/music/original-sound-7449060460091099909?refer=embed'
                  >
                    ♬ original sound - Moh Sheriff | 09061447022
                  </a>
                </section>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <Button asChild variant='outline' className='w-full bg-transparent'>
        <a href='https://tiktok.com/@amorfati' target='_blank' rel='noopener noreferrer'>
          Follow on TikTok
          <ArrowRight className='ml-2 h-4 w-4' />
        </a>
      </Button>
    </aside>
  );
}
