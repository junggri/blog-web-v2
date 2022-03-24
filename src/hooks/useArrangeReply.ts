import {Maybe, Reply} from "~/cores/schema";
import {useEffect, useMemo} from "react";
import {useRecoilState} from "recoil";
import {replyAtom} from "~/atom/reply.atom";

export interface IReplyHashTable {
  [index: string]: {
    node: Reply
    children: Reply[]
  }
}


export function useArrangeReply(reply: Maybe<Reply[]> | undefined): IReplyHashTable | undefined {
  const [, setReplyData] = useRecoilState(replyAtom);

  if(!reply){
    return
  }

  const arrangeReply = useMemo(() => {
    if (!reply) {
      return;
    }
    const replyHash: IReplyHashTable = {};


    function arrangeChildren(e: Reply) {
      if (!replyHash[e.id]) {
        replyHash[e.id] = {
          node: e,
          children: []
        };
      }

      if (e.parentId) {
        replyHash[e.parentId].children.push(e);
      }
    }

    reply.forEach((e) => {
      arrangeChildren(e);
    });

    return replyHash;

  }, [reply]);

  useEffect(() => {
    setReplyData(arrangeReply)
  }, [arrangeReply])

  return arrangeReply;
}