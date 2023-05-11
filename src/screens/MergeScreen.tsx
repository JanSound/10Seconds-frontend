import FinishBtn from '@/common/button/FinishBtn';
import BeatListItem from '@/common/modal/BeatListItem';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface IBeat {
  id: string;
  name: string;
  instType: string;
  playTime: string;
  duration: string;
  checked: boolean;
  clicked: boolean;
}

const MergeScreen = (props: any) => {
  const { navigation, route } = props;
  const beats = route.params.beats;
  return (
    <>
      <LinearGradient
        colors={['#4FACF9', '#3A83F4']}
        style={styles.container}
      ></LinearGradient>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <View>
            <Text style={styles.titleText}>음악 병합하기</Text>
            <Text style={styles.subText}>
              내가 저장한 음악을 병합할 수 있어요
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <FinishBtn />
          </View>
        </View>
        {beats.map((beat: IBeat) => {
          return <BeatListItem beat={beat} key={beat.id} isEditing={true} />;
        })}
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
    paddingTop: 15,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
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
