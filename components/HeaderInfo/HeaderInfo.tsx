import React from "react";
import Head from "next/head";
import Script from "next/script";

interface IHeaderInfoProps {
  title: string;
}

const HeaderInfo = ({ title }: IHeaderInfoProps) => {
  return (
    <>
      <Head>
        <title>{title} | Threewords App</title>
        <meta name="description" content="Threewords App next js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9Y0G07RD5N"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-9Y0G07RD5N');
          `}
      </Script>
    </>
  );
};

export default HeaderInfo;
