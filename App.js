import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { useState } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Tạo Stack Navigator
const Stack = createNativeStackNavigator();

// Home Screen
function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Text style={styles.homeText}>Welcome Home</Text>
      </View>
    </View>
  );
}

// Login Screen
function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorColor, setErrorColor] = useState('black');

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0[2-9])[0-9]{8}$/;
    if (phoneRegex.test(phone)) {
      setErrorMessage('Số điện thoại hợp lệ!');
      setErrorColor('green');
    } else {
      setErrorMessage('Số điện thoại không hợp lệ!');
      setErrorColor('red');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.t1}>Đăng Nhập</Text>
      <View style={styles.box}>
        <Text style={styles.t2}>Nhập số điện thoại</Text>
        <Text style={styles.t3}>Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          onChangeText={(text) => {
            setPhone(text);
            validatePhoneNumber(text);
          }}
          value={phone}
        />
        {errorMessage ? (
          <Text style={{ color: errorColor }}>{errorMessage}</Text>
        ) : null}
      </View>

      <Pressable
        style={[
          styles.button,
          errorMessage.includes('hợp lệ') ? styles.buttonActive : styles.buttonDisabled,
        ]}
        disabled={!errorMessage.includes('hợp lệ')}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

// App chính với Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  t1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  box: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 40,
  },
  t2: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  t3: {
    fontSize: 14,
    color: 'gray',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#007BFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    color: 'black',
    fontSize: 16,
  },
});