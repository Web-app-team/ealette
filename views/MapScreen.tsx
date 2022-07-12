import MapView, {
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const animation = useRef(new Animated.Value(0)).current;

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
    const source = axios.CancelToken.source();

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

    getLocationAsync();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getRestaurants().catch(console.error);
    }
    return () => {
      isApiSubscribed = false;
    };
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

  // const d = datas.map((data: any, index: number) => {
  //   return data.cuisine;
  // });
  // const result = [
  //   ...datas
  //     .reduce((r, { cuisine }) => {
  //       (cuisine || []).forEach((o: any) => {
  //         r.has(o.name) || r.set(o.name, { ...o });
  //         r.get(o.name);
  //       });

  //       return r;
  //     }, new Map())
  //     .values(),
  // ];

  // const itemList = result.map(({ name }) => name);

  const staticData = datas.map((item) => {
    // console.log(item.photo);
    return {
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      // image: item.photo.images.small.url,
    };
  });
  staticData.splice(4, 1);
  staticData.splice(10, 1);
  staticData.splice(16, 1);

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
            {/* {item.image} */}
          </Marker>
        ))}
      </MapView>
      {/* <Animated.ScrollView
        horizontal={true}
        scrollEventThrottle={1}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={100}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {staticData.map((marker, index) => {
          <View style={styles.card} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {MarkerAnimated}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker}
              </Text>
            </View>
          </View>;
        })}
      </Animated.ScrollView> */}
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
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
    bottom: 25,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: 100,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
});

export default MapScreen;
