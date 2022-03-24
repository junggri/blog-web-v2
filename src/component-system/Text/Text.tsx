import React, {FC, memo, ReactNode} from 'react'
import styles from "./Text.module.scss"
import classNames from "classnames";

interface Props {
  classname?: string
  children: ReactNode | string
}

const TextFiled: FC<Props> = memo(({classname, children}) => {
  return (
    <div className={classNames(styles.text, classname)}>
      {children}
    </div>
  )
})
export default TextFiled
