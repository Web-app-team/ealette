import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import { useCallback, useEffect, useState } from 'react';
import SlotMachine from '../components/SlotMachine';

interface IRecipeProps {
  route?: any;
}

const RouletteScreen: React.FC<IRecipeProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const [activeType, setActiveType] = useState<number>(0);

  console.log(route.params.restaurants.propsRestaurants);

  const restaurantData = route.params.restaurants.propsRestaurants
    ? route.params.restaurants.propsRestaurants.map(
        (restaurant: any) => {
          if (
            restaurant.cuisine !== undefined &&
            restaurant.cuisine.length !== 0
          ) {
            return restaurant.cuisine;
          }
          return null;
        }
      )
    : null;
  const filtered = restaurantData.filter((el: any) => {
    return el != null;
  });

  const restaurantsTypesAll = filtered.map((type: any) => {
    return { type: type[0].name };
  });

  const restaurantsTypes = restaurantsTypesAll.filter(
    (value: any, index: any) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        restaurantsTypesAll.findIndex((obj: any) => {
          return JSON.stringify(obj) === _value;
        })
      );
    }
  );

  const compare = route.params.restaurants.propsRestaurants.map(
    (restaurant: any) => {
      if (
        restaurant.cuisine !== undefined &&
        restaurant.cuisine.length !== 0
      ) {
        if (
          restaurant.cuisine[0].name ===
          restaurantsTypes[activeType].type
        ) {
          return restaurant;
        }
      }
    }
  );

  const filteredCompare = compare.filter((el: any) => {
    return el != null;
  });
  console.log(filteredCompare);

  const randomType = () => {
    const len = restaurantsTypes.length;
    setActiveType(Math.floor(Math.random() * len));
  };
  console.log(restaurantsTypes[activeType]);
  return (
    <View style={styles.screen}>
      <AppButton
        title="地図に見る"
        onPress={() =>
          navigation.navigate('Map', { filteredCompare })
        }
      />
      {/* <Text style={styles.header}>ルーレット</Text> */}
      {/* <SlotMachine duration={1000} /> */}
      <View style={styles.roulette}>
        <SlotMachine
          text={restaurantsTypes[activeType].type}
          range="バーベキュー中華料理カフェ・喫茶店和食イタリアンアジア韓国ヘルシーファストフード肉海鮮スープグリルステーキメキシコイギリス寿司フレンチ地中海パブ"
        />
      </View>
      {/* <Text>{restaurantsTypes[activeType].type}</Text> */}
      <View style={styles.buttonsBox}>
        <AppButton
          title="START"
          onPress={randomType}
          borderRadius={100}
          width={100}
          height={100}
          backgroundColor={'white'}
          color="#222222"
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
  roulette: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // marginTop: '-10%',
  },
  buttonsBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: '70%',
    paddingBottom: 20,
  },
  header: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: '20%',
    // marginBottom: 0,
  },
});

export default RouletteScreen;
