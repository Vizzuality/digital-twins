import { atom } from 'recoil';

export const menuAtom = atom({
  key: 'openedMenu',
  default: false,
});