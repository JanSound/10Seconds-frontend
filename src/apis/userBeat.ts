import { recoilBeatState } from '@/recoil/Beat';
import { IBeat } from '@/types/beat';
import axios from 'axios';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

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

export const playBeat = async (path: string) => {
  try {
    await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener(() => {});
  } catch (err) {
    console.log('playBeat 오류:', err);
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
    .post(
      'http://43.200.7.58:8001/api/v1/convert-beat',
      {
        key: beatKey,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      // console.log('DB 저장 성공:', res.data);
      return res.data;
    })
    .catch(() => {
      throw 'DB 저장 ERROR';
    });
};

export const saveBeat = async (beatType: string, key: string) => {
  axios.post('http://43.200.7.58:8001/api/v1/beats', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    beatType: beatType,
    key: key,
  });
};

export const deleteBeats = async (deleteBeats: IBeat[]) => {
  deleteBeats.map((beat: IBeat) => {
    axios.delete(`http://43.200.7.58:8001/api/v1/beats/${beat.id}`, {
      headers: {
        accept: 'application/json',
      },
    });
  });
};

export const getMergeBeat = async (checkedBeats: []) => {
  return await axios.post('http://43.200.7.58:8001/api/v1/stack-beats', {
    beats: checkedBeats,
  });
};
