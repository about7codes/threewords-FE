import axios from "axios";

// Fetch all phrases from the database
export const getAllPhrases = async (token: string) => {
  const response = await axios.get(
    "https://maxthree.herokuapp.com/phrase/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete a phrase from the database
export const deletePhrase = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const response = await axios.delete(
    `https://maxthree.herokuapp.com/phrase/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
