import React, {FC, memo, useCallback, useEffect, useState} from "react";
import styles from "./HeaderNav.module.scss";
import Layout from "~/component-system/Layout/layout";
import Modal from "~/component-system/Modal/modal";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FiTrendingUp} from "react-icons/fi"
import Link from 'next/link';
import classNames from "classnames";

interface Props {

}

const HeaderNav: FC<Props> = memo(() => {
  const [click, setClick] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);


  const configs = [
    {name: "연락하기", href: "/contact"},
    {name: "라이브 스트리밍", href: "/youtube"},
    {name: "프로필", href: "https://distinct-ground-518.notion.site/1fed7f6beaac4b5b86eaf7dbc9771e29"}
  ];

  const onClickIcon = useCallback(() => {
    setClick(!click);
  }, [click]);

  const onClickTagButton = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  useEffect(() => {
    const setFalse = () => {
      if (click) {
        setClick(false);
      }
    };

    window.addEventListener("click", setFalse);
    return () => window.removeEventListener("click", setFalse);
  }, [click]);

  return (
    <Layout className={styles.nav}>
      <div className={styles.left}>
        <div>
          <Link href="/">
            <a>
              <span>포스트</span>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/tag">
            <a>
              <span onClick={onClickTagButton}>태그</span>
            </a>
          </Link>
        </div>
        <div onClick={() => {
          alert("준비중입니다.")
        }}>
          {/*<Link href={"https://brunch.co.kr/@0ab6a1f3d75e468"}>*/}
          {/*  <a href="https://brunch.co.kr/@0ab6a1f3d75e468" target={"_blank"}>*/}
          <span>브런치</span>
          {/*</a>*/}
          {/*</Link>*/}
        </div>
        <div>
          <Link href={"/youtube"}>
            <a>
              <span>라이브 스트리밍</span>
              <span className={styles.icon}>
                <FiTrendingUp/>
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.right} onClick={onClickIcon}>
        <div><BsThreeDotsVertical/></div>
        <div className={classNames(styles.modalContainer, {[styles.show]: click})}>
          <Modal config={configs} click={click}/>
        </div>
      </div>
    </Layout>
  );
});

export default HeaderNav;
