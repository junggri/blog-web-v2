import React, {FC, memo, useEffect} from 'react';
import styles from "./tag.module.scss";
import classNames from "classnames";
import {useQuery} from "@apollo/client";
import {GET_TAG_RELATION} from "~/cores/query";
import {useRecoilState} from "recoil";
import {tagAtom} from "~/atom/tag.atom";
import {Portal} from "react-portal";

interface Props {
  showModal: boolean
}

const Tag: FC<Props> = memo(({showModal}) => {
  const [tags, setTags] = useRecoilState(tagAtom);


  return (
    <Portal>
      <div className={styles.tag}>
        <div className={classNames(styles.dimmer, {[styles.dimmerShow]: showModal})}/>
        <div className={classNames(styles.container, {[styles.show]: showModal})}>
          <div>태그목록</div>
        </div>
      </div>
    </Portal>
  );
});

export default Tag;