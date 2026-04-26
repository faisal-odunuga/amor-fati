import { z } from 'zod';

export const scheduleItemTypeSchema = z.enum(['reading', 'catchup', 'implementation', 'event']);

export type ScheduleItemType = z.infer<typeof scheduleItemTypeSchema>;
export type Role = 'admin' | 'member';
export type SubscriptionStatus = 'active' | 'inactive';
export type TestimonialStatus = 'pending' | 'approved' | 'rejected';

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  pdfUrl: string | null;
  description: string;
  totalPages: number | null;
  totalChapters: number | null;
  readingType: 'chapter' | 'pages' | null;
};

export type ReadingPlan = {
  id: string;
  bookId: string;
  monthDate: string;
  title: string;
  isActive: boolean;
  totalWeight: number;
};

export type ScheduleItem = {
  id: string;
  planId: string;
  date: string;
  dayIndex: number;
  label: string;
  description: string;
  type: ScheduleItemType;
  weight: number;
  createdAt: string;
};

export type DailyLog = {
  id: string;
  profileId: string;
  scheduleItemId: string;
  planId: string;
  nestugeUrl: string;
  logDate: string;
  desc?: string;
  createdAt: string;
};

export type DailyLogWithProfile = DailyLog & {
  profile: {
    fullName: string;
    email: string;
  };
  scheduleItem?: {
    label: string;
    date: string;
  };
};

export type UserProgress = {
  id: string;
  profileId: string;
  planId: string;
  completedDays: number;
  totalWeightCompleted: number;
  lastActiveDate: string | null;
};

export type Streak = {
  profileId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
};

export type LeaderboardEntry = {
  profileId: string;
  fullName: string;
  score: number;
  currentStreak: number;
  completedWeight: number;
};

export type Testimonial = {
  id: string;
  profileId: string;
  planId: string;
  generatedText: string;
  status: TestimonialStatus;
  createdAt: string;
};

export type ResourceAsset = {
  id: string;
  title: string;
  description: string;
  filePath: string;
  mimeType: string;
  isMembersOnly: boolean;
  createdAt: string;
};

export type ScheduleDraftItem = Pick<
  ScheduleItem,
  'date' | 'label' | 'description' | 'type' | 'weight'
> & {
  dayIndex: number;
  book_id?: string;
};

export type AdminAnalytics = {
  completionRate: number;
  activeUsers: number;
  dropOffDays: Array<{
    date: string;
    missCount: number;
  }>;
  mostSkippedItems: Array<{
    scheduleItemId: string;
    label: string;
    missCount: number;
  }>;
};

export const createScheduleDraftSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
  input: z.string(),
  bookId: z.string().uuid(),
  mode: z.enum(['chapters', 'pages']),
  title: z.string().min(3),
});

export const savePlanSchema = z.object({
  bookId: z.string().uuid().optional(),
  monthDate: z.string().date(),
  title: z.string().min(3),
  items: z.array(
    z.object({
      date: z.string().date(),
      dayIndex: z.number().int().nonnegative(),
      label: z.string().min(1),
      description: z.string().min(1),
      type: scheduleItemTypeSchema,
      weight: z.number().positive(),
    }),
  ),
});

export const createDailyLogSchema = z.object({
  scheduleItemId: z.string().uuid(),
  planId: z.string().uuid(),
  nestugeUrl: z.string().url(),
  desc: z.string().optional(),
});
