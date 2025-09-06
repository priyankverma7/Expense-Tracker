import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">All Expenses</h5>

        <button className="card-btn flex items-center gap-1" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}   // ✅ FIXED
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}   
              amount={expense.amount}
              type="expense"             // ✅ FIXED
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-full text-center">
            No expenses available.
          </p>
        )}
      </div>
    </div>
  )
}

export default ExpenseList;
