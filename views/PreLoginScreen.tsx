import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Platform,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import AppButton from '../components/AppButton';
import { auth, db } from '../firebase';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';

const PreLoginScreen: React.FC = () => {
  const navigation: any = useNavigation();

  // Login Screen States
  const [email, onChangeEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, onChangePassword] = useState('');
  const [loginModalVisible, setLoginModalVisible] = useState(false);

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
  const [datas, setDatas] = useState([] as any[]);

  const getRestaurants = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
      params: {
        latitude: latitude,
        longitude: longitude,
        limit: '30',
        currency: 'YEN',
        distance: '1',
        open_now: 'true',
        lunit: 'km',
        lang: 'ja_JP',
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key':
          'c0fa11d7admshc3c2301bdfb27e3p12a19djsn1e5326b5ae48',
      },
    };
    const response = await axios.request(options);

    if (response) {
      setDatas(response.data.data);
      console.log(response.data.data);
    }
  }, [latitude, longitude]);

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

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getRestaurants().catch(console.error);
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [getRestaurants]);

  // Registration Screen States
  // const [email, onChangeEmail] = useState('');
  const [nickname, onChangeNickname] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [password, onChangePassword] = useState('');
  const [registrationModalVisible, setRegistrationModalVisible] =
    useState(false);

  // Login Screen Functions
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Intro', { getPosAndRest: datas });
      })
      .catch((error) => {
        let passwordValid = false;
        if (error.code === 'auth/wrong-password') {
          setPasswordError('That password is incorrect!');
          setEmailError('');
        } else {
          setPasswordError('');
          passwordValid = true;
        }
      });
  };

  // Registration Screen Push to Firebase
  const writeDB = async (): Promise<any> => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        nickname: nickname,
        email: email,
        password: password,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // Registration Screen Functions
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        writeDB();
        navigation.navigate('Intro', { getPosAndRest: datas });
      })
      .catch((error) => {
        let emailValid = false;
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setEmailError('That email address is invalid!');
        } else {
          setEmailError('');
          emailValid = true;
        }
      });
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text style={styles.header}>ealette</Text>

        <Text style={styles.subHeader}>
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={16}
            color="black"
          />
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={16}
            color="black"
          />
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={16}
            color="black"
          />
          <Text> </Text>
          5秒でランチ決め
          <Text> </Text>
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={16}
            color="black"
          />
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={16}
            color="black"
          />
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={16}
            color="black"
          />
        </Text>
      </View>

      {/* Login Modal Start */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen2}
      >
        <GestureRecognizer
          style={{ flex: 1 }}
          config={config}
          onSwipeDown={() => setLoginModalVisible(false)}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={loginModalVisible}
            onRequestClose={() => {
              setLoginModalVisible(!loginModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* Login View Start */}

                <View style={styles.modalText}>
                  <Text style={styles.modalHeader}>ログイン</Text>
                  <Text style={styles.modalSubHeader}>
                    メールアドレス
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={(newEmail) =>
                      onChangeEmail(newEmail)
                    }
                    style={styles.textInput}
                  ></TextInput>
                  {emailError.length > 0 ? (
                    <Text>{emailError}</Text>
                  ) : null}
                  <Text style={styles.modalSubHeader}>
                    パスワード
                  </Text>
                  <TextInput
                    value={password}
                    onChangeText={(newPassword) =>
                      onChangePassword(newPassword)
                    }
                    secureTextEntry
                    style={styles.textInput}
                  ></TextInput>
                  {passwordError.length > 0 ? (
                    <Text>{passwordError}</Text>
                  ) : null}
                </View>
                <View style={styles.modalButton}>
                  <AppButton
                    title="ログイン"
                    minWidth={Dimensions.get('window').width - 70}
                    onPress={handleLogin}
                  />
                </View>

                {/* Login View End */}
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
      </KeyboardAvoidingView>
      {/* Login Modal End */}

      {/* Registration Modal Start */}
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => setRegistrationModalVisible(false)}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={registrationModalVisible}
          onRequestClose={() => {
            setRegistrationModalVisible(!registrationModalVisible);
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {/* Registration View Start */}

                <View style={styles.modalText}>
                  <Text style={styles.modalHeader}>ユーザー登録</Text>
                  <Text style={styles.modalSubHeader}>
                    ニックネーム
                  </Text>
                  <TextInput
                    value={nickname}
                    onChangeText={(newNickname) =>
                      onChangeNickname(newNickname)
                    }
                    style={styles.textInput}
                  ></TextInput>
                  <Text style={styles.modalSubHeader}>
                    メールアドレス
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={(newEmail) =>
                      onChangeEmail(newEmail)
                    }
                    style={styles.textInput}
                  ></TextInput>
                  {emailError.length > 0 ? (
                    <Text>{emailError}</Text>
                  ) : null}
                  <Text style={styles.modalSubHeader}>
                    パスワード
                  </Text>
                  <TextInput
                    value={password}
                    onChangeText={(newPassword) =>
                      onChangePassword(newPassword)
                    }
                    secureTextEntry
                    style={styles.textInput}
                  ></TextInput>
                  {passwordError.length > 0 ? (
                    <Text>{passwordError}</Text>
                  ) : null}

                  {passwordError.length > 0 ? (
                    <Text>{passwordError}</Text>
                  ) : null}
                </View>
                <View style={styles.modalButton}>
                  <AppButton
                    title="ユーザー登録"
                    minWidth={Dimensions.get('window').width - 70}
                    onPress={handleSignUp}
                  />
                </View>
                {/* Registration View End */}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </GestureRecognizer>

      {/* Registration Modal End */}

      <View style={styles.buttonsBox}>
        <AppButton
          title="ログイン"
          minWidth={Dimensions.get('window').width - 70}
          onPress={() => setLoginModalVisible(true)}
        />
        <AppButton
          title="新規会員登録"
          // size="sm"
          backgroundColor="#FFFFFF"
          color="#222222"
          minWidth={Dimensions.get('window').width - 70}
          onPress={() => setRegistrationModalVisible(true)}
        />
        {/* <AppButton
          title="Go to Home"
          minWidth={Dimensions.get('window').width - 70}
          onPress={() =>
            navigation.navigate('Intro', { getPosAndRest: datas })
          }
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFDB4F',
  },
  screen2: {
    flex: 1,
  },
  cardImage: {
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  horizontalRule: {
    width: 200,
  },
  logoContainer: {
    flex: 3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 0,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 30,
  },
  modalSubHeader: {
    textAlign: 'left',
    marginLeft: 6,
  },
  subHeader: {
    paddingLeft: 65,
    paddingRight: 65,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsBox: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: '70%',
    paddingBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  paragraph2: {
    flex: 4,
    overflow: 'visible',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButton: {
    alignSelf: 'center',
  },
  centeredView: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: -20,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    width: Dimensions.get('window').width - 25,
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    margin: 8,
    padding: 8,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 0,
    marginTop: 5,
  },
});

export default PreLoginScreen;
