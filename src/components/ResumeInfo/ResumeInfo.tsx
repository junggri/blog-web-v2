import React, {memo} from 'react'
import styles from "./ResumeInfo.module.scss"
// import BsTelephone from 'react-icons/bs'

const ResumeInfo = memo(({}) => {

  return (
    <div className={styles.ResumeInfo}>
      <div className={styles.header}>
      </div>
      <div>
        <span>P</span>
        <span>+82.10.7765.2103</span>
      </div>
      <div>
        <span>E</span>
        <span>ghghgh6933@gmail.com</span>
      </div>
      <div>
        <span>G</span>
        <span>https://github.com/junggri</span>
      </div>
      <div>
        <span>Y</span>
        <span>
          <a href="https://www.youtube.com/channel/UCYMk5JNU9mzsaP-ZhhgXpgg" target={"_blank"} rel="noreferrer">
            Link
          </a>
        </span>
      </div>
    </div>
  )
})

export default ResumeInfo
