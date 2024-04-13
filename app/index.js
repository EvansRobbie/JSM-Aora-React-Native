import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className=' font-pblack text-3xl'>Aora.</Text>
      <StatusBar style='auto' />
      <Link href={'/profile'} style={{ color: 'blue' }}>
        Go to Profiles
      </Link>
    </View>
  );
}
