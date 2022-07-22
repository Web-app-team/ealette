import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';

const DetailsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.screen}>
      <Image
        style={styles.image}
        source={require('../assets/history.png')}
      />
      <Text style={styles.header}>履歴は０件です</Text>
      <Text style={styles.welcome}>
        行ったお店を登録して、新しいお店を訪れましょう！{'\n'}
        ※「行った登録」をしたお店はマップに表示されません
      </Text>
      {/* <View style={styles.buttonsBox}>
        <AppButton
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
  },
  image: {
    // marginTop: Dimensions.get('window').height - 750,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 40,
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // marginBottom: -20,
  },
});

export default DetailsScreen;
