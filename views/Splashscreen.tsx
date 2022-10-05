import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Octicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const Splashscreen: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 8000));
      } catch (e) {
        console.warn(e);
      } finally {
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
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  screen: {
    zIndex: 3,
    elevation: 3,
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
});
export default Splashscreen;
