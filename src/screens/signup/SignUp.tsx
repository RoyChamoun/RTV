import React from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import useSignUp from '../../hooks/useSignUp';
import styles from './signUpStyle';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSignup,
    isFormIncomplete,
  } = useSignUp();
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/signup.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        {error && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              isFormIncomplete ? styles.buttonDisabled : null,
            ]}
            onPress={handleSignup}
            disabled={isFormIncomplete}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogIn' as never)}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
