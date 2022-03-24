import React, {FC, memo} from 'react'
import styles from "./CustomH1.module.scss"
import classNames from "classnames";

interface Props {
  classname?: string
  children: any
}

const CustomH1: FC<Props> = memo(({classname, children}) => {
  return (
    <h1 className={classNames(styles.h1, classname)}>{children}</h1>
  )
})
export default CustomH1
