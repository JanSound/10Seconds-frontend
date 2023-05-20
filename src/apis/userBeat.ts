import { recoilBeatState } from '@/recoil/Beat';
import axios from 'axios';

interface IBeat {
  id: string;
  name: string;
  beatType: string;
  presignedUrl: string;
  createdAt: string;
  checked: boolean;
  clicked: boolean;
}

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
