import React, {FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {GetStaticProps} from "next";
import {ApolloQueryResult} from "@apollo/client/core/types";
import client from "~/cores/apolloClient";
import {GET_HASHIDS, GET_LIST, GET_POST} from "~/cores/query";
import {Post} from "~/cores/schema";
import styles from "./hashid.module.scss";
import Layout from '~/component-system/Layout/layout';
import Typography from "~/component-system/Typography/Typography";
import useCalculateDate from "~/hooks/useCalculateDate";
import useTimeToRead from "~/hooks/useTimeToRead";
import {AiOutlineRead} from "react-icons/ai";
import {useMutation} from "@apollo/client";
import {CREATE_HIT, CREATE_LIKE, UPSERT_REPLY} from "~/cores/mutation";
import Comment from "~/components/comment/comment";
import ReplyInputBox from "~/components/replyInputBox/replyInputBox";
import produce from "immer";
import {useRecoilState} from "recoil";
import {replyAtom} from "~/atom/reply.atom";
import {useArrangeReply} from "~/hooks/useArrangeReply";
import {HiHome} from "react-icons/hi";
import {ImArrowUp} from 'react-icons/im';
import {useRouter} from "next/router";
import {FcApproval} from 'react-icons/fc';

import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';


import 'tui-color-picker/dist/tui-color-picker.css';

import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import SeoHeader from "~/components/SeoHead/head";
import {useCopyToClipboard} from "react-use";
import classNames from "classnames";
import {IResult} from "~/hooks/useGetLikeList";


interface Props {
  post: Post
}

const HashId: FC<Props> | null = ({post}: Props) => {
  const router = useRouter();
  const [likeList, setLikeList] = useState<string[]>([])

  const likeRef = useRef<HTMLDivElement | null>(null)

  useArrangeReply(post ? post.reply : undefined);

  const [year, month, day] = useCalculateDate(post);
  const [timeToRead] = useTimeToRead(post ? post.content : undefined);

  const [createLike, likeMetaData] = useMutation(CREATE_LIKE)
  const [createHit, hitMetaData] = useMutation(CREATE_HIT);
  const [upsertReply, {data, error, loading}] = useMutation(UPSERT_REPLY);

  const [replyData, setReplyData] = useRecoilState(replyAtom);

  const [link, setLink] = useState<boolean>(false)
  const [, copyToClipboard] = useCopyToClipboard();


  const getLikeList = async () => {
    const {data} = await client.query<IResult>({query: GET_LIST, errorPolicy: "all", fetchPolicy: "no-cache"})
    setLikeList(data.getLikeList)
  }

  const onClickLikeBtn = async () => {
    createLike({
      variables: {
        data: {postHashId: post.hashId},
      },
      errorPolicy: "all",
      fetchPolicy: 'no-cache'
    })
  }


  const renderTag = useMemo(() => {
    if (!post) {
      return []
    }

    return post.tag.map((e) => {
      return (
        <li key={e.hashId}>{e.tag}</li>
      );
    });
  }, [post]);


  const renderReply = useMemo(() => {
    if (!replyData) {
      return [];
    }

    return Object.values(replyData).filter((e) => e.node.depth === 1)
      .map((e) => {
        return (
          <Comment
            title={post.title}
            data={e}
            key={e.node.hashId}
            upsertReply={upsertReply}
            hashId={post.hashId}
            parentId={e.node.id}
          />
        );
      });
  }, [replyData]);


  const childrenRender = useMemo(() => {
    if (!renderReply) {
      return;
    }

    return Object.values(renderReply).length;
  }, [replyData]);

  const onClickGotoHome = useCallback(() => {
    router.push("/");
  }, []);

  const onClickGotoTop = useCallback(() => {
    window.scrollTo({top: 0});
  }, []);

  const copyLink = () => {
    const prefix = process.env.NODE_ENV === "development" ? "http://localhost:3000/post" : "https://www.junggri.com/post"
    copyToClipboard(prefix + post.hashId)
    setLink(true)
    if (!link) {
      setTimeout(() => setLink(false), 2000)
    }
  }
  useEffect(() => {
    if (!likeMetaData.data) {
      return
    }

    setLikeList(likeMetaData.data.createLike)
  }, [likeMetaData])

  useEffect(() => {
    getLikeList()
  }, [])

  useLayoutEffect(() => {
    if (!likeRef.current || !likeList) return

    if (likeList.includes(post.hashId)) {
      likeRef.current.style.background = "#f15a5a"
    } else {
      likeRef.current.style.background = "white"
    }
  }, [likeList])

  useEffect(() => {
    createHit({
      variables: {
        data: {
          postHashId: post.hashId
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!replyData) {
      return;
    }

    const updateData = produce(replyData, (draft) => {
      draft[data.upsertReply.id] = {
        node: data.upsertReply,
        children: []
      };

      if (draft[data.upsertReply.parentId]) {
        draft[data.upsertReply.parentId].children.push(data.upsertReply);
      }
    });

    setReplyData(updateData);
  }, [data]);

  if (!post) {
    return null;
  }


  if (router.isFallback) {
    return <div>...로딩중</div>
  }


  return (
    <div className={styles.post}>
      <div className={classNames(styles.linkBox, {[styles.animation]: link})}>
        <div><FcApproval/></div>
        <div>주소가 복사되었습니다.</div>
      </div>
      <SeoHeader
        title={post.title}
        image={process.env.S3_URL + `/image/${post.thumbnail}`}
        desc={post.desc}
        url={`https://junggri.com/post/${post.hashId}`}
      />
      <Layout className={styles.header}>
        <Typography component="h1">
          {post.title}
        </Typography>
        <Typography component="h2">
          {post.desc}
        </Typography>
        <div className={styles.metaInfo}>
          <div>
            <span>{`${year}년 ${month}월 ${day}일`}</span>
          </div>
          <div className={styles.readTime}>
            <span>
              <AiOutlineRead/>
            </span>
            <span>{timeToRead}분</span>
          </div>
        </div>
        <div className={styles.tags}>
          <ul>
            {renderTag}
          </ul>
        </div>
      </Layout>
      <Layout className={styles.contentBody}>
        {post.content &&
        <div dangerouslySetInnerHTML={{__html: post.content.trim()}}/>
        }
      </Layout>
      <Layout className={styles.iconsBox}>
        <div onClick={onClickGotoHome}><HiHome/></div>
        <div onClick={onClickGotoTop}><ImArrowUp/></div>
      </Layout>
      <Layout className={styles.reply}>
        <div className={styles.replyHeader}>
          <span>{childrenRender}개의 댓글</span>
        </div>
      </Layout>
      <ReplyInputBox
        title={post.title}
        upsertReply={upsertReply}
        hashId={post.hashId}
        parentId={null}
      />
      <Layout className={styles.replyBox}>
        {renderReply}
      </Layout>
    </div>
  );
};

export const getStaticPaths = async () => {
  interface IHashIds {
    getHashIdsToBuild: {
      __typename: string
      hashIds: string[]
    }
  }

  const {data: {getHashIdsToBuild: {hashIds}}}: ApolloQueryResult<IHashIds> = await client.query({
    query: GET_HASHIDS,
    errorPolicy: "all",
    fetchPolicy: "no-cache"
  });


  const paths = hashIds.map((id) => ({
    params: {hashid: id}
  }));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const {data: {post}} = await client.query({
    query: GET_POST,
    variables: {
      data: {hashId: params.hashid},
    },
    fetchPolicy: "no-cache"
  });


  return {
    props: {
      post
    },
  };
};

export default HashId;
