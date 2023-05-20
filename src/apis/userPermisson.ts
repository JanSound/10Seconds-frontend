import { useRecoilState } from 'recoil';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import { Alert, Linking } from 'react-native';

export const requestRecordPermission = async () => {
  await requestMultiple([
    PERMISSIONS.IOS.SPEECH_RECOGNITION,
    PERMISSIONS.IOS.MICROPHONE,
  ])
    .then((status) => {
      if (
        status[PERMISSIONS.IOS.SPEECH_RECOGNITION] &&
        status[PERMISSIONS.IOS.MICROPHONE]
      )
        console.log('권한 얻기 성공');
    })
    .catch((e) => {
      console.log('request API 에러 : ', e);
    });
};

export const checkRecordPermission = async () => {
  const checkPermission = await checkMultiple([
    PERMISSIONS.IOS.MICROPHONE,
    PERMISSIONS.IOS.SPEECH_RECOGNITION,
  ])
    .then((status) => {
      console.log(
        'speech recognition 권한:',
        status[PERMISSIONS.IOS.SPEECH_RECOGNITION],
      );
      console.log('microphone 권한:', status[PERMISSIONS.IOS.MICROPHONE]);
      return [
        status[PERMISSIONS.IOS.SPEECH_RECOGNITION],
        status[PERMISSIONS.IOS.MICROPHONE],
      ];
    })
    .catch((e) => {
      console.log('check API 에러 :', e);
    });
  return checkPermission;
};

export const alertMikePermissionDenied = () => {
  Alert.alert('마이크 접근 권한 거부', '마이크 접근 권한을 허용해주세요 !', [
    {
      text: 'OK',
      onPress: () => Linking.openSettings(),
    },
  ]);
};
