import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AppInfo from "../components/AppInfo/AppInfo";
import HeaderInfo from "../components/HeaderInfo/HeaderInfo";

const Home: NextPage = () => {
  // console.log(error?.message);

  return (
    <div className={styles.container}>
      <HeaderInfo title="Threemax" />
      <h1>Threemax</h1>
      <AppInfo />
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
