import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import { searchPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppwrite';

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
  const {
    data: posts,
    loading,
    refetch,
  } = useAppwrite(() => searchPosts(query as string));
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
