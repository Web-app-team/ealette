import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useState } from 'react';

const RouletteScreen: React.FC = () => {
  // const navigation: any = useNavigation();
  // const [mustSpin, setMustSpin] = useState(false);
  // const [prizeNumber, setPrizeNumber] = useState(0);

  // const data = [
  //   { option: '0' },
  //   { option: '1' },
  //   { option: '2' },
  //   { option: '3' },
  //   { option: '4' },
  //   { option: '5' },
  //   { option: '6' },
  //   { option: '7' },
  //   { option: '8' },
  // ];
  // const backgroundColors = [
  //   '#ff8f43',
  //   '#70bbe0',
  //   '#0b3351',
  //   '#f9dd50',
  // ];
  // const textColors = ['#0b3351'];
  // const outerBorderColor = '#eeeeee';
  // const outerBorderWidth = 10;
  // const innerBorderColor = '#30261a';
  // const innerBorderWidth = 0;
  // const innerRadius = 0;
  // const radiusLineColor = '#eeeeee';
  // const radiusLineWidth = 8;
  // const fontSize = 17;
  // const textDistance = 60;
  // const spinDuration = 1.0;

  // const handleSpinClick = () => {
  //   const newPrizeNumber = Math.floor(Math.random() * data.length);
  //   console.log(newPrizeNumber);

  //   setPrizeNumber(newPrizeNumber);
  //   setMustSpin(true);
  // };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Roulette Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default RouletteScreen;
