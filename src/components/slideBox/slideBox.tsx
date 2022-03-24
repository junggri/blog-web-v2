import React, {FC, memo, useCallback, useEffect, useRef, useState} from "react";
import {Visitor} from "~/atom/google.atom";
import classNames from "classnames";
import styles from "./slideBox.module.scss"
import {BiChevronRight} from "react-icons/bi";

interface Props {
  visitor: Visitor | null
}

const SlideBox: FC<Props> = memo(({visitor}) => {
  const [showVisitor, setShowVisitor] = useState<boolean>(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);


  const onClickIcon = useCallback(() => {
    if (!iconRef.current || !slideRef.current) {
      return;
    }

    if (!showVisitor) {
      iconRef.current.style.transition = "0.7s all";
      slideRef.current.style.transition = "1s all";
      iconRef.current.style.transform = "rotateZ(180deg)";
      slideRef.current.style.transform = "translateX(0px)";
    } else {
      iconRef.current.style.transform = "rotateZ(0deg)";
      slideRef.current.style.transform = "translateX(-200px)";
    }

    setShowVisitor(!showVisitor);
  }, [iconRef, slideRef, showVisitor]);


  return (
    <>
      <div className={styles.icon}>
        <span
          onClick={onClickIcon}
          ref={iconRef}
        >
          <BiChevronRight/>
        </span>
      </div>
      <div className={styles.visitor} ref={slideRef}>
        <div>
          <span>전체 방문자</span>
          <span>{visitor?.getVisitor.totalsForAllResults.session}</span>
        </div>
        <div>
          <span>오늘의 방문자</span>
          <span>{visitor?.getVisitor.rows}</span>
        </div>
      </div>
    </>
  )
})

export default SlideBox