import Document, {Head, Html, Main, NextScript} from "next/document";
import React from 'react';

class MyDocument extends Document {

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="icon" href="https://www.junggri.com/images/Logo.ico"/>
          <meta charSet="utf-8"/>
          <meta name="keywords" content="자바스크립트,nodejs,알고리즘,책,프로그래밍,프론트엔드,백엔드"/>
          <script
            data-ad-client="ca-pub-6475394953521607"
            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
          </script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-186554267-1"/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }
                        gtag("js", new Date());
                        gtag("config", "UA-186554267-1");
                        `,
            }}
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;