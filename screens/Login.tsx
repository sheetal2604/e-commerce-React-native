import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
const Login = ({navigation}: any) => {
  type LoginDetails = {
    email: string;
    password: string;
  };
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginDetails>({
    email: '',
    password: '',
  });
  const [inValid, setInvalid] = useState('');
  const onInputChangeHandler = (inputIdentifier: any, enteredValue: any) => {
    setLoginDetails(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };
  const handleError = (inputIdentifier: any, enteredValue: any) => {
    setErrors(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');

      let jsonData = await JSON.parse(jsonValue);
      // console.log(jsonData,"json");
      if (
        jsonData.email === loginDetails.email &&
        jsonData.password === loginDetails.password
      ) {
        navigation.navigate('homeTabs');
      } else {
        setInvalid('Invalid email or password!');
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const handleLogin = () => {
    let isValid = true;
    if (!loginDetails.email) {
      handleError('email', 'Please enter your email');
      isValid = false;
    } else if (!loginDetails.email.match(/\S+@\S+\.+\S/)) {
      handleError('email', 'Please enter valid email address');
      isValid = false;
    }
    if (!loginDetails.password) {
      handleError('password', 'Please enter password');
      isValid = false;
    } else if (loginDetails.password.length <= 6) {
      handleError('password', 'Password length must be greater than 6');
      isValid = false;
    }
    if (isValid) {
      getData();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign-In</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onInputChangeHandler.bind(this, 'email')}
          value={loginDetails.email}
          onFocus={() => handleError('email', null)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onInputChangeHandler.bind(this, 'password')}
          value={loginDetails.password}
          onFocus={() => handleError('password', null)}
          secureTextEntry={true}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      {inValid.length > 0 && (
        <View>
          <Text style={styles.invalid}>{inValid}</Text>
        </View>
      )}
      <View>
        <Button title="Sign In" color="#e0a348" onPress={handleLogin} />
      </View>
      <View style={styles.signIn}>
        <Text>
          New to Amazon?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('CreateAccount')}>
            Create a new account
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  innerContainer: {
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  signIn: {
    marginTop: 15,
  },
  link: {
    color: '#2470bd',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 14,
  },
  invalid: {
    color: 'red',
    marginVertical: 4,
    fontSize: 14,
  },
});
