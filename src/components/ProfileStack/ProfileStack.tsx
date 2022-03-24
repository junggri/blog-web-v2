import React, {FC, memo, useRef} from "react"
import styles from "./Profile.module.scss"
import classNames from "classnames";
import {GoPrimitiveSquare} from "react-icons/go";

interface Props {
  classname?: string
  data: { type: string, desc: string }
}


const ProfileStack: FC<Props> = memo(({classname, data}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const onClickWhyButton = () => {

  }

  return (
    <li className={classNames(styles.ProfileStack, classname)}>
      <div className={styles.list}>
        <div>
          <span><GoPrimitiveSquare/></span>
          <span>{data.type}</span>
        </div>
        <span className={styles.why} onClick={onClickWhyButton}>WHY</span>
      </div>
      <div className={styles.desc} ref={ref}>
        {data.desc}
      </div>
    </li>
  )
})


export default ProfileStack
