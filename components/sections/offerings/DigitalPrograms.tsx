import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { freeResources } from '@/lib/data';

const programs = [
  {
    title: 'Money Masters®',
    description: "Learn the secrets of the world's most successful investors.",
    price: 'Enroll Now — $249',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAChjIF1KbYfIzhtmMP-xSZHVrzHpZCEcOannnKL6B8j1qcRf9ZhowhEKYzuBEJqoxDRJZppRjPVJWk_UKJMGJEEQwFC7KQPRhGdBzOs8resuFb7q-Hl8H__ixrU9SMfdVFK4gdHftLrGnWIiwU4UqmPHU_FVX7kAKMAwlsyZRb8ThXP13I7uFc634WnV2lcjyL6A7DwdO2_6osx19qxSmPpy4tQai_XqfwCCpomhFGYpa6VGteOjBYgXqgAisL8VxdqQdB-MrAHRA',
  },
  {
    title: 'Mastering Influence®',
    description: 'Learn how to ethically influence anyone, anywhere, anytime.',
    price: 'Enroll Now — $249',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBwch6RfEmiSY-sGwPVZJ4SlVGqIbqtDI4u_5cVVOtXZ7DtWUCabd9OGnq_51SDcC0UtWLEUs3KpwzWHhkOGJ_6wN7BaOZxr0svu_JUvchAqw6Ihv5DZaNVOpkuW0gCqcjGpAvj2YxLiiun1Ia2eLAPwa1IqlhTvhtfuEb3oQDQIVBH7M8WOU7anMlQ9nKwZEs_j5vHGKqvlphz_Lm3xsK-brSmZc4jJDXsVSihkfxjVxPVBKIoAY79z1-DioS7UFr5P3MbAsvutUT',
  },
  {
    title: 'Creating Lasting Change™',
    description: 'The ultimate guide to psychology and emotional resilience.',
    price: 'Enroll Now — $299',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAe5Zs5UxgMYQKZSpnkycMbf5Ibx5rvXcWN_3jn3OE8eNUdIVRJzUGuCGJLJVOCQpaN4mx4cxDRN2Q2ibf6IW861Y7kC7yAcyRslUkSmK2CS0sHmmyeAsQYTCmGzuIM6fcNFSi7gqaIOeSKEGsPp7lRC3Unf6pVyxeaohsOQoWPhB0Z4ROdC9Hkb_MFG90bqqpS0DyUCydTqLekLyf3UnkMjbk8OBZwTCTnmbRpKe1A38pqDbgH7REb0QNxbuTg8MFgn4BLcV2_oR9b',
  },
];

const DigitalPrograms = () => {
  return (
    <section className='py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-12'>
          <div>
            <h2 className='text-3xl md:text-4xl font-serif font-black uppercase tracking-tight mb-2'>
              Digital Programs
            </h2>
            <p className='text-muted-foreground'>
              Master life from anywhere with our self-paced courses.
            </p>
          </div>
          <Link
            href='/shop'
            className='text-primary font-bold text-sm uppercase tracking-widest mt-4 md:mt-0 flex items-center hover:translate-x-1 transition-transform group'
          >
            Explore Shop{' '}
            <ArrowRight className='ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform' />
          </Link>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {freeResources.map((program, index) => (
            <div key={index} className='group cursor-pointer'>
              <div className='relative overflow-hidden rounded-xl mb-6 aspect-[4/5]'>
                <img
                  src={program.image}
                  alt={program.name}
                  className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8'>
                  <span className='text-white/60 text-xs font-bold uppercase tracking-widest mb-2'>
                    Digital
                  </span>
                  <h3 className='text-2xl font-bold text-white mb-2 leading-tight font-serif'>
                    {program.name}
                  </h3>
                  <p className='text-white/80 text-sm mb-6 line-clamp-2'>{program.description}</p>

                  <Link href={program.link} target='_blank'>
                    <button className='w-full bg-primary text-primary-foreground py-3 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all'>
                      {program.price}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalPrograms;
