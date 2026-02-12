import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';

// Mock data for summits
const summits = [
  {
    city: 'Paris',
    date: 'October 2024',
    title: 'Inner Sanctum: Paris',
    subtitle: '3 Days of Strategic Depth',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTAys_VVgzKhIa2ZxWXPpoH5DHIGcIOW-GNnVsgbvC6JDiwk-AmFj8Vv0EoGE6XF8-Ve655HS7w_OsmLqJIYhSLZRVNfjYG-eciUs6HCMamskQbjF9BbsORocpw3359PA96bXU09oWn1GhMRNgFmF-jF6eWfdWuiusgvTrj4L_6JvZHHIQ-hgV88nhMewQQD_OHk6xdlE3qZu53zZvNRFjqLJWxMAsMfqxO_68a4yYTLIo9xV2NDDbfTGSRgTUZcbE14AL8hK8mdXg',
  },
  {
    city: 'Tokyo',
    date: 'December 2024',
    title: 'The Flow State: Tokyo',
    subtitle: 'Performance Masterclass',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTaONO4zMCxdmUAEzdrUZ5DfCZ5V56qarv59fMnd30uJsFYO-wcG4yGcqMHAgg5ZUyQMQp0slxabMKbuz-pxMCXjQKFdlHSuX0o5-bZrdvoj5LwqqzGlaP8dQui5BQg-LZTqFNsQf4ofb43fTl8PQKF1Mu_7PNwyoPQW3mwXjXnyzJ5YYjEzPFclMgDg07ZPJDuu8N6NBRDq2ztQTQ2foIdaGcALYe-UjafelYVTqjPZ7AMkPccXLdXCvhJUvGmsmL3IYfG7kBtJUd',
  },
  {
    city: 'NYC',
    date: 'January 2025',
    title: 'Architect of Destiny: NYC',
    subtitle: 'Annual Goal Synthesis',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKiooGzmPdnxfM8G7CBh-qk-DmRUf7ZgpPubYW4Pf4YCL4CURHpoCVHaL2ndiDujtMWovNL_Skt5Tt1VgiqRqP-iZmGBRcTCR9Agk8MUpUWZvlmobITis2wH5ZaZATT3SnvATDdf_FUg4u_Uys-8dC6AmrpfV4x-F2xCV2pajMFQjFXy3y6PDVb0N_V4bY_hJgVPwY7gaC6BsyKWDisf55xE3mhSPdWL9WiIvRJObwyLqRDGzJhT35bpAYLjhDMTk2nfzlfOZUeG9o',
  },
];

const Summits = () => {
  return (
    <section className='py-24 bg-secondary/50'>
      <div className='max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end'>
        <div>
          <h2 className='text-4xl font-serif font-bold text-foreground'>Immersive Summits</h2>
          <p className='text-muted-foreground mt-2'>Global encounters for the high-achiever.</p>
        </div>
        <div className='flex gap-4'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-none hover:bg-primary hover:text-primary-foreground border-border'
          >
            <ArrowLeft className='w-5 h-5' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-none hover:bg-primary hover:text-primary-foreground border-border'
          >
            <ArrowRight className='w-5 h-5' />
          </Button>
        </div>
      </div>

      <div className='flex gap-8 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide'>
        {summits.map((summit, index) => (
          <div
            key={index}
            className='min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer'
          >
            <div className='relative overflow-hidden aspect-[16/10] mb-6'>
              <img
                src={summit.image}
                alt={summit.title}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest'>
                {summit.date}
              </div>
            </div>
            <h4 className='text-xl font-bold uppercase tracking-tighter mb-2 text-foreground'>
              {summit.title}
            </h4>
            <p className='text-muted-foreground text-sm uppercase tracking-widest'>
              {summit.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Summits;
