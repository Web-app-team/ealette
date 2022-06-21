import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';

const SettingsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>Hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  opacity: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  header: {
    fontSize: 16,
    marginTop: 20,
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    flex: 1,
    marginTop: 30,
  },
  menu: {
    flex: 2,
    width: '60%',
  },
});

export default SettingsScreen;
