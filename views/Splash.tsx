import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Octicons } from '@expo/vector-icons';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Splash: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 6000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.screen}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={styles.header}>ealette</Text>

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
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  screen: {
    zIndex: 3, // works on ios
    elevation: 3, // works on android
    paddingBottom: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#FFDB4F',
  },
  cardImage: {
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoContainer: {
    flex: 3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 0,
  },

  subHeader: {
    paddingLeft: 65,
    paddingRight: 65,
    fontSize: 16,
    textAlign: 'center',
  },
});
export default Splash;
