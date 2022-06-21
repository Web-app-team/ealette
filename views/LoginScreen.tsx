import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [email, onChangeEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, onChangePassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <View style={styles.loginView}>
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
      </View>
      <View>
        <AppButton title="ログイン" onPress={handleLogin} />
        <AppButton
          title="新規会員登録"
          onPress={() => navigation.navigate('Registration')}
        />
        <AppButton
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
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

export default LoginScreen;
