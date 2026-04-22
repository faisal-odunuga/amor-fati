'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <span>
        <Image src='/logo.png' alt='logo' width={30} height={30} />
      </span>
      <span className='font-serif text-2xl font-bold tracking-tight'>Amor Fati</span>
    </Link>
  );
};

export default Logo;
