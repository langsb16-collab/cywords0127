
export type RelationshipLevel = 'Ilchon' | 'MemoryFriend' | 'LifeFriend' | 'Family';

export interface UserProfile {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
  mood: string;
  dotori: number;
  bgm: string;
  status: 'online' | 'away' | 'offline';
  relationshipDepth: number;
}

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
  aiSummary: string;
  sentimentTag: string;
  isPrivate: boolean;
}

export interface FeedItem {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
  type: 'diary' | 'photo' | 'video' | 'club';
  likes: number;
  comments: number;
}

export interface MemoryItem {
  id: string;
  year: string;
  author: string;
  content: string;
  type: RelationshipLevel;
  icon?: string;
  image?: string;
  subText?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  category: 'skin' | 'bgm' | 'item' | 'ai';
  icon: string;
}

export interface AlumniGroup {
  id: string;
  name: string;
  schoolName: string;
  gradYear: string;
  classNumber?: string;
  memberCount: number;
  recentActivity: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  time: string;
  type: 'text' | 'image' | 'system';
}

export interface FaceMatchCandidate {
  id: string;
  name: string;
  schoolInfo: string;
  similarity: number;
  oldPhoto: string;
  currentPhoto: string;
}

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  mood: string;
}
