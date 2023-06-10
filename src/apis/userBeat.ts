import { recoilBeatState } from '@/recoil/Beat';
import { IBeat } from '@/types/beat';
import axios from 'axios';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const baseUrl = 'https://cau-tensecond.s3.ap-northeast-2.amazonaws.com/';

export const getUserBeats = async () => {
  try {
    const fetchData = await axios.get('http://43.200.7.58:8001/api/v1/beats');
    if (Array.isArray(fetchData.data)) {
      const beatList: IBeat[] = fetchData.data; // 배열
      return beatList;
    } else throw 'getUserBeats FETCH ERROR';
  } catch (error) {
    console.log('getUserBeats error :', error);
  }
};

export const getPresignedUrl = async () => {
  try {
    return await axios
      .post('http://43.200.7.58:8001/api/v1/beats/presigned-url/put')
      .catch(() => {
        throw 'PRESIGNED-ERROR';
      });
  } catch (error) {
    console.log('PRESIGNED-URL GET ERROR:', error);
  }
};

export const playVoice = async (path: string) => {
  try {
    await audioRecorderPlayer.startPlayer(`${baseUrl}${path}`);
    audioRecorderPlayer.addPlayBackListener(() => {});
  } catch (err) {
    console.log('playVoice 오류:', err);
  }
};

export const uploadBeat = async (presignedUrl: string, bufferFile: Buffer) => {
  return await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'audio/m4a',
    },
    body: bufferFile,
  })
    .then(() => console.log('S3 업로드 성공'))
    .catch(() => {
      throw 'UPLOAD-ERROR';
    });
};

export const convertBeat = async (beatKey: string) => {
  console.log('beatKey:', beatKey);
  return await axios
    .post('http://43.200.7.58:8001/api/v1/convert-beat', {
      key: beatKey,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('convert 성공 data:', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log('convertBeat error:', e);
      throw '비트변환 ERROR';
    });
};

export const saveBeat = async (beatType: string, key: string) => {
  axios
    .post('http://43.200.7.58:8001/api/v1/beats', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      beatType: beatType,
      key: key,
    })
    .then((res) => console.log('디비 저장 성공'));
};

const deleteBeatFunction = async (id: string) => {
  console.log('delete id:', id);
  return await axios
    .delete(`http://43.200.7.58:8001/api/v1/beats/${id}`, {
      headers: {
        accept: 'application/json',
      },
    })
    .catch((e) => console.log('delete ERROR:', e));
};
export const deleteBeats = async (deleteBeats: IBeat[]) => {
  const promises = deleteBeats.map((beat: IBeat) =>
    deleteBeatFunction(beat.id),
  );
  Promise.all(promises);
  console.log('delete 완료 !');
};

export const getMergeBeat = async (checkedBeats: []) => {
  return await fetch('http://43.200.7.58:8001/api/v1/stack-beat', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkedBeats),
  });
};
