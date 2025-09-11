// prepareIncomeLineChartData.js
// import { format } from "date-fns";

// export const prepareIncomeLineChartData = (incomes) => {
//     // 1. Create a dictionary to group incomes by their formatted date.
//     const groupedByDate = incomes.reduce((acc, income) => {
//         const formattedDate = format(new Date(income.date), "do MMM");

//         // 2. If the date doesn't exist in the dictionary, create a new entry.
//         if (!acc[formattedDate]) {
//             acc[formattedDate] = {
//                 date: formattedDate,
//                 total: 0,
//                 details: [] // This array will hold all transactions for the date
//             };
//         }

//         // 3. Add the current income's amount to the date's total.
//         acc[formattedDate].total += income.amount;

//         // 4. Add the individual transaction details to the 'details' array.
//         acc[formattedDate].details.push({
//             type: income.category?.categoryName || income.categoryName,
//             amount: income.amount,
//         });

//         return acc;
//     }, {});

//     // 5. Convert the dictionary back into an array for the chart.
//     return Object.values(groupedByDate);
// };

import { format } from "date-fns";

export const prepareIncomeLineChartData = (incomes) => {
    // 1. Aggregate incomes by their date, creating a temporary object with a fullDate property
    const groupedByDate = incomes.reduce((acc, income) => {
        const dateObj = new Date(income.date);
        const dateKey = dateObj.toISOString().split('T')[0]; // Use a unique date string for grouping
        const formattedDate = format(dateObj, "do MMM");

        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: formattedDate,
                fullDate: dateObj, // This is the crucial line for sorting
                total: 0,
                details: []
            };
        }
        acc[dateKey].total += income.amount;
        acc[dateKey].details.push({
            type: income.category?.categoryName || income.categoryName,
            amount: income.amount,
        });

        return acc;
    }, {});

    // 2. Convert the grouped object to an array
    const chartData = Object.values(groupedByDate);

    // 3. Sort the array chronologically using the fullDate property
    chartData.sort((a, b) => a.fullDate - b.fullDate);

    // 4. Return the sorted data, removing the temporary fullDate property
    return chartData.map(({ fullDate, ...rest }) => rest);
};