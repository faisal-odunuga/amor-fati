import {
  BookOpen,
  CheckCircle,
  Clock,
  Flame,
  Globe,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export const JOIN_URL = 'https://hubs.nestuge.com/amorfatibookclub/community';

export const SUPABASE_GENERAL_BASE =
  process.env.NEXT_PUBLIC_SUPABASE_GENERAL_BASE ??
  'https://oufksmargaiutcykyjne.supabase.co/storage/v1/object/public/general';

export const bookClubStats = [
  { number: '500+', label: 'Active Members' },
  { number: '12+', label: 'Books Completed' },
  { number: '92%', label: 'Finish the Monthly Read' },
];

export const bookClubMissingOut = [
  "Monthly books that have already changed members' careers and relationships",
  'Live discussions with people who actually finish what they start',
  'Accountability systems that make "I meant to read that" impossible',
  'A curated network of ambitious, growth-focused individuals',
  "Moh's personal notes, highlights, and commentary on every book",
  'Early access to Amor Fati events, programmes, and offers',
];

export const bookClubBenefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BookOpen,
    title: 'Curated Monthly Reads',
    description:
      'No more wasting hours choosing what to read. Each month Moh selects one high-impact book that directly upgrades your thinking, career, or relationships.',
  },
  {
    icon: MessageSquare,
    title: 'Deep Group Discussions',
    description:
      "Go beyond the surface. Weekly discussion sessions where members break down key ideas, challenge each other, and extract real insight you won't find in a YouTube summary.",
  },
  {
    icon: Flame,
    title: 'Accountability & Momentum',
    description:
      'Reading alone is easy to quit. The club keeps you consistent — weekly check-ins, reading milestones, and a community that notices when you go quiet.',
  },
  {
    icon: Users,
    title: 'A Network That Thinks',
    description:
      'Your network determines your net worth. Surround yourself with curious, growth-oriented people who are actively investing in themselves — not just talking about it.',
  },
  {
    icon: TrendingUp,
    title: 'Applied Wisdom, Not Theory',
    description:
      'Every book ends with a challenge: implement one idea in the next 7 days. Members share results, breakthroughs, and lessons. This is a doing community.',
  },
  {
    icon: Zap,
    title: 'Direct Access to Moh',
    description:
      'Exclusive Q&A sessions and voice note drops from Moh himself — his raw take on the book, how he applied it, and what he wants you to take away.',
  },
];

export const bookClubSteps: { step: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    step: '01',
    icon: Globe,
    title: 'Join the Club',
    desc: 'Click the button. Complete the join process. Access details are shared after membership is confirmed.',
  },
  {
    step: '02',
    icon: BookOpen,
    title: 'Get the Monthly Pick',
    desc: 'Moh announces the book on the 1st of each month with his personal context on why this book, why now.',
  },
  {
    step: '03',
    icon: Clock,
    title: 'Read & Reflect',
    desc: 'Read at your own pace. Weekly prompts keep you on track. Struggle? The group has you.',
  },
  {
    step: '04',
    icon: Flame,
    title: 'Apply & Share',
    desc: 'The 7-day challenge at the end of each book. Implement one idea. Share your result. Watch yourself compound.',
  },
];

export const bookClubStories = [
  {
    name: 'Tobi A.',
    role: 'Sales Executive, Lagos',
    result: 'Closed ₦4M deal after applying negotiation principles from our March read',
    quote:
      '"I joined thinking it was just a reading group. Three months in, I used frameworks from one of our books to structure a pitch that landed my biggest deal ever. Moh\'s breakdown of the chapter on influence was the game-changer."',
    avatar: `${SUPABASE_GENERAL_BASE}/DL8A8602_vpk09z.jpg`,
  },
  {
    name: 'Chisom O.',
    role: 'Product Designer',
    result: 'Launched her first digital product within 60 days of joining',
    quote:
      '"I had the idea for over a year. The book club read The War of Art in February and something clicked during our discussion. I shipped my product 8 weeks later. The accountability in this group is unlike anything I\'ve experienced."',
    avatar: `${SUPABASE_GENERAL_BASE}/DL8A8614_gyq9ym.jpg`,
  },
  {
    name: 'Emeka R.',
    role: 'Entrepreneur',
    result: 'Rebuilt his morning routine and doubled his productive output',
    quote:
      '"The club made me realise I was consuming content but not applying any of it. The 7-day challenge format forced me to actually use what I read. My mornings are completely different now and I\'m getting more done before 10am than I used to in a full day."',
    avatar: `${SUPABASE_GENERAL_BASE}/DL8A8604_dodldz.jpg`,
  },
];

export const bookClubMemberStrip = [
  `${SUPABASE_GENERAL_BASE}/DL8A8591_mjfng7.jpg`,
  `${SUPABASE_GENERAL_BASE}/DL8A8602_vpk09z.jpg`,
  `${SUPABASE_GENERAL_BASE}/DL8A8614_gyq9ym.jpg`,
  `${SUPABASE_GENERAL_BASE}/DL8A8604_dodldz.jpg`,
];
