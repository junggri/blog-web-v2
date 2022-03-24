import {atom} from "recoil";
import {IReplyHashTable} from "~/hooks/useArrangeReply";


export const replyAtom = atom<IReplyHashTable | undefined>({
  key: "replyAtom",
  default: undefined
});