import React, {FC, memo} from 'react';
import styles from "./aside.module.scss";
import Layout from "~/component-system/Layout/layout";

interface Props {

}

const Aside: FC<Props> = memo(() => {
  return (
    <Layout className={styles.aside}>
      <h1>VARIABLES</h1>
      <ul>
        <li>
          <div>
            <span>asd</span>
            <span>(7)</span>
          </div>
        </li>
        <li>
          <div>
            <span>asdcad</span>
            <span>(7)</span>
          </div>
        </li>
        <li>
          <div>
            <span>as2dcad</span>
            <span>(7)</span>
          </div>
        </li>
        <li>
          <div>
            <span>asd</span>
            <span>(7)</span>
          </div>
        </li>
        <li>
          <div>
            <span>ddasdcad</span>
            <span>(7)</span>
          </div>
        </li>
      </ul>
    </Layout>
  );
});

export default Aside;