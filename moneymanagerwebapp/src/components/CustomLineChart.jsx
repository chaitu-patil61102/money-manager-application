// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const CustomLineChart = ({ data }) => (
//     <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             {/* <Line type="monotone" dataKey="amount" stroke="#8884d8" /> */}
//             <Line type="monotone" dataKey="amount" stroke="#6b21a8" strokeWidth={2} dot={{ r: 4 }} />
//         </LineChart>
//     </ResponsiveContainer>
// );

// export default CustomLineChart;


import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
                {/* Background grid */}
                {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}

                {/* X and Y axis */}
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />

                {/* Custom Tooltip */}
                <Tooltip content={<CustomTooltip />} />

                {/* Gradient for area */}
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                    </linearGradient>
                </defs>

                {/* Smooth line */}
                <Line
                    type="monotone"
                    dataKey="total"   // ✅ use "total", not "amount"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#8b5cf6" }}
                    activeDot={{ r: 7, fill: "#8b5cf6" }}
                />

                {/* Gradient area */}
                <Area
                    type="monotone"
                    dataKey="total"   // ✅ same key as line
                    stroke="none"
                    fill="url(#lineGradient)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
