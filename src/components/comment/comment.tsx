import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import styles from "./comment.module.scss";
import {Maybe, Reply} from "~/cores/schema";
import classNames from "classnames";
import ReplyInputBox from "~/components/replyInputBox/replyInputBox";
import {useRecoilState} from "recoil";
import {replyAtom} from "~/atom/reply.atom";
import useCalculateDate from "~/hooks/useCalculateDate";
import {TiMinus, TiPlus} from 'react-icons/ti';
import Typography from "~/component-system/Typography/Typography";

interface Props {
  data: { node: Reply, children?: Reply[] }
  upsertReply: any
  hashId: string
  parentId: Maybe<number> | undefined
  className?: string
  title: string
}

const Comment: FC<Props> = memo(({data, upsertReply, hashId, parentId, className, title}) => {
  const [year, month, date] = useCalculateDate(data.node);
  const [renderChildren, setRenderChildren] = useState<Boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [replyData] = useRecoilState(replyAtom);

  const onClickDepthReply = useCallback(() => {
    setRenderChildren(!renderChildren);
  }, [renderChildren]);

  const onClickReplyButton = useCallback(() => {
    setClick(!click);
  }, [click]);


  const children = useMemo(() => {
    if (!data.children || !replyData) {
      return;
    }
    return data.children.map((e) => {
      return (
        <Comment
          data={replyData[e.id]}
          key={e.hashId}
          upsertReply={upsertReply}
          hashId={hashId}
          parentId={e.id}
          className={styles.depth}
          title={title}
        />
      );
    });
  }, [replyData]);


  const calculateReplyLength = useMemo(() => {

    if (!data.children) {
      return 0;
    }

    function findChildLength(cur: Reply): number {
      if (!replyData) {
        return 0;
      }
      let count = 0;
      if (replyData[cur.id].children) {
        replyData[cur.id].children.forEach(e => count += findChildLength(e));
      }
      count += replyData[cur.id].children.length;
      return count;
    }

    return data.children.reduce((pre, cur, i) => {
      return pre + findChildLength(cur);
    }, data.children.length);

  }, [data, replyData]);

  const renderAfterCreate = () => {
    setRenderChildren(true);
  };


  return (
    <div className={classNames(styles.reply, className)}
         style={{
           border: `1px solid rgba(0,0,0,${data.node.depth === 1 ? 0 : data.node.depth * 0.1})`,
           borderRadius: "5px",
           borderBottom: `1px solid rgba(0,0,0,${data.node.depth === 1 ? 0.1 : data.node.depth * 0.1})`,
         }}>
      <div className={styles.user}>
      </div>
      <div className={styles.replyInfo}>
        <Typography component="h3" className={styles.writer}>{data.node.writer}</Typography>
        <Typography component="h3" className={styles.createdAt}>{`${year}년 ${month}월 ${date}일`}</Typography>
        <article>
          {data.node.comment}
        </article>
        {data.children?.length
          ?
          <>
            <div className={classNames(styles.replyChildrenCommon)}
                 onClick={onClickDepthReply}>
              {!renderChildren
                ? <span className={styles.icon}><TiPlus/>{calculateReplyLength} 개의 답글</span>
                : <span className={styles.icon}><TiMinus/>접기</span>}
            </div>
            {renderChildren &&
            <div className={classNames(styles.children)}>
              {children}
                <ReplyInputBox
                    title={title}
                    upsertReply={upsertReply}
                    hashId={hashId}
                    parentId={parentId}
                    className={styles.childrenReply}
                    placeHolder={`"${data.node.comment}"에 관하여 댓글을 남겨주세요.`}
                    renderAfterCreate={renderAfterCreate}
                />
            </div>
            }
          </>
          : <>
            <div className={classNames(styles.replyChildrenCommon)} onClick={onClickReplyButton}>
              {click
                ? <span className={styles.icon}><TiMinus/>접기</span>
                : <span className={styles.icon}><TiPlus/>댓글 달기</span>
              }
            </div>
            {click &&
            <ReplyInputBox
                title={title}
                upsertReply={upsertReply}
                hashId={hashId}
                className={styles.childrenReply}
                parentId={parentId}
                renderAfterCreate={renderAfterCreate}
                placeHolder={`"${data.node.comment}"에 관하여 댓글을 남겨주세요.`}
            />
            }
          </>
        }
      </div>
    </div>
  );
});

export default Comment;

