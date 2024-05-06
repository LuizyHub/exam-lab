import { atom } from 'recoil';

// ID 상태에 대한 atom
export const IDState = atom({
  key: 'IDState',
  default: '',
});

// isResQuestion 상태에 대한 atom
export const ResQuestionState = atom({
  key: 'ResQuestionState',
  default: '',
});

// isResOption 상태에 대한 atom
export const ResOptionState = atom({
  key: 'ResOptionState',
  default: [],
});

// isResUrlIn 상태에 대한 atom
export const ResUrlInState = atom({
  key: 'ResUrlInState',
  default: [],
});

// isResUrlOut 상태에 대한 atom
export const ResUrlOutState = atom({
  key: 'ResUrlOutState',
  default: [],
});

// isResUrlOutDes 상태에 대한 atom
export const ResUrlOutDesState = atom({
  key: 'ResUrlOutDesState',
  default: [],
});
