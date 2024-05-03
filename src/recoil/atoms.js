import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: { userName: '', loginStatus: false },
});

export const isVisibleState = atom({
    key: 'isVisibleState',
    default: false,
  });

export const selectedQuestionsState = atom({
    key: 'selectedQuestionsState',
    default: [],
});