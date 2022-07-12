import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './views/HomeStackScreen';
import SettingsScreen from './views/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import RouletteScreen from './views/RouletteScreen';
import FavoriteScreen from './views/FavoriteScreen';
import useCachedResources from './hooks/useCachedResources';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import PreLoginScreen from './views/PreLoginScreen';
import LoginScreen from './views/LoginScreen';
import RegistrationScreen from './views/RegistrationScreen';
import DetailsScreen from './views/DetailsScreen';
import MapScreen from './views/MapScreen';
import { useEffect } from 'react';
import { auth } from './firebase';

export default function App() {
  // const RootTab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const isLoadingComplete = useCachedResources();
  // const navigation: any = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate('Home');
  //     } else {
  //       navigation.navigate('PreLogin');
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            // options={{
            //   title: 'Awesome app',
            // }}
          />
          <HomeStack.Screen
            name="PreLogin"
            component={PreLoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Roulette"
            component={RouletteScreen}
            options={{
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'ログイン',
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              title: '新規会員登録',
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="Details"
            component={DetailsScreen}
          />
          <HomeStack.Screen
            name="Settings"
            component={SettingsScreen}
          />
          <HomeStack.Screen name="Map" component={MapScreen} />
          {/* <RootTab.Screen
            name="HomeStack"
            component={HomeStackScreen}
            options={{
              headerShown: false,

              tabBarIcon: ({ color }) => (
                <Ionicons name="md-home" size={30} color={color} />
              ),
            }}
          />
          <RootTab.Screen
            name="お気に入り"
            component={FavoriteScreen}
            options={{
              headerShown: true,
              tabBarIcon: ({ color }) => (
                <Ionicons
                  name="md-settings"
                  size={30}
                  color={color}
                />
              ),
            }}
          />
          <RootTab.Screen
            name="マイページ"
            component={SettingsScreen}
            options={{
              // tabBarBadge: 3,
              headerShown: true,
              tabBarIcon: ({ color }) => (
                <Ionicons
                  name="md-settings"
                  size={30}
                  color={color}
                />
              ),
            }}
          /> */}
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }
}
