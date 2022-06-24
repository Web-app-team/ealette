import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './views/HomeStackScreen';
import SettingsScreen from './views/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import RouletteScreen from './views/RouletteScreen';
import FavoriteScreen from './views/FavoriteScreen';
import useCachedResources from './hooks/useCachedResources';

export default function App() {
  const RootTab = createBottomTabNavigator();
  const isLoadingComplete = useCachedResources();
  console.log(isLoadingComplete);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <RootTab.Navigator>
          <RootTab.Screen
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
          />
        </RootTab.Navigator>
      </NavigationContainer>
    );
  }
}
