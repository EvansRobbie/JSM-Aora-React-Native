import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
  const initialValues = {
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  };
  const [form, setForm] = useState(initialValues);
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectType: 'image' | 'video') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  const onSubmit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert('Please fill in all the fields');
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setForm(initialValues);
      setUploading(false);
    }
  };
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
            <TouchableOpacity onPress={() => openPicker('video')}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className='w-full h-64 rounded-2xl'
                  resizeMode={ResizeMode.COVER}
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
            <TouchableOpacity onPress={() => openPicker('image')}>
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
            handleChangeText={(e) => setForm({ ...form, prompt: e })}
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
