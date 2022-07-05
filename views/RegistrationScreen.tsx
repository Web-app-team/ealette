import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrationScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [email, onChangeEmail] = useState('');
  const [nickname, onChangeNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, onChangePassword] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

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

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        writeDB();
        navigation.navigate('Home');
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

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <View style={styles.loginView}>
        <Text>ニックネーム</Text>
        <TextInput
          value={nickname}
          onChangeText={(newNickname) =>
            onChangeNickname(newNickname)
          }
          style={styles.textInput}
        ></TextInput>
        <Text>メールアドレス</Text>
        <TextInput
          value={email}
          onChangeText={(newEmail) => onChangeEmail(newEmail)}
          style={styles.textInput}
        ></TextInput>
        {emailError.length > 0 ? <Text>{emailError}</Text> : null}
        <Text>パスワード</Text>
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
        <Text>パスワード確認</Text>
        <TextInput
          //   value={password}
          //   onChangeText={(newPassword) =>
          //     onChangePassword(newPassword)
          //   }
          //   secureTextEntry
          style={styles.textInput}
        ></TextInput>
        {passwordError.length > 0 ? (
          <Text>{passwordError}</Text>
        ) : null}
      </View>
      <View>
        <AppButton title="Register" onPress={handleSignUp} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'radial-gradient(ellipse at center, #46536a 0%,#28354a 30%,#0f1623 70%)',
  },
  loginView: {
    width: '80%',
  },
  birthdayView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default RegistrationScreen;
