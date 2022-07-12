import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { auth } from '../firebase';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import MapScreen from './MapScreen';
import PreLoginScreen from './PreLoginScreen';
import RegistrationScreen from './RegistrationScreen';
import RouletteScreen from './RouletteScreen';
import SettingsScreen from './SettingsScreen';

const HomeStackScreen: React.FC = () => {
  const HomeStack = createNativeStackNavigator();

  return (
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

      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
      <HomeStack.Screen name="Map" component={MapScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
