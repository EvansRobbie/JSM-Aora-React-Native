import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';

import * as Animatable from 'react-native-animatable';
import { postProps } from '../app/(tabs)/home';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: postProps;
  item: postProps;
}) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View
      className='mr-5'
      // @ts-ignore
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(playbackStatus)=>{
            // @ts-ignore
            if(playbackStatus.didFinishPlay){
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className=' justify-center items-center'
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 my-5 overflow-hidden rounded-[35px] shadow-lg shadow-black/40 '
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute '
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ trending }) => {
  const [activeItem, setActiveItem] = useState<postProps | null>(trending[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={trending}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }: ListRenderItemInfo<postProps>) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
