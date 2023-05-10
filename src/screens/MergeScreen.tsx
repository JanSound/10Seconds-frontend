import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MergeScreen = (props: any) => {
  const { navigation } = props;
  return (
    <>
      <LinearGradient
        colors={['#4FACF9', '#3A83F4']}
        style={styles.container}
      ></LinearGradient>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.titleText}>음악 병합하기</Text>
          <Text style={{ fontSize: 16, opacity: 0.3 }}>
            내가 저장한 음악을 병합할 수 있어요
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 15,
    backgroundColor: 'white',
    paddingLeft: 20,
    marginTop: 15,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'NotoSansKR-Bold',
  },
  subText: {
    fontSize: 16,
    opacity: 0.3,
  },
});

export default MergeScreen;
