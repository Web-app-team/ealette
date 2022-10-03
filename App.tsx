import { NavigationContainer } from '@react-navigation/native';
import SettingsScreen from './views/SettingsScreen';
import RouletteScreen from './views/RouletteScreen';
import useCachedResources from './hooks/useCachedResources';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import PreLoginScreen from './views/PreLoginScreen';
import LoginScreen from './views/LoginScreen';
import RegistrationScreen from './views/RegistrationScreen';
import DetailsScreen from './views/DetailsScreen';
import MapScreen from './views/MapScreen';
import IntroScreen from './views/IntroScreen';

export default function App() {
  const HomeStack = createNativeStackNavigator();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="PreLogin"
            component={PreLoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <HomeStack.Screen
            name="Intro"
            component={IntroScreen}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="ルーレット"
            component={RouletteScreen}
            options={{
              headerStyle: {
                backgroundColor: '#FFDB4F',
              },
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

          <HomeStack.Screen name="履歴" component={DetailsScreen} />
          <HomeStack.Screen
            name="Settings"
            component={SettingsScreen}
          />
          <HomeStack.Screen name="Map" component={MapScreen} />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }
}
