export type Role = 'user' | 'admin' | 'accountant' | 'secretary' | 'chairman';

export type ApplicationStatus = 'Pending Accountant' | 'Pending Secretary' | 'Pending Chairman' | 'Approved' | 'Rejected' | 'Pending';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
  avatarUrl?: string;
  phone?: string;
  address?: string;
}

export interface ServiceApplication {
  id: string;
  userId: string;
  serviceType: string;
  requestedAmount: number;
  purpose: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  imageUrl?: string;
  venue?: string;
  meetingDate?: string;
  meetingTime?: string;
  agenda?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'Ongoing' | 'Completed';
}

export interface AppState {
  users: User[];
  applications: ServiceApplication[];
  news: NewsItem[];
  projects: Project[];
}
