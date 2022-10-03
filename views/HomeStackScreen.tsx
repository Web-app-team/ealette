import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { auth } from '../firebase';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import IntroScreen from './IntroScreen';
import LoginScreen from './LoginScreen';
import MapScreen from './MapScreen';
import PreLoginScreen from './PreLoginScreen';
import RegistrationScreen from './RegistrationScreen';
import RouletteScreen from './RouletteScreen';
import SettingsScreen from './SettingsScreen';

const HomeStackScreen: React.FC = () => {
  const HomeStack = createBottomTabNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Roulette"
        component={RouletteScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
