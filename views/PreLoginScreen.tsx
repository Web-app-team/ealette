import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';

const PreLoginScreen: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.text}>
        <Text>LOGO</Text>
      </View>
      <View style={styles.buttonsBox}>
        <AppButton
          title="ログイン"
          backgroundColor="#0C5C5B"
          // color="#222222"
          onPress={() => navigation.navigate('Login')}
        />
        <AppButton
          title="新規会員登録"
          // size="sm"
          backgroundColor="#FFFFFF"
          color="#222222"
          onPress={() => navigation.navigate('Registration')}
        />
        <AppButton
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFCA0B',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // header: {
  //   fontSize: 16,
  //   marginTop: 20,
  //   flex: 2,
  // },
  // welcome: {
  //   fontSize: 14,
  //   flex: 3,
  // },
  buttonsBox: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    maxWidth: '70%',
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

export default PreLoginScreen;
