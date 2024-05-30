import React, { useEffect, useRef } from "react";
import "./TransferModal.scss";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { Spinner } from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectRecipientName } from "../../redux/features/transaction/transactionSlice";

const TransferModal = ({
  transferData,
  isVerified,
  isLoading,
  handleInputChange,
  handleAcctChange,
  transferMoney,
  verifyRecipientAcct,
  closeModal,
}) => {
  const focusInputRef = useRef(null);

  const recipientName = useSelector(selectRecipientName);

  useEffect(() => {
    focusInputRef.current?.focus();
  }, []);

  return (
    <section className="--100vh modal-section">
      <div className="--flex-center modal">
        <div className="--bg-light --p --card modal-content">
          <AiOutlineClose
            color="red"
            size={16}
            className="close-icon cm"
            onClick={(e) => closeModal(e)}
          />
          <div className="--flex-start modal-head --my">
            <AiOutlineInfoCircle color="orangered" size={18} />
            <h3 className="--text-p --ml">Send Money to Someone</h3>
          </div>
          {/*  */}
          <div className="modal-body">
            <form onSubmit={transferMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  ref={focusInputRef}
                  type="number"
                  placeholder="amount"
                  name="amount"
                  required
                  value={transferData?.amount}
                  onChange={handleInputChange}
                />
              </p>
              <p className="req">
                <label>Reciever Account Details</label>
                <span className="--text-sm">
                  {recipientName && recipientName}
                </span>
                <span className="--flex-end">
                  <input
                    type="text"
                    placeholder="Recipient Email Account"
                    name="recipient"
                    required
                    value={transferData?.recipient}
                    onChange={handleAcctChange}
                  />
                  <button
                    className="--btn --btn-danger --btn-lg"
                    onClick={verifyRecipientAcct}
                  >
                    Verify
                  </button>
                </span>
              </p>
              <p className="req">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  required
                  value={transferData?.description}
                  onChange={handleInputChange}
                />
              </p>

              {!isVerified && (
                <p className="--color-danger">
                  Please click the button above to verify recipient email!!!
                </p>
              )}
              {isVerified && (
                <span className="--flex-end">
                  <button
                    className="--btn --btn-lg cm"
                    onClick={(e) => closeModal(e)}
                  >
                    Cancel
                  </button>
                  {isLoading ? (
                    <button
                      type="button"
                      className="--btn --btn-primary --btn-lg"
                      disabled
                    >
                      <Spinner />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-lg"
                    >
                      Send
                    </button>
                  )}
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferModal;
