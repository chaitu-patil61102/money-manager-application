import { format } from "date-fns";

export const prepareExpenseLineChartData = (expenses) => {
    // 1. Aggregate expenses by their date, creating a temporary object with a fullDate property
    const groupedByDate = expenses.reduce((acc, expense) => {
        const dateObj = new Date(expense.date);
        const dateKey = dateObj.toISOString().split('T')[0]; // Use a unique date string for grouping
        const formattedDate = format(dateObj, "do MMM");

        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: formattedDate,
                fullDate: dateObj, // for sorting
                total: 0,
                details: []
            };
        }

        acc[dateKey].total += expense.amount;
        acc[dateKey].details.push({
            type: expense.category?.categoryName || expense.categoryName,
            amount: expense.amount,
        });

        return acc;
    }, {});

    // 2. Convert the grouped object to an array
    const chartData = Object.values(groupedByDate);

    // 3. Sort the array chronologically
    chartData.sort((a, b) => a.fullDate - b.fullDate);

    // 4. Return the sorted data, removing the temporary fullDate property
    return chartData.map(({ fullDate, ...rest }) => rest);
};
