import React, { useEffect, useState } from "react";
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
  RESET_RECIPIENT_NAME,
  RESET_TRANSACTION_MSG,
  getUserTransactions,
  selectTransaction,
  selectTransactionMSG,
  transferFund,
  verifyAccount,
} from "../../redux/features/transaction/transactionSlice";
import TransferModal from "./TransferModal";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import DepositModal from "./DepositModal";

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

const initialState = {
  amount: 0,
  sender: "",
  recipient: "",
  description: "",
  status: "",
};

const initialDepositState = {
  amount: 0,
  paymentMethod: "",
};

const Wallet = () => {
  const [transferData, setTransferData] = useState(initialState);

  const { amount, sender, recipient, description, status } = transferData;

  const [depositData, setDepositData] = useState(initialDepositState);

  const { amount: depositAmount, paymentMethod } = depositData;

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.transaction);

  const user = useSelector(selectUser);
  const transactions = useSelector(selectTransaction);
  const transactionMSG = useSelector(selectTransactionMSG);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleDepositInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData({ ...depositData, [name]: value });
  };

  const handleAcctChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
    setIsVerified(false);
    dispatch(RESET_TRANSACTION_MSG());
    dispatch(RESET_RECIPIENT_NAME()); // monitor recipient name onchange/dismiss
  };

  const verifyRecipientAcct = async (e) => {
    e.preventDefault();
    // validate email address
    if (!validateEmail(recipient)) {
      toast.error("Invalid email address!");
    }
    const formData = {
      recipient,
    };
    dispatch(verifyAccount(formData));
  };

  const transferMoney = async (e) => {
    e.preventDefault();
    // Validation
    if (amount < 1) {
      return toast.error("Invalid Amount! Greater than zero(0)");
    }
    if (!description) {
      return toast.error("Please enter a description to the transaction");
    }

    const formData = {
      ...transferData,
      sender: user.email,
      status: "Success",
    };

    await dispatch(transferFund(formData));
    await dispatch(getUser());
  };

  const depositMoney = async (e) => {
    setShowDepositModal(true);
  };

  const closeModal = async (e) => {
    if (e.target.classList.contains("cm")) {
      setShowTransferModal(false);
      setShowDepositModal(false);
      setTransferData({ ...initialState });
      setDepositData({ ...initialDepositState });
      setIsVerified(false);
    }
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserTransactions());
  }, [dispatch]);

  // Tracking verify btn to display when transactionMSG setIsVerified to true
  useEffect(() => {
    if (transactionMSG === "Account verification Successful") {
      setIsVerified(true);
    }
    if (transactionMSG === "Transaction Successful") {
      setTransferData({ ...initialState });
      setShowTransferModal(false);
      setIsVerified(false);
      dispatch(RESET_RECIPIENT_NAME());
      dispatch(getUserTransactions());
    }
    dispatch(RESET_TRANSACTION_MSG());
  }, [dispatch, transactionMSG]);

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
                <button
                  className="--btn --btn-primary"
                  onClick={() => setShowDepositModal(true)}
                >
                  <AiOutlineDollarCircle /> &nbsp; Deposit Money
                </button>
                <button
                  className="--btn --btn-danger"
                  onClick={() => setShowTransferModal(true)}
                >
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
        {showTransferModal && (
          <TransferModal
            transferData={transferData}
            isVerified={isVerified}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleAcctChange={handleAcctChange}
            transferMoney={transferMoney}
            verifyRecipientAcct={verifyRecipientAcct}
            closeModal={closeModal}
          />
        )}
        {/* Deposit Modal */}
        {showDepositModal && (
          <DepositModal
            depositData={depositData}
            closeModal={closeModal}
            handleDepositInputChange={handleDepositInputChange}
            depositMoney={depositMoney}
          />
        )}
      </div>
    </section>
  );
};

export default Wallet;
