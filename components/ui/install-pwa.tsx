'use client';

import { useState, useEffect } from 'react';
import { X, Share, PlusSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

export function InstallPWA() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');

    if (isStandalone) return;

    // Only show on bookclub subdomain
    const hostname = window.location.hostname;
    const isBookClub = hostname.includes('bookclub') || hostname.includes('localhost'); 
    // In production, we'd be more specific but this covers the subdomain logic
    if (!isBookClub) return;

    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIos) setPlatform('ios');
    else if (isAndroid) setPlatform('android');

    // Show prompt after a delay if on mobile
    if (isIos || isAndroid) {
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className='fixed inset-x-4 bottom-6 z-[100] sm:inset-x-auto sm:right-6 sm:max-w-sm'>
      <div className='relative overflow-hidden border border-black/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.15)] rounded-none'>
        <button 
          onClick={dismiss}
          className='absolute right-3 top-3 text-black/40 hover:text-black transition-colors'
        >
          <X className='size-4' />
        </button>

        <div className='flex items-start gap-4'>
          <div className='size-12 shrink-0 border border-black/5 bg-[#faf7f1] p-2'>
            <img src='/logo.png' alt='Amor Fati' className='size-full object-contain' />
          </div>
          <div>
            <p className='text-[10px] font-bold uppercase tracking-widest text-[#d9a517]'>Mobile Application</p>
            <h3 className='mt-1 font-serif text-lg text-black'>Install Amor Fati</h3>
            <p className='mt-2 text-xs leading-relaxed text-black/60'>
              Add this system to your home screen for instant access to your reading cadence.
            </p>
          </div>
        </div>

        <div className='mt-6 border-t border-black/5 pt-4'>
          {platform === 'ios' ? (
            <div className='flex items-center gap-3 text-xs text-black/80'>
              <span>Tap</span>
              <div className='flex size-6 items-center justify-center bg-blue-50 text-blue-600 rounded-md'>
                <Share className='size-3.5' />
              </div>
              <span>then</span>
              <div className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100'>
                <PlusSquare className='size-3.5' />
                <span className='font-semibold'>Add to Home Screen</span>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-3 text-xs text-black/80'>
              <span>Tap the</span>
              <div className='font-bold'>three dots</div>
              <span>then</span>
              <div className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100'>
                <Download className='size-3.5' />
                <span className='font-semibold'>Install App</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
