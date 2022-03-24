import type {AppProps} from 'next/app';
import "~/styles/index.scss";
import {RecoilRoot, useRecoilState} from "recoil";
import {ApolloProvider, useQuery} from "@apollo/client";
import client from "~/cores/apolloClient";
import Head from 'next/head'
import React from "react";

function MyApp({Component, pageProps}: AppProps) {

  return (
    <RecoilRoot>
      <Head>
        <title>정그리 블로그</title>
        <link rel="canonical" href="https://junggri.com/profile" />
        <meta name="description" content="안녕하세요. 정그리 블로그입니다."/>
        <meta
          name="keywords"
          content="node,javascript,노드,자바스크립트,블로그,blog,사진,개발"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
