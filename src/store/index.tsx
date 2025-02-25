import { atom } from "recoil";

export const menuAtom = atom({
  key: "openedMenu",
  default: false,
});

export const globePhaseAtom = atom({
  key: "globePhase",
  default: 0,
});

export const selectedGlobeMarkerAtom = atom<number | null>({
  key: "globeMarkerOpen",
  default: null,
});
