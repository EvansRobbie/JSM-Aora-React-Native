import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPost, getLatestVideos, searchPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

export interface postProps {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, loading, refetch } = useAppwrite(( )=> searchPosts(query as string));
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item: { $id: string }) => item.$id}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 '>
            <Text className='text-gray-100 font-pmedium text-sm '>
              Search Results
            </Text>
            <Text className='text-white text-2xl text-psemibold'>{query}</Text>
              <View className='mt-6 mb-8'>
            <SearchInput initialQuery={query} />

              </View>
          </View>
        )}
        renderItem={({ item }: ListRenderItemInfo<postProps>) => (
          <VideoCard video={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No video found for this search query'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
