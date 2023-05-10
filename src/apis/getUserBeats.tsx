import axios from 'axios';

// interface IBeat {
//   id: string;
//   name: string;
//   instType: string;
//   playTime: string;
//   duration: string;
//   checked: boolean;
//   clicked: boolean;
// }

export const getUserBeats = async () => {
  const fetchData = await axios.get('http://43.200.7.58:8001/api/v1/beats');
  //   const beatList: IBeat[] = fetchData.data; // 배열
  const beatList = fetchData.data; // 배열
  return beatList;
};
