import React, {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import {useQuery} from "@apollo/client";
import {YOUTUBE} from "~/cores/query";
import {useLoadMore} from "~/hooks/useLoadMore";
import styles from "./youtube.module.scss";
import {YouTubeItem} from "~/cores/interface";
import Header from "~/components/Header/header";
import HeaderNav from "~/components/headerNav/HeaderNav";
import Spinner from "~/components/spinner/spinner";
import YoutubeItem from "~/components/youtubeItem/youtubeItem";
import {FiXCircle} from "react-icons/fi";
import {ImLink} from "react-icons/im";
import SeoHeader from "~/components/SeoHead/head";

interface Props {

}

interface IYOUTUBE {
  nextPageToken: string | null
  list: YouTubeItem[]
}


const Youtube: FC<Props> = memo(() => {
  const [youtubeState, setYoutubeState] = useState<IYOUTUBE>({nextPageToken: null, list: []});
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [frameTarget, setFrameTarget] = useState<YouTubeItem | null>(null);
  const {data, loading, error, fetchMore} = useQuery(YOUTUBE,
    {
      variables: {
        data: {
          nextPageToken: null
        }
      }
    });

  const onClickTarget = useCallback((target) => {
    setFrameTarget(target);
  }, []);


  const renderIFrame = useMemo(() => {
    if (!frameTarget) {
      return null;
    }

    return (
      <>
        <SeoHeader
          title={"라이브 스트리밍 보기"}
          image={``}
          desc={"정그리 라이브 스트리밍 보기"}
          url={`https://junggri.com/youtube`}
        />
        <div className={styles.iframe}>
          <div className={styles.header}>
            <span onClick={() => setFrameTarget(null)}><FiXCircle/></span>
          </div>
          <iframe src={`https://www.youtube-nocookie.com/embed/${frameTarget.id}`} allowFullScreen={true}
                  className={styles.frame}/>
          <div className={styles.metadata}>
            <h1>{frameTarget.snippet.title}</h1>
            <div className={styles.date}>
              <span>발송날짜</span>
              <span>{frameTarget.snippet.publishedAt.split("T")[0]}</span>
            </div>
            <div className={styles.hit}>
              <span>조회 수</span>
              <span>{frameTarget.statistics.viewCount}</span>
            </div>
            <div className={styles.link}>
              <span><ImLink/></span>
              <a
                href={`https://www.youtube.com/watch?v=${frameTarget.id}`}
                target="_blank" key={frameTarget.id} rel="noreferrer">
                유튜브 채널가기
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }, [frameTarget]);

  const listRender = useMemo(() => {
    return youtubeState.list.map((e, i) => {
      return (
        <YoutubeItem
          key={e.id}
          data={e}
          onClickTarget={onClickTarget}
        />
      );
    });
  }, [youtubeState]);

  useLoadMore(() => {
    if (!youtubeState || !youtubeState.nextPageToken) {
      return;
    }
    setLoadMore(true);
    fetchMore({
      variables: {
        data: {
          nextPageToken: youtubeState.nextPageToken
        }
      },
      updateQuery: (previousQueryResult, {fetchMoreResult}: any) => {
        if (fetchMoreResult === undefined || !fetchMoreResult) {
          return previousQueryResult;
        }

        const newData: IYOUTUBE = {
          nextPageToken: fetchMoreResult.getVideos.nextPageToken,
          list: [...youtubeState.list, ...JSON.parse(fetchMoreResult.getVideos.data)]
        };
        setYoutubeState(newData);
        setLoadMore(false);
      }
    });
  });


  useEffect(() => {
    if (!data) {
      return;
    }

    setYoutubeState({nextPageToken: data.getVideos.nextPageToken, list: JSON.parse(data.getVideos.data)});
  }, [data]);


  return (
    <div className={styles.container}>
      <Header/>
      <HeaderNav/>
      <section className={styles.youtubeList}>
        {data && listRender}
        {loading && <Spinner/>}
        {loadMore &&
        <div className={styles.loadBox}>
           <Spinner/>
        </div>
        }
      </section>
      {frameTarget && renderIFrame}
    </div>
  );
});

export default Youtube;