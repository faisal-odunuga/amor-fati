import {
  BookOpen,
  Clock,
  Flame,
  Globe,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  Trophy,
  Star,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export const JOIN_URL = 'https://hubs.nestuge.com/amorfatibookclub/community';

export const SUPABASE_GENERAL_BASE =
  process.env.NEXT_PUBLIC_SUPABASE_GENERAL_BASE ??
  'https://oufksmargaiutcykyjne.supabase.co/storage/v1/object/public/general';

export const bookClubStats = [
  { number: '300', label: 'Seats This Quarter' },
  { number: '100', label: 'Names on the Wall' },
  { number: '3', label: 'Months. One Payment.' },
  { number: '₦251K+', label: 'Value Included' },
  { number: '1', label: 'Decision. Between Now And Your Old Life.' },
];

export const bookClubMissingOut = [
  "Monthly books that have already changed members' careers and relationships",
  'Live discussions with people who actually finish what they start',
  'Accountability systems that make "I meant to read that" impossible',
  'A curated network of ambitious, growth-focused individuals',
  "Moh's personal notes, highlights, and commentary on every book",
  'Early access to Amor Fati events, programmes, and offers',
];

export const bookClubBenefits: {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
}[] = [
  {
    icon: Users,
    title: 'Name on the Wall — Forever',
    description:
      'The first 100 people in get their name engraved on our website and walls permanently. One of the most exclusive spots in this community.',
    tag: 'First 100 Only',
  },
  {
    icon: BookOpen,
    title: 'One Life-Changing Book Per Month',
    description:
      'Skills. Strategy. Real lives lived. Three books in three months that compound in your brain and show up in your life.',
    tag: '3 Books Per Quarter',
  },
  {
    icon: Flame,
    title: 'Daily Prompts & Accountability',
    description:
      'You reflect daily. You get tracked. The system ensures you actually do the work when everything else has failed you.',
    tag: 'Every Single Day',
  },
  {
    icon: Zap,
    title: 'That ONE Scary Goal',
    description:
      "You will be forced to name the goal you've been hiding from, then go after it surrounded by a system built for execution.",
    tag: 'Goal System',
  },
  {
    icon: Globe,
    title: 'Real-Life Implementation',
    description:
      'Structures are built to make you use what you read in your real life. Reading without doing is just expensive entertainment.',
    tag: 'Systems Built In',
  },
  {
    icon: Users,
    title: 'A Family That Smells Like Growth',
    description:
      "Join a generational family that will be rooting for you every step. It's not just a club; it's a permanent growth hub.",
    tag: 'Global Community',
  },
  {
    icon: TrendingUp,
    title: 'Video Progress Updates',
    description:
      'Accountability meets content. Record your progress, document your change, and grow your social media presence alongside your mindset.',
    tag: 'Social Growth',
  },
  {
    icon: Users,
    title: 'Bi-Monthly Expert Sessions',
    description:
      'Real experts showing you exactly how they did it. No watered-down summaries, just direct teaching from people who have won.',
    tag: 'Every 2 Months',
  },
  {
    icon: Trophy,
    title: 'Top 10 Leaderboard — 1-on-1 with Moh',
    description:
      'Performing readers climb the board. Top 10 earn a private consultation with Moh, currently priced at ₦125,000 per session.',
    tag: 'Worth ₦125,000',
  },
  {
    icon: Zap,
    title: 'Monthly Meditation',
    description:
      'Monthly sessions to ground you, centre you, and remind you of the version of yourself you are actually building toward.',
    tag: 'Monthly',
  },
  {
    icon: MessageSquare,
    title: 'Virtual Ice Cream Dates',
    description:
      'Every month we celebrate the book we just finished together. Wins — even small ones — deserve to be celebrated out loud.',
    tag: 'Celebration',
  },
  {
    icon: Star,
    title: '3rd Wheel Access',
    description:
      "Spend a day with creators, influencers, and celebrities you've only ever seen on a screen. For free. This is exclusive access.",
    tag: 'Exclusive',
  },
  {
    icon: Globe,
    title: 'Global Tribe of 300',
    description:
      '300 people this quarter refusing to stay the same. You are no longer doing this alone; you are connected to a tribe with the same fire.',
    tag: '300 Members',
  },
  {
    icon: Flame,
    title: '2AM Raw Motivation',
    description:
      'Unfiltered, unscripted ideas and energy from Moh the moment they hit. The kind of motivation that moves you at your lowest.',
    tag: 'Live Spaces',
  },
  {
    icon: Zap,
    title: 'Direct Knowledge Transfer',
    description:
      'Every course, insight, and lesson Moh invests in during the quarter flows directly to you. Skip the trial and error.',
    tag: 'Shortcut',
  },
];

export const bookClubPillars = [
  {
    id: '01',
    title: 'Execution',
    subtitle: 'Massive Action & Results',
    description:
      'Set 10X targets and take the massive action required to dominate your field and achieve exceptional results.',
    book: 'The 10X Rule',
    author: 'Grant Cardone',
    icon: '📗',
  },
  {
    id: '02',
    title: 'Mindset & Strategy',
    subtitle: 'Think Like a General',
    description:
      'The mind is the battlefield. We arm yours with strategy, clarity, and the discipline of winners.',
    book: 'The Art of War',
    author: 'Sun Tzu',
    icon: '📕',
  },
  {
    id: '03',
    title: 'Autobiography',
    subtitle: 'Learn From Lives Lived',
    description:
      'Why guess when people have already walked the path? Learn from the greats who built empires.',
    book: 'Shoe Dog',
    author: 'Phil Knight',
    icon: '📙',
  },
];

export const bookClubBonuses = [
  {
    id: 'B1',
    name: 'Overconfidence 101',
    sub: 'Full program — sales, identity, execution',
    was: '₦100,000',
  },
  { id: 'B2', name: 'OC Room 105', sub: 'The private room experience', was: '₦11,500' },
  {
    id: 'B3',
    name: '11 Letters I Wrote But Never Sent',
    sub: "Moh's raw, honest e-book",
    was: '₦15,000',
  },
  {
    id: 'B4',
    name: 'Vision Board + Quarterly Check-In',
    sub: 'Personal session with Moh himself',
    was: 'Priceless',
  },
  {
    id: 'B5',
    name: "OG Moh's Newsletter",
    sub: 'Raw thoughts, insights, no filter',
    was: 'Exclusive',
  },
  {
    id: 'B6',
    name: '1-on-1 Consultation with Moh',
    sub: 'Top 10 leaderboard reward',
    was: '₦125,000',
  },
];

export const bookClubSteps: { step: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    step: '01',
    icon: Globe,
    title: 'Join the Club',
    desc: 'Join the Amor Fati Book Club and step into a community committed to real change, not passive reading.',
  },
  {
    step: '02',
    icon: BookOpen,
    title: 'Read and Reflect',
    desc: 'Members do not just read. They reflect on what they read and connect it to their lives.',
  },
  {
    step: '03',
    icon: Clock,
    title: 'Implement the Lessons',
    desc: 'The point is to put ideas into action so the reading shows up in your habits, work, and presence.',
  },
  {
    step: '04',
    icon: Flame,
    title: 'Share the Transformation',
    desc: 'Members share visible changes, new decisions, and the results that come from taking responsibility.',
  },
];

