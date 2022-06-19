import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useSession } from "../hooks/reactQuery.hooks";

const Home: NextPage = () => {
  // console.log(error?.message);
  const sessionData = useSession();
  console.log(sessionData);

  return (
    <div className={styles.container}>
      <Head>
        <title>Threewords App</title>
        <meta name="description" content="Threewords App next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hellow next
      <br />
      How are you
    </div>
  );
};

export default Home;

/* 

Planning:
- Login page
- Register page
- Profile page
- Settings page
- welcome/About page
- Create phrase page
- Phrase list page
- Phrase search
- Edit phrase 
- Phrase delete


*/
