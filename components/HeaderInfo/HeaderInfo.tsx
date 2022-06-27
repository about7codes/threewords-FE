import React from "react";
import Head from "next/head";

interface IHeaderInfoProps {
  title: string;
}

const HeaderInfo = ({ title }: IHeaderInfoProps) => {
  return (
    <Head>
      <title>{title} | Threewords App</title>
      <meta name="description" content="Threewords App next js app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeaderInfo;
