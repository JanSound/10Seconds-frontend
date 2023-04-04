import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

const GoogleSignInBtn = (props: any) => {
  const { isLoggedIn, userInfo, requestGoogleLogin } = props;

  return (
    <View style={styles.googleLogin}>
      <TouchableOpacity
        style={styles.googleSigninButton}
        onPress={requestGoogleLogin}
      >
        <Image source={require('../../assets/images/google.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  googleLogin: {
    alignItems: 'center',
    flex: 1.5,
  },
  googleSigninButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default GoogleSignInBtn;
