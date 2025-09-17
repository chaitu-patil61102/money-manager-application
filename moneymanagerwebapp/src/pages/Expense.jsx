// import React from 'react'
// import Dashboard from '../components/Dashboard';
// import { useUser } from '../hooks/useUser';

// const Expense = () => {
//     useUser();
//     return (
//         <Dashboard activeMenu="Expense">
//             This is Expense page.
//         </Dashboard>
//     )
// }

// export default Expense;


import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard';
import { useUser } from '../hooks/useUser';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import ExpenseList from '../components/ExpenseList';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import AddExpenseForm from '../components/AddExpenseForm';
import DeleteAlert from '../components/DeleteAlert';
import ExpenseOverview from '../components/ExpenseOverview';

const Expense = () => {
    useUser();

    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    //fetch expense details from api
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        }
        catch (error) {
            console.error("Failed to fetch expense details : ", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        }
        finally {
            setLoading(false);
        }
    }

    //fetch categories for a expense
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                console.log("expense categories", response.data);
                setCategories(response.data);
            }
        }
        catch (error) {
            console.log("Failed to fetch expense categories", error);
            toast.error(error.data?.message || "Failed to fetch expense categories");
        }
    }

    //save the expense details
    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount <= 0)) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error("Date cannot be in the future");
            return;
        }

        if (!categoryId) {
            toast.error("Please select the category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        }
        catch (error) {
            console.log("Error adding expense", error);
            toast.error(error.response?.data?.message || "Failed to adding expense");
        }
    }

    //delete expense details
    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        }
        catch (error) {
            console.log("Error deleting expense", error);
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    }

    //handle download expense details
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: "blob" });
            let filename = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download expense details successfully");
        }
        catch (error) {
            console.error("Error downloading expense details : ", error);
            toast.error(error.response?.data?.message || "Failed to download expense");
        }
    }

    //handle email expense details
    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Expense details emailed successfully");
            }
        }
        catch (error) {
            console.log("Error emailing expense details : ", error);
            toast.error(error.response?.data?.message || "Failed to email expense");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* Overview for expense with line chart */}

                        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
                    </div>
                    <ExpenseList
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        transactions={expenseData}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    {/* Add expense modal */}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete expense modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are your sure want to delete this expense details?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;
