import axios from "axios";

const BASE_URL = "http://192.168.1.198:5070/api/accounts";

export const getAccounts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getAccountById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
