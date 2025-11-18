
export type View =
  | 'home'
  | 'storyDetail'
  | 'reader'
  | 'library'
  | 'ranking'
  | 'community'
  | 'communityPostDetail'
  | 'quests'
  | 'coinShop'
  | 'payment'
  | 'store'
  | 'news'
  | 'advancedSearch'
  | 'authorDashboard'
  | 'editStory'
  | 'postStory'
  | 'authorSettings'
  | 'profile'
  | 'history'
  | 'following';

export interface User {
  id: string;
  username: string;
  isAuthor: boolean;
  authorApplicationStatus: 'none' | 'pending' | 'approved' | 'rejected';
  coins: number;
  revenue: number; // Doanh thu (VND) có thể rút
  readingStreak: number;
  quests: Quest[];
  lastRead?: {
    novelId: string;
    chapterId: string;
    progress: number; // Percentage 0-100
  };
  collections: Collection[];
  favoriteGenres?: string[];
  unlockedChapterIds: string[];
  unlockedAiContentIds: string[]; // IDs of chapters where AI content is unlocked
  aiCredits: number;
  likedReplyIds?: string[];
}

export interface Collection {
    id: string;
    name: string;
    novelIds: string[];
}

export interface Quest {
  id: string;
  description: string;
  goal: number;
  currentProgress: number;
  rewardXp: number;
  rewardCoins: number;
  isCompleted: boolean;
  type: 'daily' | 'weekly';
}

export interface Novel {
  id:string;
  title: string;
  author: string;
  authorId: string;
  summary: string;
  coverImage: string;
  genre: string[];
  tags: string[];
  status: 'Đang tiến hành' | 'Hoàn thành';
  chapters: Chapter[];
  reviews: Review[];
  stats: NovelStats;
  createdAt: string;
  fanArt: FanArt[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  isVip: boolean;
  chapterNumber: number;
  aiComicImages?: string[];
  aiClipUrl?: string;
  aiContentPrice?: number; // Price to view AI content (0 = free)
  aiStats?: {
      views: number;
      likes: number;
  }
}

export interface Review {
  id:string;
  author: string;
  rating: number; // 1-5
  comment: string;
  isSpoiler: boolean;
  voteType?: 'recommend' | 'critique'; // Added vote type
}

export interface NovelStats {
  views: number;
  likes: number;
  bookmarks: number;
}

export interface CommunityReply {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: CommunityReply[];
}

export interface CoinPackage {
    id: string;
    amount: number;
    bonus: number;
    price: number; // in VND
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    category: 'Cập nhật' | 'Sự kiện' | 'Thông báo';
    publishedAt: string;
}

export type AIConversionStatus = 'pending' | 'processing' | 'preview' | 'editing' | 'rendering' | 'completed' | 'failed' | 'cancelled';

export interface AIConversionRequest {
    id: string;
    novelId: string;
    chapterId: string;
    chapterTitle: string;
    type: 'comic' | 'clip';
    style: string;
    quality: '720p' | '1000p';
    prompt?: string; // Additional prompt from author
    negativePrompt?: string; // What to exclude
    aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
    creativityLevel?: number; // 0-100
    status: AIConversionStatus;
    createdAt: string;
    updatedAt: string;
    resultImages?: string[];
    resultVideoUrl?: string;
    editNotes?: string;
}

export type NovelSortOption = 'newest' | 'most_viewed' | 'most_liked';

export interface FanArt {
    id: string;
    imageUrl: string;
    author: string;
    likes: number;
}

export interface Gift {
  id: string;
  name: string;
  icon: string; // Icon name from Icon.tsx
  price: number;
}

export interface Transaction {
    id: string;
    type: 'income_gift' | 'income_vip' | 'withdrawal' | 'income_ai';
    amount: number; // VND
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}