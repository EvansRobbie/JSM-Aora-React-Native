import { Link, router } from 'expo-router';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    if(!form.email || !form.username || ! form.password){
      Alert.alert("Error", "Please fill in all the fields")
      return
    }
    setIsSubmitting(true)
    try {
        const result = await  createUser(form.email, form.password, form.username)
        setUser(result)
        setIsLoggedIn(true)
        router.replace('/home')

    }catch(e:any){
      Alert.alert('Error', e.message)
    }finally{
      setIsSubmitting(false)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='h-full'
    >
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className='w-full justify-center min-h-[85dvh] px-4 my-6'>
            <Image
              source={images.logo}
              className='w-[115px] h-[35px]'
              resizeMode='contain'
            />
            <Text className='text-2xl text-white font-psemibold mt-10'>
              Sign up to Aora
            </Text>
            <FormField
             title="Username"
             value={form.username}
             handleChangeText={(e) => setForm({ ...form, username: e })}
             otherStyles="mt-10"
            />
            <FormField
              title={'Email'}
              value={form.email}
              handleChangeText={(e: any) => setForm({ ...form, email: e})}
              otherStyles='mt-7'
              keyboardType={'email-address'}
            />
            <FormField
              title={'Password'}
              value={form.password}
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
              otherStyles='mt-7'
            />

            <CustomButton
              title='Sign Up'
              handlePress={onSubmit}
              containerStyles='mt-7'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular'>
                Already have an account?
              </Text>
              <Link
                href={'/sign-in'}
                className='text-lg text-secondary font-psemibold'
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
