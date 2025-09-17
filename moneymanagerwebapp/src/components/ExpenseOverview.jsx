import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../util/chartUtils1'; // ✅ use expense chart util
import CustomLineChart from '../components/CustomLineChart';
import { Plus } from 'lucide-react';

const ExpenseOverview = ({ transactions, onAddExpense }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => { };
    }, [transactions])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Expense Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your spendings over time and analyze your expense trend.
                    </p>
                </div>
                <button className="add-btn" onClick={onAddExpense}>
                    <Plus size={15} className='text-lg' /> Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview;
