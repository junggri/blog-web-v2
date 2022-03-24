import React, {FC, memo, useState} from "react"
import styles from "./tagItem.module.scss"
import {Tag} from "~/cores/schema";
import classNames from "classnames";

interface Props {
  tag: Tag
  onClickTag: (target: number) => void
}

const TagItem: FC<Props> = memo(({tag, onClickTag}) => {
  const [click, setClick] = useState<boolean>(false)
  const handleClick = () => {
    onClickTag(tag.id)
    setClick(!click)
  }

  return (
    <span className={classNames(styles.tagItem, {[styles.clicked]: click})} onClick={handleClick}>
      {tag.tag}
    </span>
  )
})

export default TagItem