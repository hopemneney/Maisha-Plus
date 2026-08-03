import { useState, useEffect } from 'react';
import { dbApi } from './firestore';
import { ServiceApplication, NewsItem, Project, User } from '../types';
import { useAuth } from './auth';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbApi.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return { projects, loading, setProjects };
}

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbApi.getNews().then(data => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  return { news, loading, setNews };
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbApi.getUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return { users, loading, setUsers };
}

export function useApplications() {
  const [applications, setApplications] = useState<ServiceApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbApi.getApplications().then(data => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  return { applications, loading, setApplications };
}

export function useUserApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ServiceApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      dbApi.getUserApplications(user.id).then(data => {
        setApplications(data);
        setLoading(false);
      });
    }
  }, [user?.id]);

  return { applications, loading, setApplications };
}
