import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { postProps } from '../app/(tabs)/home';
import { icons } from '../constants';

interface VideoCardProps {
  video: postProps;
}

const VideoCard: FC<VideoCardProps> = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold text-sm'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className='text-sm text-gray-100 font-pregular'>
              {username}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default VideoCard;
