import {atom} from "recoil";
import {Tag} from "~/cores/schema";

export const tagAtom = atom<Tag[] | null>({
  key: "tagAtom",
  default: null
});