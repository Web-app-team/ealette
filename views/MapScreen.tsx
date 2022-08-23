import MapView, {
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

interface IRecipeProps {
  route?: any;
}

const MapScreen: React.FC<IRecipeProps> = ({ route }) => {
  console.log(route.params.filteredCompare);
  const [userLocation, setUserLocation] = useState<
    object | undefined
  >();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [latitude, setLatitude] = useState<number | undefined>(
    35.8368658
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    139.6533851
  );
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getLocationAsync = async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLatitude(userLocation.coords.latitude);
      setLongitude(userLocation.coords.longitude);
      setUserLocation(userLocation.coords);
    };
    getLocationAsync();

    return () => {
      source.cancel();
    };
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (userLocation) {
    text = JSON.stringify(userLocation);
  }
  let location = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };

  const staticData = route.params.filteredCompare.map((item: any) => {
    return {
      name: String(item.name),
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      // image: item.photo.images.small.url,
    };
  });
  console.log(staticData);

  console.log(
    staticData.map((resName) => {
      return resName.name;
    })
  );
  const StyledMarker = () => {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: '#ffc600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'black' }}>お店</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        region={location}
      >
        {staticData.map((item: any, index: any) => (
          <Marker
            key={index}
            title={item.name}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          >
            <StyledMarker />
            {/* {item.image} */}
          </Marker>
        ))}
      </MapView>
      {/* <Animated.ScrollView
        horizontal={true}
        scrollEventThrottle={1}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={100}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {staticData.map((marker, index) => {
          <View style={styles.card} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {MarkerAnimated}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker}
              </Text>
            </View>
          </View>;
        })}
      </Animated.ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
    bottom: 25,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: 100,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
});

export default MapScreen;
