import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import type { Developer } from '@/types/developer';

export function useDevelopers() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const developersRef = ref(db, 'developers');
    
    const unsubscribe = onValue(developersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const developersArray = Object.entries(data).map(([id, dev]: [string, any]) => ({
            id,
            name: dev.name,
            avatar: dev.avatar || "https://i.pravatar.cc/150",
            title: dev.title || "Developer",
            description: dev.description || "",
            hourlyRate: dev.hourlyRate || 0,
            skills: dev.skills || [],
            status: dev.status || "offline"
          }));
          setDevelopers(developersArray);
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch developers'));
        setLoading(false);
      }
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { developers, loading, error };
}