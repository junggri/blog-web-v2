import React, {FC, memo, useCallback} from "react"
import Ink from "react-ink";
import {Tag} from "~/cores/schema";
import styles from "./tagPageItem.module.scss"

interface Props {
  tag: Tag
  onClick: (target: Tag) => void
}

const TagPageItem: FC<Props> = memo(({tag, onClick}) => {

  const onClickTag = useCallback(() => {
    onClick(tag)
  }, [tag])

  return (
    <div className={styles.item}>
      <h1 onClick={onClickTag}>
        {tag.tag}
        <Ink/>
      </h1>
    </div>
  )
})

export default TagPageItem