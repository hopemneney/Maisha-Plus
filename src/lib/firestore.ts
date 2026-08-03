import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy, addDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { User, ServiceApplication, NewsItem, Project } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'users');
      return [];
    }
  },
  getUser: async (id: string): Promise<User | null> => {
    try {
      const docRef = doc(db, 'users', id);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as User) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${id}`);
      return null;
    }
  },
  addUser: async (user: User) => {
    try {
      const { id, ...data } = user;
      await setDoc(doc(db, 'users', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.id}`);
    }
  },
  updateUser: async (id: string, updates: Partial<User>) => {
    try {
      await updateDoc(doc(db, 'users', id), updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${id}`);
    }
  },
  deleteUser: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${id}`);
    }
  },
  getApplications: async (): Promise<ServiceApplication[]> => {
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceApplication));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'applications');
      return [];
    }
  },
  getUserApplications: async (userId: string): Promise<ServiceApplication[]> => {
    try {
      const q = query(collection(db, 'applications'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceApplication));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `applications?userId=${userId}`);
      return [];
    }
  },
  addApplication: async (app: ServiceApplication) => {
    try {
      const { id, ...data } = app;
      await setDoc(doc(db, 'applications', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `applications/${app.id}`);
    }
  },
  updateApplicationStatus: async (id: string, status: ServiceApplication['status']) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status, updatedAt: new Date().toISOString() });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `applications/${id}`);
    }
  },
  getNews: async (): Promise<NewsItem[]> => {
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'news');
      return [];
    }
  },
  addNews: async (news: NewsItem) => {
    try {
      const { id, ...data } = news;
      await setDoc(doc(db, 'news', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `news/${news.id}`);
    }
  },
  updateNews: async (id: string, updates: Partial<NewsItem>) => {
    try {
      await updateDoc(doc(db, 'news', id), updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `news/${id}`);
    }
  },
  deleteNews: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  },
  getProjects: async (): Promise<Project[]> => {
    try {
      const q = query(collection(db, 'projects'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'projects');
      return [];
    }
  }
};
