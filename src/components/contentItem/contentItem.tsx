import React, {memo} from 'react';
import styles from "./contentItem.module.scss";
import {PageEdge} from "~/cores/schema";
import Image from "next/image";
import useCalculateDate from "~/hooks/useCalculateDate";
import useTimeToRead from "~/hooks/useTimeToRead";
import {GrView} from "react-icons/gr";
import {AiOutlineRead} from "react-icons/ai";
import {BsDot} from "react-icons/bs";

interface Props {
  edge: PageEdge
}

const ContentItem: React.FC<Props> = memo(({edge}) => {
  const [year, month, day] = useCalculateDate(edge.node);
  const [timeToRead] = useTimeToRead(edge.node.content);

  return (
    <div className={styles.contentItemParent}>
      <article className={styles.contentChildren}>
        <div className={styles.imageBox}>
          <Image
            src={process.env.S3_URL + `/image/${edge.node.thumbnail}`}
            className={styles.img}
            objectFit="cover"
            layout="fill"
            alt="썸네일"
          />
        </div>
        <div className={styles.contentData}>
          <h2>{edge.node.title}</h2>
          <p>{edge.node.desc}</p>
        </div>
        <div className={styles.metaData}>
          <span>{`${month}월 ${day}일`}</span>
          <span>
            <BsDot/>
          </span>
          <span>{edge.node.likes?.length} 개의 좋아요</span>
        </div>
        <footer className={styles.footer}>
          <div className={styles.readTime}>
            <span>
              <AiOutlineRead/>
            </span>
            <span>{timeToRead}분</span>
          </div>
          <div className={styles.hit}>
            <span>
              <GrView/>
            </span>
            <span>{edge.node.hit?.length}</span>
          </div>
        </footer>
      </article>
    </div>
  );
});

export default ContentItem;