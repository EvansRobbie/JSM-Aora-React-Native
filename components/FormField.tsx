import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants';

interface FormFieldProps {
  title: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
  keyboardType?: string;
  placeholder?: string;
  value: any;
}

const FormField = ({
  title,
  handleChangeText,
  keyboardType,
  otherStyles,
  value,
  placeholder,
  ...props
}: FormFieldProps) => {
 
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className={` ${otherStyles} space-y-2`}>
      <Text className='text-base text-gray-100'>{title}</Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
