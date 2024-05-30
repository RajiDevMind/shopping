import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const WalletTransaction = ({ transactions, user }) => {
  // Pagination Start Here
  const itemsPerPage = 1;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffset(newOffset);
  };
  // Pagination End!
  return (
    <div className="wallet-transactions">
      <div className="--underline"></div>
      <br />
      <h3>Transactions</h3>
      <div className="table">
        {transactions.lenght === 0 ? (
          <p>No Transaction found!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Ref Account</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {transactions.map((transaction, index) => { */}
              {currentItems.map((transaction, index) => {
                const {
                  _id,
                  createdAt,
                  amount,
                  sender,
                  recipient,
                  description,
                  status,
                } = transaction;
                return (
                  <tr key={_id}>
                    <td>{itemOffset + index + 1}</td>
                    <td>{createdAt}</td>
                    <td>{_id}</td>
                    <td>${amount}</td>
                    <td>{sender === user.email ? "Debit" : "Credit"}</td>
                    <td>{sender === user.email ? recipient : sender}</td>
                    <td>{description}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default WalletTransaction;
