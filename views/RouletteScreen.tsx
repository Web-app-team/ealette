import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useCallback, useEffect, useState } from 'react';
import FetchRestaurants from './FetchRestaurants';
import * as Location from 'expo-location';
import axios from 'axios';

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
      type: '中華料理',
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
  ];

  const [activeType, setActiveType] = useState<number>(0);

  const randomType = () => {
    const len = restaurantsTypes.length;
    setActiveType(Math.floor(Math.random() * len));
  };

  // const navigation: any = useNavigation();
  // const [mustSpin, setMustSpin] = useState(false);
  // const [prizeNumber, setPrizeNumber] = useState(0);

  // const data = [
  //   { option: '0' },
  //   { option: '1' },
  //   { option: '2' },
  //   { option: '3' },
  //   { option: '4' },
  //   { option: '5' },
  //   { option: '6' },
  //   { option: '7' },
  //   { option: '8' },
  // ];
  // const backgroundColors = [
  //   '#ff8f43',
  //   '#70bbe0',
  //   '#0b3351',
  //   '#f9dd50',
  // ];
  // const textColors = ['#0b3351'];
  // const outerBorderColor = '#eeeeee';
  // const outerBorderWidth = 10;
  // const innerBorderColor = '#30261a';
  // const innerBorderWidth = 0;
  // const innerRadius = 0;
  // const radiusLineColor = '#eeeeee';
  // const radiusLineWidth = 8;
  // const fontSize = 17;
  // const textDistance = 60;
  // const spinDuration = 1.0;

  // const handleSpinClick = () => {
  //   const newPrizeNumber = Math.floor(Math.random() * data.length);
  //   console.log(newPrizeNumber);

  //   setPrizeNumber(newPrizeNumber);
  //   setMustSpin(true);
  // };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Roulette Screen</Text>

      <Text>{restaurantsTypes[activeType].type}</Text>
      <AppButton title="Spin" onPress={randomType} />
      {/* <FetchRestaurants /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default RouletteScreen;
