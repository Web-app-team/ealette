import { useNavigation } from '@react-navigation/native';
import {
  BackHandler,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import { useEffect, useState } from 'react';
import SlotMachine from '../components/SlotMachine';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface IRecipeProps {
  route?: any;
}

const RouletteScreen: React.FC<IRecipeProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const [activeType, setActiveType] = useState<number>(0);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [savedValue, setSavedValue] = useState('value');
  const { getItem, setItem } = useAsyncStorage('@storage_key');

  const userLoc = route.params.userLoc;

  const toggleCancel = () => {
    setButtonVisible(!buttonVisible);
  };

  const readItemFromStorage = async () => {
    const item = await getItem();
    setSavedValue(item);
  };

  const writeItemToStorage = async (newValue: any) => {
    await setItem(newValue);
    setSavedValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const renderCancel = () => {
    if (!buttonVisible) {
      return (
        <View>
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
        </View>
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

      if (value.type !== savedValue && value.type !== 'パブ') {
        return (
          index ===
          restaurantsTypesAll.findIndex((obj: any) => {
            return JSON.stringify(obj) === _value;
          })
        );
      }
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
  };

  const go = () => {
    writeItemToStorage(restaurantsTypes[activeType].type);
    navigation.navigate('Map', { filteredCompare, userLoc });
  };

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
          <Text style={styles.welcome}>ランチを決める</Text>
          <Text style={styles.lastTimeBoxHeader}>
            前回のランチは:
          </Text>
          <Text style={styles.lastTimeBoxText}>{savedValue}</Text>
          <ImageBackground
            source={
              savedValue === '韓国料理'
                ? require('../assets/korea.png')
                : savedValue === '中華料理'
                ? require('../assets/chinese.png')
                : savedValue === 'カフェ・喫茶店'
                ? require('../assets/cafe.png')
                : savedValue === '和食'
                ? require('../assets/japanesefood.png')
                : savedValue === 'イタリアン'
                ? require('../assets/italian.png')
                : savedValue === 'ステーキ' ||
                  savedValue === 'バーベキュー'
                ? require('../assets/steak.png')
                : savedValue === 'アジア料理' ||
                  savedValue === 'ベトナム料理'
                ? require('../assets/asia.png')
                : savedValue === 'ヘルシー料理'
                ? require('../assets/salad.png')
                : savedValue === 'ファストフード'
                ? require('../assets/fastfood.png')
                : savedValue === '肉料理'
                ? require('../assets/meat.png')
                : savedValue === '海鮮料理' ||
                  savedValue === '海鮮・シーフード'
                ? require('../assets/seafood.png')
                : savedValue === 'スープ'
                ? require('../assets/soup.png')
                : savedValue === 'フレンチ'
                ? require('../assets/french.png')
                : savedValue === 'メキシコ料理'
                ? require('../assets/mexico.png')
                : savedValue === 'イギリス料理'
                ? require('../assets/english.png')
                : savedValue === '寿司'
                ? require('../assets/sushi.png')
                : require('../assets/rice.png')
            }
            resizeMode="contain"
            style={styles.lastTimeFoodImage}
          >
            <Text style={styles.lastTimeBoxText}> </Text>
          </ImageBackground>
        </View>
      )}

      <View style={styles.buttonsBox}>{renderCancel()}</View>
      {buttonVisible ? (
        <View>
          <View style={styles.buttonsBox2}>
            <AppButton title="地図に見る" onPress={() => go()} />
          </View>
          <View style={styles.lastTimeBottomBox}>
            <Text style={styles.lastTimeBottomBoxHeader}>前回:</Text>
            <Text style={styles.lastTimeBottomBoxText}>
              {savedValue}
            </Text>
          </View>
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
    width: 200,
  },
  roulette: {
    marginTop: -250,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    marginTop: 150,
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
    paddingBottom: 100,
  },
  buttonsBox2: {
    position: 'absolute',
    bottom: 125,
    left: Dimensions.get('window').width - 300,
  },
  lastTimeBottomBox: {
    // borderColor: 'red',
    // borderStyle: 'dotted',
    // borderWidth: 2,
    // borderRadius: 1,

    width: '33%',
    position: 'absolute',
    bottom: Dimensions.get('window').height - 540,
    right: Dimensions.get('window').width - 305,
  },
  lastTimeBottomBoxHeader: {
    fontSize: 18,
    textAlign: 'center',
  },
  lastTimeBottomBoxText: {
    textAlign: 'center',
    marginTop: 5,
  },

  lastTimeBoxHeader: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '5%',
  },
  lastTimeBoxText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: '1%',
    width: 200,
  },
  lastTimeFoodImage: {
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginTop: -20,
  },
});

export default RouletteScreen;
