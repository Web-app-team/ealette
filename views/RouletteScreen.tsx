import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import { useCallback, useEffect, useState } from 'react';
import SlotMachine from '../components/SlotMachine';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';

interface IRecipeProps {
  route?: any;
}

const RouletteScreen: React.FC<IRecipeProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const [activeType, setActiveType] = useState<number>(0);
  const [buttonVisible, setButtonVisible] = useState(false);
  // const [value, setValue] = useState('value');
  // const { getItem, setItem } = useAsyncStorage('@storage_key');

  // const readItemFromStorage = async () => {
  //   const item = await getItem();
  //   setValue(item);
  // };

  // const writeItemToStorage = async (newValue) => {
  //   await setItem(newValue);
  //   setValue(newValue);
  // };

  // const clearAll = async () => {
  //   await AsyncStorage.clear();
  //   console.log('Done.');
  // };

  // useEffect(() => {
  //   readItemFromStorage();
  // }, []);

  const toggleCancel = () => {
    setButtonVisible(!buttonVisible);
  };

  const renderCancel = () => {
    if (!buttonVisible) {
      return (
        <TouchableHighlight onPress={() => toggleCancel()}>
          <AppButton
            title="START"
            onPress={(event: any) => randomType(event)}
            borderRadius={100}
            width={100}
            height={100}
            backgroundColor={'white'}
            color="#222222"
          />
        </TouchableHighlight>
      );
    } else {
      return (
        <AppButton
          title="START"
          borderRadius={100}
          width={100}
          height={100}
          backgroundColor={'#d3d3d3'}
          color="#ffffff"
          opacity={0.5}
          disabled={true}
        />
      );
    }
  };

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

  const randomType = (event: any) => {
    event.preventDefault();
    const len = restaurantsTypes.length;
    setButtonVisible(!buttonVisible);
    setActiveType(Math.floor(Math.random() * len));
    // writeItemToStorage(restaurantsTypes[activeType].type);
  };

  console.log(restaurantsTypes[activeType].type);

  return (
    <View style={styles.screen}>
      {buttonVisible ? (
        <View>
          <Text style={styles.welcome2}>本日のランチは…</Text>

          <ImageBackground
            source={
              restaurantsTypes[activeType].type === '韓国料理'
                ? require('../assets/korea.png')
                : restaurantsTypes[activeType].type === '中華料理'
                ? require('../assets/chinese.png')
                : restaurantsTypes[activeType].type ===
                  'カフェ・喫茶店'
                ? require('../assets/cafe.png')
                : restaurantsTypes[activeType].type === '和食'
                ? require('../assets/japanesefood.png')
                : restaurantsTypes[activeType].type === 'イタリアン'
                ? require('../assets/italian.png')
                : restaurantsTypes[activeType].type === 'ステーキ' ||
                  restaurantsTypes[activeType].type === 'バーベキュー'
                ? require('../assets/steak.png')
                : restaurantsTypes[activeType].type ===
                    'アジア料理' ||
                  restaurantsTypes[activeType].type === 'ベトナム料理'
                ? require('../assets/asia.png')
                : restaurantsTypes[activeType].type === 'ヘルシー料理'
                ? require('../assets/salad.png')
                : restaurantsTypes[activeType].type ===
                  'ファストフード'
                ? require('../assets/fastfood.png')
                : restaurantsTypes[activeType].type === '肉料理'
                ? require('../assets/meat.png')
                : restaurantsTypes[activeType].type === '海鮮料理' ||
                  restaurantsTypes[activeType].type ===
                    '海鮮・シーフード'
                ? require('../assets/seafood.png')
                : restaurantsTypes[activeType].type === 'スープ'
                ? require('../assets/soup.png')
                : restaurantsTypes[activeType].type === 'フレンチ'
                ? require('../assets/french.png')
                : restaurantsTypes[activeType].type === 'メキシコ料理'
                ? require('../assets/mexico.png')
                : restaurantsTypes[activeType].type === 'イギリス料理'
                ? require('../assets/english.png')
                : restaurantsTypes[activeType].type === '寿司'
                ? require('../assets/sushi.png')
                : require('../assets/rice.png')
            }
            resizeMode="contain"
            style={styles.foodImage}
          >
            <View style={styles.roulette}>
              <SlotMachine
                text={restaurantsTypes[activeType].type}
                range="ナムペルーウラエィバーベキュー中華料理カフェ・喫茶店和食イタリアンアジア韓国ヘルシーファストフード肉海鮮スープグリルステーキハウスメキシコイギリス寿司フレンチ地中海パブ"
              />
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View>
          <Text style={styles.welcome}>やってみようじゃないか</Text>
        </View>
      )}
      <View style={styles.buttonsBox}>{renderCancel()}</View>
      {buttonVisible ? (
        <View style={styles.buttonsBox2}>
          <AppButton
            title="地図に見る"
            onPress={
              () => navigation.navigate('Map', { filteredCompare })
              // clearAll()
            }
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFDB4F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodImage: {
    flex: 1,
    justifyContent: 'center',
    width: 250,
  },
  roulette: {
    marginTop: -250,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    marginTop: 200,
    textAlign: 'center',
  },
  welcome2: {
    fontSize: 18,
    marginTop: 100,
    textAlign: 'center',
  },
  buttonsBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    maxWidth: '70%',
    paddingBottom: 20,
  },
  buttonsBox2: {
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
});

export default RouletteScreen;
