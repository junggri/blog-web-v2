import React, {FC, memo, useCallback, useMemo, useState} from "react";
import Header from "~/components/Header/header";
import styles from "./tag.module.scss";
import {useQuery} from "@apollo/client";
import {GET_TAG_RELATION} from "~/cores/query";
import {Tag} from "~/cores/schema";
import TagPageItem from "~/components/tagPageItem/tagPageItem";
import Link from "next/link";
import {MdAttachFile} from "react-icons/md";

interface Props {
}

const TagPage: FC<Props> = memo(() => {
  const {data} = useQuery(GET_TAG_RELATION);
  const [tag, setTag] = useState<Tag | null>(null);

  const onClickTag = useCallback((target: Tag) => {
    setTag(target);
  }, [tag])

  const renderTag = useMemo(() => {
    if (!data) {
      return []
    }

    return data.getTags.map((e: Tag) => {
      return (
        <TagPageItem
          key={e.hashId}
          onClick={onClickTag}
          tag={e}
        />
      )
    })
  }, [data])


  const renderPost = useMemo(() => {
    if (!tag) {
      return []
    }

    return tag.post.map((e) => {
      return (
        <Link href={`/post/${e.hashId}`} key={e.hashId}>
          <a>
            <div className={styles.postItem}>
              <h1>{e.title}</h1>
              <h2>{e.desc}</h2>
            </div>
          </a>
        </Link>
      )
    })
  }, [tag])

  return (
    <div className={styles.tagPage}>
      <Header/>
      <section className={styles.tagBox}>
        <h1 className={styles.header}>{data?.getTags.length}개의 태그가 존재합니다.</h1>
        <div className={styles.tagContainer}>
          {renderTag}
        </div>
        {tag &&
        <div className={styles.relatedPost}>
            <div className={styles.postBox}>
              {renderPost}
            </div>
        </div>
        }
        {!tag &&
        <div className={styles.notRelated}>
            <span>
                <MdAttachFile/>
            </span>
        </div>
        }
      </section>
    </div>
  )
})
export default TagPage