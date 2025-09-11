// import React from 'react'
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Income from './pages/Income';
// import Expense from './pages/Expense';
// import Category from './pages/Category';
// import Filter from './pages/Filter';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import { Toaster } from "react-hot-toast";

// const App = () => {
//     return (
//         <>
//             <Toaster />
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<Root />} />
//                     <Route path="/dashboard" element={<Home />} />
//                     <Route path="/income" element={<Income />} />
//                     <Route path="/expense" element={<Expense />} />
//                     <Route path="/category" element={<Category />} />
//                     <Route path="/filter" element={<Filter />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                 </Routes>
//             </BrowserRouter>
//         </>
//     )
// }

// const Root = () => {
//     const isAuthenticated = !!localStorage.getItem("token");
//     return isAuthenticated ? (
//         <Navigate to="/dashboard" />
//     ) : (
//         <Navigate to="/login" />
//     );
// }

// export default App;



import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Category from './pages/Category';
import Filter from './pages/Filter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from "react-hot-toast";
import bg_img from "./assets/bg_img.jpg";

// ✅ Navbar (always visible on Welcome, Login, Signup)
const Navbar = () => {
    return (
        <nav
            // className="w-full bg-gray-700 text-white p-4 flex justify-between"
            className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
            <h1 className="text-xl font-bold">Money Manager 💰</h1>
            <div className="flex gap-4">
                <Link to="/" className="hover:underline">Welcome</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Signup</Link>
            </div>
        </nav>
    );
};

// ✅ Welcome Page
const Welcome = () => {
    return (
        <div
            className="relative flex flex-col items-center justify-center h-152 w-screen bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: `url(${bg_img})` }}
        >
            {/* Foreground content */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-2xl text-center relative z-10">
                <h1 className="text-4xl font-bold mb-4 text-indigo-700">
                    Welcome to Money Manager 💰
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    Take control of your finances with ease!
                    Money Manager helps you track <span className="font-semibold">income</span>,
                    monitor <span className="font-semibold">expenses</span>,
                    organize <span className="font-semibold">categories</span>,
                    and filter transactions quickly.
                </p>

                <ul className="text-gray-600 text-left list-disc list-inside mb-6">
                    <li>📈 View your income and expenses in one place</li>
                    <li>📊 Categorize transactions for better tracking</li>
                    <li>🔍 Apply filters to analyze your spending</li>
                    <li>🔒 Secure login & signup for safe access</li>
                </ul>

                <p className="text-gray-700">
                    Get started by <span className="font-semibold">signing up</span> for a new account,
                    or <span className="font-semibold">login</span> if you already have one.
                </p>
            </div>
        </div>
    );
};


const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </>
    )
}

// ✅ Layout → Navbar only on public pages
const Layout = () => {
    const location = useLocation();
    const publicRoutes = ["/", "/login", "/signup"];
    const showNavbar = publicRoutes.includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Pages */}
                <Route path="/dashboard" element={<Home />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/category" element={<Category />} />
                <Route path="/filter" element={<Filter />} />

                {/* Auth Redirect */}
                <Route path="/root" element={<Root />} />
            </Routes>
        </>
    );
};

// ✅ Auth check
const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
}

export default App;
