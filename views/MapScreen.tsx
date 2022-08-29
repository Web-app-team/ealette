import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { createOpenLink } from 'react-native-open-maps';

interface IRecipeProps {
  route?: any;
}

const MapScreen: React.FC<IRecipeProps> = ({ route }) => {
  const [userLocation, setUserLocation] = useState<
    object | undefined
  >();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [latitude, setLatitude] = useState<number | undefined>(
    35.6988629426
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    139.696601629
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
      image: item.photo ? item.photo.images.medium.url : null,
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      address: String(item.address),
    };
  });

  console.log(userLocation);

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
            onCalloutPress={createOpenLink({
              end: item.address,
              zoom: 20,
            })}
          >
            <Callout tooltip style={styles.card}>
              <View style={styles.cardInfo}>
                <Text>
                  {item.name}
                  {'\n'}
                </Text>
                <Text style={styles.cardImageContainer}>
                  {item.image !== null ? (
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.cardImage}
                    />
                  ) : (
                    <Image
                      source={require('../assets/dummy.jpg')}
                      resizeMode="contain"
                      style={styles.cardImageDummy}
                    />
                  )}
                </Text>
                <Text>
                  {'\n'}住所：{'\n'}
                  {item.address}
                  {'\n'}
                </Text>
              </View>
              {/* <View>
                <AppButton title="Go to rest" />
              </View> */}
            </Callout>

            {/* <StyledMarker /> */}
            {/* {item.image} */}
          </Marker>
        ))}
      </MapView>
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
    padding: 5,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    height: 300,
    width: 300,
    overflow: 'hidden',
  },
  cardInfo: {
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {
    marginTop: -140,
  },
  cardImage: {
    height: 300,
    width: 300,
  },
  cardImageDummy: {
    height: 300,
    width: 300,
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
