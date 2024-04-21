import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { useHeaderHeight } from '@react-navigation/elements';

const Create = () => {
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const [uploading, setUploading] = useState(false);

  const onSubmit = () => {};
  const height = useHeaderHeight();
  return (
    <SafeAreaView className='bg-primary h-full flex-1'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        className='h-full  '
      >
        <ScrollView className='px-4 my-6'>
          <Text className='text-xl text-white font-psemibold'>
            Upload Video
          </Text>
          <FormField
            title='Video Title'
            value={form.title}
            placeholder='Give your video a catchy title...'
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles='mt-10'
          />
          <View className=' mt-7 space-y-2'>
            <Text className='text-base text-gray-100 font-pmedium'>
              Upload Video
            </Text>
            <TouchableOpacity>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className='w-full h-64 rounded-2xl'
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View className='w-full h-40 px-4 bg-black-100 items-center justify-center rounded-2xl'>
                  <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      className='h-1/2 w-1/2'
                      resizeMode='contain'
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className='mt-7 space-y-2 '>
            <Text className='text-base text-gray-100 font-pmedium'>
              Thumbnail Image
            </Text>
            <TouchableOpacity>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  className='w-full h-64 rounded-2xl'
                  resizeMode={'contain'}
                />
              ) : (
                <View className='w-full h-16 border border-black-200 space-x-2 flex-row px-4 bg-black-100 items-center justify-center rounded-2xl'>
                  <Image
                    source={icons.upload}
                    className='h-5 w-5'
                    resizeMode='contain'
                  />
                  <Text className=' font-pmedium text-sm text-gray-100'>
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <FormField
            title='AI Prompt'
            value={form.prompt}
            placeholder='Prompt use to create this video...'
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles='mt-10'
          />

          <CustomButton
            title='Submit & Publish'
            handlePress={onSubmit}
            containerStyles='mt-7'
            isLoading={uploading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
