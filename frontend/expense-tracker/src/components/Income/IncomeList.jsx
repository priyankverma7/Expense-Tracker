import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-2">
        <h5 className="text-lg font-semibold">Income Sources</h5>
        
        <button
          className="card-btn flex items-center gap-2"
          onClick={onDownload}
        >
          <LuDownload className="text-base" />
          <span>Download</span>
        </button>
      </div>

      {/* Grid of income cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default IncomeList;
