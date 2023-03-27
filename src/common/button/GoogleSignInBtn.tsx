import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
const GoogleSignInBtn = (props: any) => {
  const { isLoggedIn, requestGoogleLogin } = props;
  return (
    <View style={styles.googleLogin}>
      {isLoggedIn === false ? (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={requestGoogleLogin}
        />
      ) : (
        <Text>로그인 완료!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  googleLogin: {
    flex: 1,
    alignItems: 'center',
  },
});

export default GoogleSignInBtn;
