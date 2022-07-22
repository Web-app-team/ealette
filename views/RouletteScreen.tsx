import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useCallback, useEffect, useState } from 'react';
import FetchRestaurants from './FetchRestaurants';
import * as Location from 'expo-location';
import axios from 'axios';
import SlotMachine from '../components/SlotMachine';

const RouletteScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<
    object | undefined
  >();
  const [latitude, setLatitude] = useState<number | undefined>(
    35.8368658
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    139.6533851
  );
  const [datas, setDatas] = useState([] as any[]);
  const navigation: any = useNavigation();

  const getLocationAsync = async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let userLocation = await Location.getCurrentPositionAsync({});
    setLatitude(userLocation.coords.latitude);
    setLongitude(userLocation.coords.longitude);
    setUserLocation(userLocation.coords);
  };

  const getRestaurants = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
      params: {
        latitude: latitude,
        longitude: longitude,
        limit: '30',
        currency: 'YEN',
        distance: '1',
        open_now: 'true',
        lunit: 'km',
        lang: 'ja_JP',
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key':
          '405bb09151msh2508b0e503caff8p1e2e06jsn7359fd6fb65b',
      },
    };

    const response = await axios.request(options);
    if (response) {
      setDatas(response.data.data);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    getRestaurants().catch(console.error);
  }, [getRestaurants]);

  const result = [
    ...datas
      .reduce((r, { cuisine }) => {
        (cuisine || []).forEach((o: any) => {
          r.has(o.name) || r.set(o.name, { ...o });
          r.get(o.name);
        });

        return r;
      }, new Map())
      .values(),
  ];

  // const restaurantsTypes = result.map(({ type }) => type);
  // console.log(itemList);

  const restaurantsTypes = [
    {
      type: '中華',
    },
    {
      type: 'カフェ・喫茶店',
    },
    {
      type: '和食',
    },
    {
      type: 'イタリアン',
    },
    {
      type: 'アジア料理',
    },
    {
      type: '韓国料理',
    },
    {
      type: 'ヘルシー料理',
    },
    {
      type: 'ファストフード',
    },
    {
      type: '肉料理',
    },
    {
      type: '海鮮料理',
    },
    {
      type: 'スープ',
    },
    {
      type: 'グリル料理',
    },
    {
      type: 'ステーキ',
    },
    {
      type: 'メキシコ料理',
    },
    {
      type: 'イギリス料理',
    },
    {
      type: '寿司',
    },
    {
      type: 'フレンチ',
    },
  ];

  const [activeType, setActiveType] = useState<number>(0);

  const randomType = () => {
    const len = restaurantsTypes.length;
    setActiveType(Math.floor(Math.random() * len));
    console.log(restaurantsTypes[activeType].type);
  };

  return (
    <View style={styles.screen}>
      {/* <AppButton
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      /> */}
      {/* <Text style={styles.header}>ルーレット</Text> */}
      {/* <SlotMachine duration={1000} /> */}
      <View style={styles.roulette}>
        <SlotMachine
          text={restaurantsTypes[activeType].type}
          range="中華料理カフェ・喫茶店和食イタリアンアジア韓国ヘルシーファストフード肉海鮮スープグリルステーキメキシコイギリス寿司フレンチ"
        />
      </View>
      {/* <Text>{restaurantsTypes[activeType].type}</Text> */}
      <View style={styles.buttonsBox}>
        <AppButton
          title="START"
          onPress={randomType}
          borderRadius={100}
          width={100}
          height={100}
          backgroundColor={'white'}
          color="#222222"
        />
      </View>
      {/* <FetchRestaurants /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFDB4F',
  },
  roulette: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // marginTop: '-10%',
  },
  buttonsBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: '70%',
    paddingBottom: 20,
  },
  header: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: '20%',
    // marginBottom: 0,
  },
});

export default RouletteScreen;
