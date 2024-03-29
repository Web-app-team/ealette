import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppIntroSlider from '../components/IntroSlider/index';

interface IRecipeProps {
  route?: any;
}

const IntroScreen: React.FC<IRecipeProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const restaurants = route.params.getPosAndRest;
  const userLoc = route.params.userLoc;

  const slides = [
    {
      key: 1,
      title: 'ルーレットを回す',
      text: '隙間時間にルーレットを回し、\n本日のランチを決めましょう！\nealetteなら5秒で決めることができます!',
      image: require('../assets/tutorial_1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'お店を選ぶ',
      text: 'ルーレットで決まったジャンルのお店が表示されます。\nピンをタップしてお店の詳細をチェック！',
      image: require('../assets/tutorial_2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'ランチを楽しむ！',
      text: 'まだ出会ったことのない 料理と出会い\nランチを楽しみましょう！',
      image: require('../assets/tutorial_3.png'),
      backgroundColor: '#22bcb5',
    },
  ];

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.screen}>
        <Image source={item.image} />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.welcome}>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={() =>
        navigation.navigate('Home', {
          propsRestaurants: restaurants,
          userLoc: userLoc,
        })
      }
      bottomButton={true}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
  },

  welcome: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 40,
  },
});

export default IntroScreen;
