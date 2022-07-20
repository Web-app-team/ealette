import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const FetchRestaurants: React.FC = () => {
  const [userLocation, setUserLocation] = useState<
    object | undefined
  >();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [latitude, setLatitude] = useState<number | undefined>(
    35.8368658
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    139.6533851
  );
  const [datas, setDatas] = useState([] as any[]);
  const [show, setShow] = useState(false);

  const getLocationAsync = async () => {
    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
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
      console.log(response.data.data);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    getRestaurants().catch(console.error);
  }, [getRestaurants]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (userLocation) {
    text = JSON.stringify(userLocation);
  }
  let location = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };

  const d = datas.map((data: any, index: number) => {
    return data.cuisine;
  });
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

  // const itemList = result.map(({ name }) => name);
  // console.log(itemList);

  const staticData = datas.map((item) => {
    return {
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    };
  });
  staticData.splice(4, 1);
  staticData.splice(10, 1);
  staticData.splice(16, 1);
  return (
    <View>
      <Text style={styles.paragraph2}>
        {' '}
        <ol>
          {datas.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
            </li>
          ))}
        </ol>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  paragraph2: {
    flex: 4,
    overflow: 'visible',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FetchRestaurants;
