import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppwrite';
import { postProps } from './home';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item: { $id: string }) => item.$id}
        ListHeaderComponent={() => (
          <View className='w-full  mt-6 mb-12 px-4 items-center justify-center '>
            <TouchableOpacity
              onPress={logout}
              className='w-full items-end mb-10'
            >
              <Image
                source={icons.logout}
                className='w-6 h-6'
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
                source={{ uri: user?.avatar }}
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className='mt-5 flex-row'>
              <InfoBox
                title={(`${posts?.length}` || 0).toString()}
                subTitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox
                title={'2.5k'}
                subTitle='Followers'
                titleStyles='text-xl'
              />
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

export default Profile;
