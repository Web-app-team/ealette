import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen: React.FC = () => {
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

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

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

  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: latitude,
      longitude: longitude,
      limit: '20',
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

  const delay = 5;
  useEffect(() => {
    (() => {
      let timer1 = setTimeout(() => setShow(true), delay * 1000);
      axios
        .request(options)
        .then((response: any) => {
          setDatas(response.data.data);
          // console.log(response.data.data);
          clearTimeout(timer1);
        })
        .catch((error: any) => {
          console.error(error);
        });
    })();
  }, []);

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

  const itemList = result.map(({ name }) => name);

  // console.log(itemList);

  // const d = datas.map((m) => {
  //   m.cuisine.forEach((p: any) => Object.assign(m, p));
  //   delete m.cuisine;
  // });

  // console.log(d);

  const staticData = datas.map((item) => {
    return {
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    };
  });
  staticData.splice(4, 1);
  staticData.splice(10, 1);
  staticData.splice(16, 1);
  // console.log(staticData);

  const StyledMarker = () => {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: '#ffc600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'black' }}>お店</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        region={location}
      >
        {staticData.map((item, index) => (
          <Marker
            key={index}
            title="Test"
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          >
            <StyledMarker />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
