import React from "react";
import { Box, Slide, CircularProgress } from "@mui/material";
import Card from "../../components/Card/Card";
import { useAllPhrases } from "../../hooks/phrase.hooks";

const AllPhrases = () => {
  const { data: allPhrases, isLoading, error } = useAllPhrases();

  console.log("allPhrasesError", error);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1>All Phrases Threemax</h1>
      AllPhrases
      {allPhrases?.phrases && JSON.stringify(allPhrases)}
      {allPhrases && allPhrases.phrases.length == 0 ? (
        <Box>No phrase found</Box>
      ) : (
        allPhrases &&
        allPhrases.phrases.map((phrase: any) => (
          <Box key={phrase._id}>
            <Slide in={true} direction="up">
              <Box>
                <Card phrase={phrase} />
              </Box>
            </Slide>
          </Box>
        ))
      )}
    </div>
  );
};

AllPhrases.auth = {
  required: true,
  loading: <div>Loading...</div>,
  redirectTo: "/login",
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const authToken = parseCookies(ctx).aToken;
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 1000 * 20,
//       },
//     },
//   });

//   const AllPhrases1 = await getAllPhrases(authToken);

//   return {
//     props: {
//       AllPhrases1,
//     },
//   };
// };

// export const getServerSideProps = async (ctx: any) => {
//   try {
//     const authToken = parseCookies(ctx).aToken;

//     // @ts-ignore
//     const allPhrases = await getAllPhrases(authToken);

//     return {
//       props: {
//         allPhrases,
//       },
//     };
//   } catch (error: any) {
//     console.log("serverSide1", error.response.data.error);
//     // return { redirect: { destination: "/login", permanent: false } };
//     return {
//       props: {
//         error: error.response.data.error,
//         AllPhrases: { phrases: [] },
//       },
//     };
//   }
// };

export default AllPhrases;

// export async function getServerSideProps(ctx: any) {
//   const token = parseCookies(ctx).aToken;

//   if (!token) return { redirect: { destination: "/login", permanent: false } };

//   const userRes = await axios.get("https://maxthree.herokuapp.com/auth/me", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log("userProfile", userRes.data);

//   const data: any = userRes;

//   // does not allow access to page if not logged in
//   if (!data.username) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { data },
//   };
// }
