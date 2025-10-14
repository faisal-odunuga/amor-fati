import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

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
