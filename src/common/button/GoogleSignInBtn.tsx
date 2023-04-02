import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
const GoogleSignInBtn = (props: any) => {
  const { isLoggedIn, userInfo, requestGoogleLogin } = props;
  return (
    <View style={styles.googleLogin}>
      {isLoggedIn === false ? (
        <GoogleSigninButton
          style={{ borderRadius: 30 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={requestGoogleLogin}
        />
      ) : (
        <Text>{userInfo.name}님 로그인 완료!</Text>
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
