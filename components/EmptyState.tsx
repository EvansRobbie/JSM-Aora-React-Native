import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { images } from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
      <Text className='text-gray-100 text-xl font-psemibold'>{title}</Text>
      <Text className='text-white text-sm mt-2 text-center font-pmedium'>
        {subtitle}
      </Text>

      <CustomButton
        title='Create Video'
        handlePress={() => router.push('/create')}
        containerStyles='w-full my-5'
      />
    </View>
  );
};

export default EmptyState;
