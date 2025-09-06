import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
import EmojiPickerPopup from '../EmojiPickerPopup';

const IncomeOverview = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
         console.log("👉 transactions:", transactions);
         console.log("👉 chartData prepared:", result);
        setChartData(result);
    
  return  () => {};
}, [transactions]);
console.log("Income Chart Data:", chartData);


return ( 
<div className="card">
    <div className="flex items-center justify-between">
        <div className="">
            <h5 className="text-lg">Income Overview</h5>
            <p className="text-xs text-gray-400 mt-0.5">
                Track your earnings over time and analyze your income trends.
            </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-lg" />
            Add Income
        </button>
    </div>
    <div className="mt-10">
        <CustomBarChart data={chartData} xKey="source" />
    </div>
</div>
);

};


export default IncomeOverview;