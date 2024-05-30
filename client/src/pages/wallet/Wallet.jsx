import React, { useEffect } from "react";
import "./Wallet.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, selectUser } from "../../redux/features/auth/authSlice";
import mastercard from "../../assets/mc_symbol.png";
import paymentIMG from "../../assets/payment.svg";
import {
  AiFillDollarCircle,
  AiFillGift,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import WalletTransaction from "./WalletTransaction";
import {
  getUserTransactions,
  selectTransaction,
} from "../../redux/features/transaction/transactionSlice";

const transactionss = [
  {
    _id: 3456789,
    createdAt: "30-12-2023",
    amount: 120,
    sender: "iopeyemi621@gmail.com",
    recipient: "roi5tech@gmail.com",
    description: "payment for sellout products",
    status: "success",
  },
  {
    _id: 4456789,
    createdAt: "12-04-2024",
    amount: 320,
    sender: "iopeyemi621@gmail.com",
    recipient: "roi5tech@gmail.com",
    description: "payment for sellout sellout products",
    status: "success",
  },
];

const Wallet = () => {
  const user = useSelector(selectUser);
  const transactions = useSelector(selectTransaction);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserTransactions());
  }, [dispatch]);

  return (
    <section>
      <div className="container">
        <PageMenu />
        <div className="wallet">
          <div className="wallet-data --flex-start --flex-dir-column">
            <div className="wallet-info --card --mr">
              <span>Hello,</span>
              <h4>{user?.name}</h4>
              <div className="--underline"></div>
              <span className="--flex-between">
                <p>Account Balance</p>
                <img src={mastercard} alt="cc" width={50} />
              </span>
              <h4>${user?.balance.toFixed(2)}</h4>
              <div className="buttons --flex-center">
                <button className="--btn --btn-primary">
                  <AiOutlineDollarCircle /> &nbsp; Deposit Money
                </button>
                <button className="--btn --btn-danger">
                  <FaRegPaperPlane /> &nbsp; Transfer
                </button>
              </div>
            </div>
            {/* Waallet Promo */}
            <div className="wallet-promo --flex-between --card">
              <div className="wallet-text">
                <span className="--flex-start">
                  <AiFillDollarCircle size={25} color="#ff7722" />
                  <h4>Sellout Wallet</h4>
                </span>
                <span className="--flex-start">
                  <h4>Cashback up to 80%</h4>
                  <AiFillGift size={20} color="#007bff" />
                </span>
                <span>
                  Use your Sellout wallet at checkout and get up to 80%
                  cashback.
                </span>
              </div>

              <div className="wallet-img">
                <img src={paymentIMG} alt="payment IMAGE" width={150} />
              </div>
            </div>
          </div>
          {/* Wallet Transactions */}
          {user !== null && (
            <WalletTransaction transactions={transactions} user={user} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Wallet;
