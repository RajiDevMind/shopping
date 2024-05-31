import React, { useEffect, useRef } from "react";
import "./DepositModal.scss";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

const DepositModal = ({
  depositData,
  closeModal,
  handleDepositInputChange,
  depositMoney,
}) => {
  const focusInputRef = useRef(null);
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
            <h3 className="--text-p --ml">Deposit fund into you wallet</h3>
          </div>
          {/*  */}
          <div className="modal-body">
            <form onSubmit={depositMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  ref={focusInputRef}
                  type="number"
                  placeholder="amount"
                  name="amount"
                  required
                  value={depositData?.amount}
                  onChange={handleDepositInputChange}
                />
              </p>
              <br />
              <p>
                <label htmlFor="stripe" className="radio-label">
                  <input
                    type="radio"
                    className="radio-input"
                    name="paymentMethod"
                    id="stripe"
                    value={"stripe"}
                    onChange={handleDepositInputChange}
                  />
                  <span className="custom-radio" />
                  Stripe
                </label>
              </p>
              <br />
              <p>
                <label htmlFor="flutterwave" className="radio-label">
                  <input
                    type="radio"
                    className="radio-input"
                    name="paymentMethod"
                    id="flutterwave"
                    value={"flutterwave"}
                    onChange={handleDepositInputChange}
                  />
                  <span className="custom-radio" />
                  Flutterwave
                </label>
              </p>
              <br />

              <span className="--flex-end">
                <button
                  className="--btn --btn-lg cm"
                  onClick={(e) => closeModal(e)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-lg"
                  // onClick={}
                >
                  Proceed
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositModal;
