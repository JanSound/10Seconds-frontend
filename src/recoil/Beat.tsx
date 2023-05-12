import { atom } from 'recoil';
const initialState = [] as any;

// recoil + nextjs reload duplication error
const randomId = Math.random();
export const recoilBeatState = atom({
  key: `recoilBeatState/${randomId}`,
  default: initialState,
});
