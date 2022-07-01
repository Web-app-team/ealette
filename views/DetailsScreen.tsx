import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';

const DetailsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Details!</Text>
      <View style={styles.buttonsBox}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    marginTop: 20,
    flex: 2,
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default DetailsScreen;
