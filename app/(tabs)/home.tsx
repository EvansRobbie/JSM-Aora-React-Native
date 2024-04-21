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
import { getAllPost, getLatestVideos } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

export interface postProps {
  $id: string;
  title: string;
  thumbnail: string;
  avatar:string
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

const Home = () => {
  const { data: posts, loading, refetch } = useAppwrite(getAllPost);
  const { data: latestVideos } = useAppwrite(getLatestVideos);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    await refetch();
    setRefreshing(true);
    //re call videos
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item: { $id: string }) => item.$id}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-gray-100 font-pmedium text-sm '>
                  Welcome Back
                </Text>
                <Text className='text-white'>{user?.username}</Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput/>
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>
              <Trending trending={latestVideos ?? []} />
            </View>
          </View>
        )}
        renderItem={({ item }: ListRenderItemInfo<postProps>) => (
          <VideoCard video={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload a video.'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
