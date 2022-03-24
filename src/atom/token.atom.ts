import {atom, AtomEffect} from "recoil";

const localStorageEffect: (key: string) => AtomEffect<string | null> = key => ({setSelf, onSet}) => {
  if (typeof window !== "object") {
    return;
  }

  const token = localStorage.getItem(key);
  if (token) {
    setSelf(token)
  }

  onSet(newValue => {

    if (newValue) {
      localStorage.setItem(key, newValue);
    } else {
      localStorage.removeItem(key);
    }
  });
};

export const tokenAtom = atom({
  key: "tokenAtom",
  default: null,
  effects_UNSTABLE: [
    localStorageEffect("token")
  ]
})