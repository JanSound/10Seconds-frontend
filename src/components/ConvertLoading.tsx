import React, { useEffect } from 'react';
import { Text, ActivityIndicator, StyleSheet, View } from 'react-native';

const ConvertLoading = (props: any) => {
  const { navigation, setConverting } = props;
  useEffect(() => {
    // 임의로 2초를 딜레이로 줌. 추후 악기 변환이 완료되면 라우팅되도록 수정.
    setTimeout(() => {
      setConverting(false);
      navigation.navigate('Select');
    }, 2000);
  });
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator
        style={{ transform: [{ scaleX: 6 }, { scaleY: 6 }] }}
        size="large"
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    marginTop: 100,
  },
});

export default ConvertLoading;
