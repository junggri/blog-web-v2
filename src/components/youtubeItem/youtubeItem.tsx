import React, {FC, memo, useCallback, useState} from 'react'
import styles from "../../../pages/youtube/youtube.module.scss";
import {BiTime} from "react-icons/bi";
import Image from "next/image";
import {CgEye} from "react-icons/cg";
import {YouTubeItem} from "~/cores/interface";
import {bool} from "prop-types";

interface Props {
  data: YouTubeItem
  onClickTarget: (target: YouTubeItem) => void
}

const YoutubeItem: FC<Props> = memo(({data, onClickTarget}) => {
  const [click, setClick] = useState<boolean>(false);

  const arrangeTime = useCallback((time: string): string => {

    function removeChar(index: number): number {
      const reg = /[0-9]/;

      if (time[index - 1].match(reg)) {
        return removeChar(index - 1);
      }
      return index;
    }

    const idx = time.indexOf("S");

    if (idx !== -1) {
      const returnIndex = removeChar(idx)
      return time.slice(0, returnIndex)
    }

    return time;
  }, [])


  const calculateTime = (target: YouTubeItem) => {

    let time = arrangeTime(target.contentDetails.duration)

    const reg = [/PT/g, /H/g, /M/g];
    const replaceWord = [" ", "시간", "분"];

    reg.forEach((e, i) => {
      time = time.replace(reg[i], replaceWord[i]);
    });

    return time;
  }

  const handleClickTarget = useCallback(() => {
    onClickTarget(data);
    setClick(!click);
  }, [click]);

  const url = data.snippet.thumbnails.maxres ? data.snippet.thumbnails.maxres.url : data.snippet.thumbnails.high.url

  return (
    <div className={styles.youtubeItem} onClick={handleClickTarget}>
      <div className={styles.box}>
        <div className={styles.imgBox}>
          <div className={styles.times}>
            <div className={styles.dimmer}/>
            <span className={styles.timeIcon}><BiTime/></span>
            <span className={styles.timeText}>{calculateTime(data)}</span>
          </div>
          <Image src={url} objectFit="cover" layout="fill"/>
        </div>
        <div className={styles.metadata}>
          <h1>{data.snippet.localized.title}</h1>
          <div className={styles.bottom}>
            <div>
              <span>방송일자</span>
              <h2>{data.snippet.publishedAt.split("T")[0]}</h2>
            </div>
            <div>
              <div className={styles.view}>
                <div>조회 수</div>
                <div>
                  <span>{data.statistics.viewCount}</span>
                  <span>회</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default YoutubeItem;