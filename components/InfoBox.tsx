import { View, Text } from 'react-native';
import React, { FC } from 'react';

interface infoProps {
  title: string;
  containerStyles?: string;
  titleStyles: string;
  subTitle?: string;
}

const InfoBox: FC<infoProps> = ({
  title,
  containerStyles,
  titleStyles,
  subTitle,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>
        {subTitle}
      </Text>
    </View>
  );
};

export default InfoBox;
