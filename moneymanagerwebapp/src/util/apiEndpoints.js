export const BASE_URL = "http://localhost:8080/api/v1.0";

// export const BASE_URL = "http://192.168.1.192:8080/api/v1.0";


const CLOUDINARY_CLOUD_NAME = "dukhkc54l";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",

    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    // delete category endpoint
    DELETE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,

    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/incomes/excel/download/income",
    EMAIL_INCOME: "/incomes/email/income-excel",

    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/expenses/excel/download",
    EMAIL_EXPENSE: "/expenses/email/expense-excel",

    APPLY_FILTERS: "/filter",

    DASHBOARD_DATA: "/dashboard",

    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}