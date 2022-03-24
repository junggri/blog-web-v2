import Head from "next/head";
import React, {FC} from "react"

interface Props{
  hashId?:string,
  title:string
  image:string
  desc:string
  url:string
}

const SeoHeader : FC<Props> = ({hashId,title,image,desc,url}) => {
  return (
    <Head>
      <title>
        정그리 블로그
      </title>
      <link rel="canonical" href="https://junggri.com/profile" />
      <meta
        name="keywords"
        content="node,javascript,노드,자바스크립트,블로그,blog,사진,개발"
      />
      <meta name="description" content="안녕하세요. 정그리 블로그입니다."/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={url}/>
      <meta property="og:title" content={title}/>
      <meta property="og:image" content={image}/>
      <meta property="og:description" content={desc}/>
      <meta property="og:site_name" content="정그리 블로그"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
    </Head>
  )
};

export default SeoHeader