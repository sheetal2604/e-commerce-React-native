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
const CreateAccount = ({navigation}: any) => {
  type UserDetails = {
    name: string;
    email: string;
    password: string;
    reenterPassword: string;
  };
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    password: '',
    reenterPassword: '',
  });
  const [errors, setErrors] = useState<UserDetails>({
    name: '',
    email: '',
    password: '',
    reenterPassword: '',
  });
  const onInputChangeHandler = (inputIdentifier: any, enteredValue: any) => {
    setUserDetails(prevState => {
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
  const storeData = async (userDetail: any) => {
    try {
      const jsonValue = JSON.stringify(userDetail);
      await AsyncStorage.setItem('userData', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const onSubmitUserDetails = () => {
    let isValid = true;
    if (!userDetails.name) {
      handleError('name', 'Please enter your name');
      isValid = false;
    }
    if (!userDetails.email) {
      handleError('email', 'Please enter your email');
      isValid = false;
    } else if (!userDetails.email.match(/\S+@\S+\.+\S/)) {
      handleError('email', 'Please enter valid email address');
      isValid = false;
    }
    if (!userDetails.password) {
      handleError('password', 'Please enter password');
      isValid = false;
    } else if (userDetails.password.length <= 6) {
      handleError('password', 'Password length must be greater than 6');
      isValid = false;
    }
    if (!userDetails.reenterPassword) {
      handleError('reenterPassword', 'Please re-enter your password');
      isValid = false;
    } else if (userDetails.reenterPassword !== userDetails.password) {
      handleError('reenterPassword', 'Password does not match!');
      isValid = false;
    }
    if (isValid) {
      console.log('userDetails', userDetails);
      storeData(userDetails);
      setUserDetails({
        name: '',
        email: '',
        password: '',
        reenterPassword: '',
      });
      navigation.navigate('login');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Account</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Your Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onInputChangeHandler.bind(this, 'name')}
          value={userDetails.name}
          onFocus={() => handleError('name', null)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onInputChangeHandler.bind(this, 'email')}
          value={userDetails.email}
          onFocus={() => handleError('email', null)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onInputChangeHandler.bind(this, 'password')}
          value={userDetails.password}
          secureTextEntry={true}
          onFocus={() => handleError('password', null)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Re-Enter Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onInputChangeHandler.bind(this, 'reenterPassword')}
          value={userDetails.reenterPassword}
          secureTextEntry={true}
          onFocus={() => handleError('reenterPassword', null)}
        />
        {errors.reenterPassword && (
          <Text style={styles.errorText}>{errors.reenterPassword}</Text>
        )}
      </View>
      <View>
        <Button
          title="Create Your Amazon Account"
          color="#e0a348"
          onPress={onSubmitUserDetails}
        />
      </View>
      <View style={styles.signIn}>
        <Text>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('login')}>
            Sign-In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

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
});
