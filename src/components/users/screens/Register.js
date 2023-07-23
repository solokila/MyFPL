import {
  StyleSheet, Text, View,
  TextInput, Pressable, Image, TouchableHighlight, Alert
} from 'react-native'
import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext';

const Register = (props) => {
  const { onRegister } = useContext(UserContext);
  const { navigation } = props;
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPassword2, setIsShowPassword2] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkText, setCheckText] = useState(false);

  const onRegisterPress = async () => {
    if (password != confirmPassword) {
      Alert.alert('nhap lai khong khop!');
      return;
    }
    //goi API
    const result = await onRegister(email, password);
    console.log('ket qua dang ky:', result);
    //neu thanh cong thi chuyen ve man hinh login
    if (!result) {
      Alert.alert('Email da ton tai!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      navigation.navigate('Login');
    }
  }

  const onChangeEmail = () => {
    // const regex = /^[a-z]{3,}ps[0-9]{5}@fpt.edu.vn$/;
    const regex = /^[a-z]{3,}[0-9]{1,}@gmail.com$/;
    if (regex.test(email)) {
      setCheckText(false);
    } else {
      setCheckText(true);
    }
    //hien dong text bao loi
  }

  return (
    <View style={loginstyles.body}>
      <Text style={loginstyles.hello}>Hello!</Text>
      <Text style={loginstyles.again}>Signup to get Started </Text>

      <View style={loginstyles.usernameContainer}>
        <Text style={loginstyles.usernameLabel}>Email*</Text>
        <TextInput
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
          onBlur={onChangeEmail}
          style={loginstyles.usernameInput}></TextInput>
        <View>
          {checkText ? <Text style={{ color: 'red', fontSize: 10 }}>Sai cu phap</Text> : null}
        </View>
      </View>

      <View style={loginstyles.passwordContainer}>
        <Text style={loginstyles.passwordLabel}>PassWord*</Text>
        <View style={loginstyles.passwordInputIcon}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isShowPassword}
            style={loginstyles.paswordInput}></TextInput>
          <TouchableHighlight
            style={loginstyles.eyeIcon}
            onPress={() => setIsShowPassword(!isShowPassword)}>
            <Image
              source={
                isShowPassword ?
                  require('../../../media/eye.jpg')
                  : require('../../../media/eye2.png')}></Image>
          </TouchableHighlight>
        </View>
      </View>

      <View style={loginstyles.passwordContainer}>
        <Text style={loginstyles.passwordLabel}>Confirm PassWord*</Text>
        <View style={loginstyles.passwordInputIcon}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={isShowPassword2}
            style={loginstyles.paswordInput}></TextInput>
          <TouchableHighlight
            style={loginstyles.eyeIcon}
            onPress={() => setIsShowPassword2(!isShowPassword2)}>
            <Image
              source={
                isShowPassword2 ?
                  require('../../../media/eye.jpg')
                  : require('../../../media/eye2.png')}></Image>
          </TouchableHighlight>
        </View>
      </View>

      <Pressable
        onPress={onRegisterPress}
        style={loginstyles.buttonLoginContainer}>
        <Text style={loginstyles.buttonLoginLabel}>Register</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        style={loginstyles.buttonLoginContainer}>
        <Text style={loginstyles.buttonLoginLabel}>Back to Login</Text>
      </Pressable>

      <Text style={loginstyles.textContinue}>or conutiune with</Text>

      <View style={loginstyles.loginWithFaceBookOrGoogle}>

        <View style={loginstyles.loginFaceBookContainer}>
          <Pressable style={loginstyles.buttonLoginFaceBook}>
            <Image source={require('../../../media/f.png')}></Image>
            <Text style={loginstyles.loginFaceBookLabel}>FaceBook</Text>
          </Pressable>
        </View>

        <View style={loginstyles.loginGoogleContainer}>
          <Pressable style={loginstyles.buttonLoginGoogle}>
            <Image source={require('../../../media/G.png')}></Image>
            <Text style={loginstyles.loginGoogleLabel}>Google</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

export default Register

const loginstyles = StyleSheet.create({
  loginWithFaceBookOrGoogle: {
    flexDirection: 'row',
    with: '100%',
    marginTop: 24,
    justifyContent: 'space-between'
  },
  loginGoogleContainer: {
    position: 'relative'
  },
  loginGoogleLabel: {
    color: '#667080',
    lineHeight: 24,
    letterSpacing: 0.12,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10
  },
  buttonLoginGoogle: {
    marginTop: 24,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#EEF1F4',
    height: 48,
    width: 160,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,

  },
  loginFaceBookContainer: {
    justifyContent: 'space-between'
  },
  loginFaceBookLabel: {
    color: '#667080',
    lineHeight: 24,
    letterSpacing: 0.12,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10
  },
  buttonLoginFaceBook: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#EEF1F4',
    height: 48,
    width: 160,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,

  },
  buttonLoginLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  buttonLoginContainer: {
    marginTop: 24,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#1877F2',
    height: 50,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  textContinue: {
    marginTop: 16,
    textAlign: 'center',
    width: '100%'



  },
  passwordLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
  },
  passwordContainer: {
    marginTop: 16
  },
  passwordInputIcon: {
    position: 'relative',

  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12
  },
  paswordInput: {
    padding: 10,
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: '#4E4B66',
    borderWidth: 1
  },
  usernameInput: {
    padding: 10,
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: '#4E4B66',
    borderWidth: 1
  },
  usernameLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,

  },
  usernameContainer: {
    marginTop: 48,
  },
  hello: {
    fontSize: 48,
    lineHeight: 72,
    fontWeight: '700',
    letterSpacing: 0.12,
    color: '#1877F2'
  },
  again: {
    fontSize: 20,
    letterSpacing: 0.12,
    lineHeight: 30,
    fontWeight: '400',
    color: '#4E4B66',
    width: 222
  },
  body: {
    padding: 24,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  }
})