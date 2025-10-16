import { GraduationCap, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const faq = [
  {
    question: 'How do I book a 1:1 coaching session?',
    answer:
      "Use the contact form above and include your goals and availability. I'll reply with available times and next steps.",
  },
  {
    question: 'Do you offer group coaching or masterclasses?',
    answer:
      'Yes! The Overconfidence 101 Masterclass is available for teams, schools, and organizations. Reach out to discuss details.',
  },
  {
    question: "What's the best way to stay updated on events?",
    answer:
      'Subscribe to the newsletter on the Journal page to be first to know about upcoming retreats and events.',
  },
  {
    question: 'Are your services available internationally?',
    answer:
      '1:1 coaching is available worldwide via video call. In-person events are currently Lagos-based, with plans to expand.',
  },
];

export const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'amorfatihq@gmail.com',
    type: 'email',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+234 906 1447 022',
    type: 'phone',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    value: '@amorfati.hq',
    link: 'https://www.instagram.com/amorfati.hq/',
    type: 'social',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: '@muhammad-sheriff-2b9957193',
    link: 'https://www.linkedin.com/in/muhammad-sheriff-2b9957193/',
    type: 'social',
  },
];

export const formFields = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Your full name',
    type: 'text',
    required: true,
    component: 'input',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
    type: 'email',
    required: true,
    component: 'input',
  },
  {
    id: 'subject',
    name: 'subject',
    label: 'Subject',
    placeholder: "What's this about?",
    type: 'text',
    required: true,
    component: 'input',
  },
  {
    id: 'message',
    name: 'message',
    label: 'Message',
    placeholder: 'Tell me more...',
    required: true,
    component: 'textarea',
    rows: 6,
  },
];

export const freeResources = [
  {
    id: 1,
    name: '(HARD COPY) 11 Letters I Wrote, but never sent',
    description: `A hard copy of my book, 11 Letters I Wrote, but never sent: Don't pick be both RICH and HAPPY - Screw the OR.`,
    price: '₦11,500',
    image: '/11-letters-i-wrote-hard-copy.jpeg',
    link: 'https://selar.com/11LETTERSBOOK',
  },
  {
    id: 2,
    name: '(PDF E-BOOK) 11 Letters I Wrote, but never sent',
    description: `A soft copy of my book, 11 Letters I Wrote, but never sent: Don't pick be both RICH and HAPPY - Screw the OR.`,
    price: '₦7,500',
    image: '/11-letters-i-wrote-soft-copy.jpeg',
    link: 'https://selar.com/11letterspdf',
  },
];

export const articles = [
  {
    title: 'The Art of Loving Your Fate',
    excerpt:
      "Amor Fati isn't about passive acceptance. It's about active engagement with reality and finding power in every circumstance.",
    date: 'March 15, 2024',
    readTime: '5 min read',
    slug: 'art-of-loving-your-fate',
  },
  {
    title: 'Why Overconfidence is Underrated',
    excerpt:
      'Society tells us to be humble. But what if a little overconfidence is exactly what you need to break through your limitations?',
    date: 'March 8, 2024',
    readTime: '7 min read',
    slug: 'overconfidence-underrated',
  },
  {
    title: 'Creating a Life Worth Reliving',
    excerpt:
      "If you could relive your life exactly as it is, would you? This thought experiment reveals everything about how you're living now.",
    date: 'March 1, 2024',
    readTime: '6 min read',
    slug: 'life-worth-reliving',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: '/images/sarah.jpg',
    title: 'Creative Coach',
    quote:
      'The 11 Letters completely changed how I approach my thoughts. It’s like I rewired my mindset from within.',
  },
  {
    id: 2,
    name: 'Daniel Adeyemi',
    image: '/images/daniel.jpg',
    title: 'Entrepreneur',
    quote:
      'The 21-Day Audio Experience grounded me mentally and helped me handle challenges with clarity and calm.',
  },
  {
    id: 3,
    name: 'Amara O.',
    image: '/images/amara.jpg',
    title: 'Writer',
    quote:
      'Every session felt like peeling off a mental layer. It’s deep, practical, and beautifully structured.',
  },
];

export const courses = [
  {
    title: 'Overconfidence 101',
    description:
      'Master the art of unshakeable confidence. Learn to eliminate limiting beliefs and build authentic self-assurance.',
    duration: '6 weeks',
    modules: '12 modules',
    icon: GraduationCap,
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Mental Mastery Blueprint',
    description:
      'Transform your mindset and unlock peak performance. A comprehensive course on mental resilience and clarity.',
    duration: '8 weeks',
    modules: '16 modules',
    icon: GraduationCap,
    color: 'bg-primary/10 text-primary',
  },
];
