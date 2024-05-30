import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/auth/transaction/`;

// Get User transactions
const getUserTransactions = async () => {
  const resp = await axios.get(API_URL + "getUserTransactions");
  return resp.data;
};

// Verify Recipient account within the application
const verifyAccount = async (acctData) => {
  const resp = await axios.post(API_URL + "verifyAccount", acctData);
  return resp.data;
};

const transferFund = async (funds) => {
  const resp = await axios.post(API_URL + "transferFund", funds);
  return resp.data.msg;
};

const transactionService = {
  getUserTransactions,
  verifyAccount,
  transferFund,
};

export default transactionService;
