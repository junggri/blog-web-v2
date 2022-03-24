import React, {memo, useMemo} from "react";
import {HiOutlineDesktopComputer} from "react-icons/hi";
import styles from "../src/styles/404.module.scss";
import Header from "~/components/Header/header";
import HeaderNav from "~/components/headerNav/HeaderNav";

const Page404 = memo(() => {
  return (
    <div className={styles.page404}>
      <span>
        <span className={styles.font}>NOT FOUND</span>
      </span>
    </div>
  );
});


export default Page404;