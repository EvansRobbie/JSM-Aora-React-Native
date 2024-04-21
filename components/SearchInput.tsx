import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants';

interface SearchInputProps {
  handleChangeText: (e: any) => void;
  keyboardType?: string;
  placeholder?: string;
  value: string;
}

const SearchInput = ({
  handleChangeText,
  keyboardType,
  value,
  placeholder,
  ...props
}: SearchInputProps) => {
 
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
   
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl space-x-4 focus:border-secondary flex-row items-center'>
        <TextInput
          className='flex-1 text-white font-pregular mt-0.5 text-base'
          value={value}
          placeholder="Search for a video topic"
          placeholderTextColor={'#7b7b8b'}
          onChangeText={handleChangeText}
        />
       
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={icons.search}
              className='w-5 h-5'
              resizeMode='contain'
            />
          </TouchableOpacity>
       
      </View>
  
  );
};

export default SearchInput;
