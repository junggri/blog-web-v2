import React, {memo, useMemo} from "react";
import Layout from "~/component-system/Layout/layout";
import styles from "./content.module.scss";
import Link from "next/link";
import {PageEdge} from "~/cores/schema";
import ContentItem from "~/components/contentItem/contentItem";


interface Props {
  data: PageEdge[]
}

const Content: React.FC<Props> = memo(({data}) => {

  const renderContent = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.map((e, i) => {
      return (
        <Link href={`/post/${e.node.hashId}`} key={e.node.hashId}>
          <a>
            <ContentItem
              edge={e}
            />
          </a>
        </Link>
      );
    });
  }, [data]);

  return (
    <Layout className={styles.content}>
      {renderContent}
    </Layout>
  );
});

export default Content;