import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import AppButton from '../components/AppButton';

import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import Splash from './Splash';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const PreLoginScreen: React.FC = () => {
  const navigation: any = useNavigation();

  // Login Screen States
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
  const [appIsReady, setAppIsReady] = useState(false);

  const getRestaurants = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
      params: {
        latitude: latitude,
        longitude: longitude,
        limit: '50',
        currency: 'YEN',
        distance: '1',
        open_now: 'true',
        lunit: 'km',
        lang: 'ja_JP',
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key':
          'c0fa11d7admshc3c2301bdfb27e3p12a19djsn1e5326b5ae48',
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

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 6000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.screen}>
      <Splash />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.cardImage}
        />

        <Text style={styles.subHeader}>
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Text> </Text>
          5秒でランチ決め
          <Text> </Text>
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
          <Octicons name="dash" size={16} color="black" />
        </Text>
      </View>

      <View style={styles.buttonsBox}>
        <AppButton
          title="始める"
          minWidth={Dimensions.get('window').width - 70}
          onPress={() =>
            navigation.navigate('Intro', { getPosAndRest: datas })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFDB4F',
  },
  cardImage: {
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width - 160,
  },
  logoContainer: {
    flex: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 16,
    textAlign: 'center',
    marginTop: -150,
  },
  buttonsBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: '70%',
  },
});

export default PreLoginScreen;