export const bookClubMembers = [
  {
    name: 'Faisal Odunuga',
    role: 'Pioneer Member',
    result: 'Built a website and started taking action daily',
    quote:
      '"He received three opportunities within one week and is building a strong reading habit."',
    avatar: 'https://lh3.googleusercontent.com/d/1Xyv3uUITPB7NKXKmOGqmYQ7IFrZ6zpHS',
  },
  {
    name: 'Oluwafemi Hamdalah',
    role: 'Pioneer Member',
    result: 'Started seeing visible results from consistency',
    quote: '"Consistency has become a habit, and the results are starting to show."',
    avatar: 'https://lh3.googleusercontent.com/d/1ZD8883KyvaDWiFm8kRzolhtDpArX9_oj',
  },
  {
    name: 'Bello Hafsaw Abimbola',
    role: 'Pioneer Member',
    result: 'Recognized the responsibility that comes with success',
    quote: '"I now understand that success is a responsibility I must own."',
    avatar: 'https://lh3.googleusercontent.com/d/13AeaIJZvwkwDb8wud_bV85NnEhc6U2l_',
  },
  {
    name: 'Lammy Ajibola',
    role: 'Pioneer Member',
    result: 'Stopped procrastination and started executing',
    quote: '"The shift from planning to doing has been the biggest game-changer for me."',
    avatar: 'https://lh3.googleusercontent.com/d/1Vb3_PBTQo8PaU4fvNm__mxDhyKpw8hiG',
  },
  {
    name: 'Kareem Maryam Adenike',
    role: 'Pioneer Member',
    result: 'Improved self-presentation and mindset',
    quote: '"I am carrying myself differently, with the confidence of the person I am becoming."',
    avatar: 'https://lh3.googleusercontent.com/d/1UtRXMIPT8sIkf5nbPVYMCxvNNjB1IIzK',
  },
  {
    name: 'Hafsah Abudu Titilope',
    role: 'Pioneer Member',
    result: 'Focusing on building an empire',
    quote: '"My vision has expanded; I am no longer settling for small wins."',
    avatar: 'https://lh3.googleusercontent.com/d/1ZKNblZh4gja3873Hxz3YOJFVbx_ITwk2',
  },
  {
    name: 'Takbirah Morenikeji Mayale-Eke',
    role: 'Pioneer Member',
    result: 'Shifted mindset on luck vs success',
    quote: '"I now know that success is built, not stumbled upon by luck."',
    avatar: 'https://lh3.googleusercontent.com/d/1ROYy1MerlHp_ZxaW3e727LQ55Rm7_pMA',
  },
  {
    name: 'Sulayman Rabiu Suleiman',
    role: 'Pioneer Member',
    result: 'Daily habits transformed',
    quote: '"The reading is showing up in my habits, my work, and my presence."',
    avatar: 'https://lh3.googleusercontent.com/d/12iKcyh_G3kIzdx5KEKLQOTbhEZRYgFAb',
  },
  {
    name: 'Kamil Agboola',
    role: 'Pioneer Member',
    result: 'Applying lessons to multiple areas of life',
    quote: '"From the gym to my career, the principles of Amor Fati are being applied."',
    avatar: 'https://lh3.googleusercontent.com/d/1leGanjVILBRjByM-qXzJfJl7-at07fOy',
  },
  {
    name: 'Sanny Rizqiyyah Ochuwa',
    role: 'Pioneer Member',
    result: 'More confident and taking responsibility',
    quote: '"I carry myself with more confidence and own every situation in my life."',
    avatar: 'https://lh3.googleusercontent.com/d/1B3WIQwZtDKHrah7M5VIUkdDzfNW0IVQB',
  },
  {
    name: 'Oriowo Soburoh Opeyemi',
    role: 'Pioneer Member',
    result: 'Posting business content regularly',
    quote: '"Extraordinary results demand extraordinary effort, and I am putting in the work."',
    avatar: 'https://lh3.googleusercontent.com/d/1Az6EKHDPU8vxY67M3dzk6XtSy0-lTvo5',
  },
  {
    name: 'Njika Peace Chidera',
    role: 'Pioneer Member',
    result: 'Content producing visible results',
    quote: '"My Substack is growing, and I am preparing to launch my first book."',
    avatar: 'https://lh3.googleusercontent.com/d/1g-9CEJ4OBu3N_WZCe1xP65Uy7uL8s3H_',
  },
  {
    name: 'Daodu Semilore',
    role: 'Pioneer Member',
    result: 'Focused on taking action',
    quote: '"I used to play it safe, but now I focus on execution over planning."',
    avatar: 'https://lh3.googleusercontent.com/d/1IsWqWeh4p6B0gjba7s5M0491ppFNSJdD',
  },
  {
    name: 'Obanla Goodness Abisola',
    role: 'Pioneer Member',
    result: 'Stopped comparing herself to others',
    quote: '"I am staying in my own lane and focusing on my own growth."',
    avatar: 'https://lh3.googleusercontent.com/d/1vs7E_0_np3WVcNdri7Y9MVLpVvkJr0z2',
  },
  {
    name: 'Dadel Joy',
    role: 'Pioneer Member',
    result: 'Transformation in mindset',
    quote: '"The way I look at my challenges has completely shifted."',
    avatar: 'https://lh3.googleusercontent.com/d/1gcAvgV7zemxt6c7F_A07I50cUZgIunZ6',
  },
  {
    name: 'Favourite Jome',
    role: 'Pioneer Member',
    result: 'Increased output through consistency',
    quote: '"Showing up every day has changed my trajectory."',
    avatar: 'https://lh3.googleusercontent.com/d/1WXDi6FAgnjKUFUkv07Zq9V9fvm6TnTut',
  },
  {
    name: 'Paris Desire Deme',
    role: 'Pioneer Member',
    result: 'Changed self-presentation',
    quote: '"The person I see in the mirror matches the success I am building."',
    avatar: 'https://lh3.googleusercontent.com/d/1VFbE6PCMm9NpELR4ADF3QnZeBXQ7i1pN',
  },
  {
    name: 'Isah Abdul',
    role: 'Pioneer Member',
    result: 'Built strong reading habits',
    quote: '"I am finally reading with intention and implementation."',
    avatar: 'https://lh3.googleusercontent.com/d/1coKNv9ScTl0gIhYTFl0pvObr5mOM0Ow4',
  },
  {
    name: 'Namaba Ndazhaga',
    role: 'Pioneer Member',
    result: 'Shifted mindset on success',
    quote: '"Success is something you take responsibility for."',
    avatar: 'https://lh3.googleusercontent.com/d/1fKmv2afuv7V0HK3w-2CKP4enKcJi45lx',
  },
  {
    name: 'Abibat Abike Ashiru',
    role: 'Pioneer Member',
    result: 'Increased personal standards',
    quote: '"My standards have shifted, and my life is reflecting that."',
    avatar: 'https://lh3.googleusercontent.com/d/1gxDnnztbiXOsjVZQYG4BKZYZmzqrAMp8',
  },
  {
    name: 'Adepoju Hakeemah.',
    role: 'Pioneer Member',
    result: 'Taking massive action',
    quote: '"Action is the only thing that produces the results I want."',
    avatar: 'https://lh3.googleusercontent.com/d/1hT_9vLFfDxg_erdj8uuDpu-TymqrNY51',
  },
  {
    name: 'Oluwasola Jude',
    role: 'Pioneer Member',
    result: 'Rebuilt morning routines',
    quote: '"My mornings are now focused on output and intention."',
    avatar: 'https://lh3.googleusercontent.com/d/1680Y_h5eTeJ2Ajmj2CWsfi8uo0MFXCbC',
  },
];

export const bookClubMemberStrip = [
  `${SUPABASE_GENERAL_BASE}/DL8A8591_mjfng7.jpg`,
  `${SUPABASE_GENERAL_BASE}/DL8A8602_vpk09z.jpg`,
  `${SUPABASE_GENERAL_BASE}/DL8A8614_gyq9ym.jpg`,
  `${SUPABASE_GENERAL_BASE}/DL8A8604_dodldz.jpg`,
];
