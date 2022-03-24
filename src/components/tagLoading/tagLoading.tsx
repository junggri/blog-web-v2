import React, {memo} from 'react';
import styles from "./tagLoading.module.scss";

const TagLoading = memo(() => {

  return (
    <span className={styles.loading}
          style={{padding: `10px ${Math.ceil(Math.random() * 50) <= 16 ? 20 : 30}px`}}>
    </span>
  );
});

export default TagLoading;