import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import FetchRestaurants from './FetchRestaurants';
import { useEffect } from 'react';

const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();

  // Subscription Check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('PreLogin');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('PreLogin');
      })
      .catch((error: any) => console.log(error.message));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.text}>
        {/* <Text style={styles.paragraph}>{latitude}</Text>
        <Text style={styles.paragraph}>{longitude}</Text> */}
        <Text>登録ありがとうございます！</Text>
        <Text style={styles.welcome}>
          {/* Welcome! {auth.currentUser?.email} */}
          早速ルーレットを回して 本日のランチを決めましょう！
        </Text>
      </View>
      {/* <FetchRestaurants /> */}

      <View style={styles.buttonsBox}>
        <AppButton
          title="ルーレットを回す"
          onPress={() => navigation.navigate('Roulette')}
        />
        <AppButton
          title="Details"
          onPress={() => navigation.navigate('Details')}
        />
        <AppButton
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        <AppButton
          title="Map"
          onPress={() => navigation.navigate('Map')}
        />
        <AppButton title="Logout" onPress={handleSignOut} />
        <AppButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    marginTop: 20,
    flex: 1,
  },
  welcome: {
    fontSize: 14,
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  paragraph2: {
    flex: 4,
    overflow: 'visible',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
