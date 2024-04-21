import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface customButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
}
const CustomButton = ({
  title,
  handlePress,
  textStyles,
  containerStyles,
  isLoading,
}: customButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} disabled:opacity-50`}
    >
      <Text className={`${textStyles} text-primary font-psemibold text-lg`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
