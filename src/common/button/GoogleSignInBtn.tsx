import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
const GoogleSignInBtn = (props: any) => {
  const { isLoggedIn, userInfo, requestGoogleLogin } = props;
  return (
    <View style={styles.googleLogin}>
      <GoogleSigninButton
        style={{ borderRadius: 30 }}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={requestGoogleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  googleLogin: {},
});

export default GoogleSignInBtn;
