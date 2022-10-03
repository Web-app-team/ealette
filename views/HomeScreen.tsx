import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';

interface IRecipeProps {
  route?: any;
}

const HomeScreen: React.FC<IRecipeProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const restaurants = route.params;
  console.log(restaurants);

  return (
    <View style={styles.screen}>
      <View style={styles.text}>
        <Text>早速ルーレットを回して</Text>
        <Text style={styles.welcome}>
          本日のランチを決めましょう！
        </Text>
      </View>

      <View style={styles.buttonsBox}>
        <AppButton
          title="ルーレットを回す"
          minWidth={Dimensions.get('window').width - 70}
          onPress={() =>
            navigation.navigate('ルーレット', { restaurants })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 14,
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
});

export default HomeScreen;
