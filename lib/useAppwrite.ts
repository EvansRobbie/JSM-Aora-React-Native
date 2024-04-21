import { useEffect, useState } from 'react';
import { getAllPost } from './appwrite';
import { Alert } from 'react-native';

type FetchDataFunction<T> = () => Promise<T[]>;

export const useAppwrite = <T>(
  fn: FetchDataFunction<T>
): { data: T[] | null; loading: boolean; refetch:()=> void } => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchPosts();
  useEffect(() => {
    fetchPosts();
  }, []);

  return {data, loading, refetch};
};
