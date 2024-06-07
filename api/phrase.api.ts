import axios from "axios";

// Fetch all phrases from the database
export const getAllPhrases = async (token: string) => {
  const response = await axios.get("https://threewords-be.onrender.com/phrase/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update a phrase from the database
export const updatePhrase = async ({
  token,
  id,
  words,
}: {
  token: string;
  id: string;
  words: string;
}) => {
  const response = await axios.patch(
    `https://threewords-be.onrender.com/phrase/update/${id}`,
    { words },
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
    `https://threewords-be.onrender.com/phrase/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
