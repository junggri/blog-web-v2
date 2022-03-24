import React, {useEffect, useState} from "react";
import useGeolocation, {IGeolocation} from "~/hooks/useGelocation";
import {rewriteURIForGET, useMutation, useQuery} from "@apollo/client";
import {CREATE_VISIT} from "~/cores/mutation";
import styles from "~/styles/index.module.scss";
import client from "~/cores/apolloClient";
import {GET_POSTS, GET_TAG_RELATION, GOOGLE_API_VISITOR, YOUTUBE} from "~/cores/query";
import {GetStaticProps} from "next";
import {PageEdge} from "~/cores/schema";
import {produce} from "immer";
import Header from "~/components/Header/header";
import Layout from "~/component-system/Layout/layout";
import Content from "~/components/content/content";
import {useLoadMore} from "~/hooks/useLoadMore";
import HeaderNav from "~/components/headerNav/HeaderNav";
import {GOOGLE_VISITOR, Visitor} from "~/atom/google.atom";
import {useRecoilState} from "recoil";
import SlideBox from "~/components/slideBox/slideBox";
import SeoHeader from "~/components/SeoHead/head";

interface Props {
  posts: {
    __typename: string
    edges: PageEdge[]
    leftCount: number
    pageInfo: {
      __typename: string
      endCursor: number
      hasNextPage: boolean
    }
  }
}


export default function Home() {
  const coordinate: IGeolocation | null = useGeolocation();
  const google = useQuery<Visitor>(GOOGLE_API_VISITOR);
  const [visitor, setVisitor] = useRecoilState(GOOGLE_VISITOR);

  const [createVisit] = useMutation(
    CREATE_VISIT,
    {
      errorPolicy: "all",
    });


  const {data, fetchMore} = useQuery<Props>(GET_POSTS, {
    errorPolicy: "all",
    nextFetchPolicy: 'cache-and-network',
    variables: {
      data: {
        first: 12,
        filter: "open"
      }
    },
  });

  useEffect(() => {
    if (!google.data) {
      return;
    }
    setVisitor(google.data);
  }, [google]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return
    }
    if (!coordinate) {
      return;
    }

    createVisit({
      variables: {
        data: {
          lat: coordinate.lat,
          lon: coordinate.lon
        }
      },
    });

  }, [coordinate, createVisit]);

  useLoadMore(() => {
      if (!data) {
        return []
      }

      if (!data.posts?.pageInfo.hasNextPage) {
        return []
      }

      fetchMore({
        variables: {
          data: {
            first: 12,
            after: data.posts.pageInfo.endCursor,
            filter: "open"
          }
        },
        updateQuery: (previousQueryResult, {fetchMoreResult}): Props => {
          if (fetchMoreResult === undefined || !fetchMoreResult) {
            return previousQueryResult;
          }

          return produce(previousQueryResult, (draft) => {
            draft.posts.pageInfo = fetchMoreResult.posts.pageInfo;
            draft.posts.leftCount = fetchMoreResult.posts.leftCount;
            draft.posts.edges = [...previousQueryResult.posts.edges, ...fetchMoreResult.posts.edges];
          });
        }
      });
    }
  );

  return (
    <div className={styles.appContainer}>
      <SeoHeader
        title={"정그리 블로그입니다."}
        image={"../../public/images/logo.svg"}
        desc={"같이 성장해나가는 블로그입니다."}
        url={"https://www.junggri.com"}
      />
      <Header/>
      <HeaderNav/>
      <Layout className={styles.contentBody}>
        {(data && data.posts) &&
        <Content data={data?.posts.edges}/>
        }
        {!data?.posts &&
        <div className={styles.none}>
           <p>
              아직 포스트를
              작성하지 못했어요.
           </p>
        </div>
        }
        {/*{(data) && <Content data={data?.posts.edges}/> }*/}
      </Layout>
      <SlideBox visitor={visitor}/>
    </div>
  );
}


// export const getStaticProps: GetStaticProps = async () => {
//
//   const {data} = await client.query({
//     query: GET_POSTS,
//     variables: {
//       data: {
//         first: 12,
//       }
//     },
//     errorPolicy: "all",
//     fetchPolicy: "no-cache"
//   });
//
//   return {
//     props: {
//       data,
//     }
//   };
// };