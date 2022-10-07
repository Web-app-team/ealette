import { NavigationContainer } from '@react-navigation/native';
import RouletteScreen from './views/RouletteScreen';
import useCachedResources from './hooks/useCachedResources';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import PreLoginScreen from './views/PreLoginScreen';
import MapScreen from './views/MapScreen';
import IntroScreen from './views/IntroScreen';
import { LogBox } from 'react-native';

export default function App() {
  const HomeStack = createNativeStackNavigator();
  const isLoadingComplete = useCachedResources();

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

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
              // headerShown: false,
              headerStyle: {
                backgroundColor: '#FFDB4F',
              },
            }}
          />
          <HomeStack.Screen
            name="Map"
            component={MapScreen}
            options={
              {
                // headerShown: false,
              }
            }
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }
}
