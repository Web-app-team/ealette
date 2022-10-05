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
  const userLoc = route.params.userLoc;
  console.log(userLoc);

  const staticData = route.params.filteredCompare.map((item: any) => {
    return {
      name: String(item.name),
      image: item.photo ? item.photo.images.medium.url : null,
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      address: String(item.address),
      distance: String(item.distance_string),
    };
  });

  let location = {
    latitude: Number(userLoc.latitude),
    longitude: Number(userLoc.longitude),
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
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
            icon={require('../assets/map-marker.png')}
          >
            <Callout
              tooltip
              style={styles.card}
              onPress={createOpenLink({
                end: item.address,
                zoom: 20,
              })}
            >
              <View style={styles.cardInfo}>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                  }}
                >
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
                      style={styles.cardImageDummy}
                    />
                  )}
                </Text>
                <Text style={styles.cardText}>
                  {'\n'}住所：{'\n'}
                  {item.address}
                </Text>
                <Text style={styles.cardText}>
                  距離：{item.distance}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
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
    height: 350,
    width: 300,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  cardInfo: {
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {},
  cardImage: {
    height: 200,
    maxHeight: 200,
    width: Dimensions.get('window').width,
  },
  cardImageDummy: {
    height: 200,
    maxHeight: 200,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  cardText: {
    alignSelf: 'flex-start',
    fontSize: 16,
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
