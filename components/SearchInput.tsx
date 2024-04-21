import React, { useState } from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

interface SearchInputProps {
  handleChangeText: (e: any) => void;
  keyboardType?: string;
  placeholder?: string;
  value: string;
}

const SearchInput = ({initialQuery}:{initialQuery?: string | string[]}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string>(initialQuery as string || '');

  return (
    <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl space-x-4 focus:border-secondary flex-row items-center'>
      <TextInput
        className='flex-1 text-white font-pregular mt-0.5 text-base'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor={'#CDCDE0'}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database'
            );
          }
          if (pathname.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
