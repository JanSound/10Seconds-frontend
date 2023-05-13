import { recoilBeatState } from '@/recoil/Beat';
import axios from 'axios';
import { useRecoilState } from 'recoil';

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
    //   const beatList: IBeat[] = fetchData.data; // 배열
    if (Array.isArray(fetchData)) {
      const beatList = fetchData.data; // 배열
      return beatList;
    }
    throw 'getUserBeats FETCH ERROR';
  } catch (error) {
    console.log('getUserBeats error :', error);
  }
};
