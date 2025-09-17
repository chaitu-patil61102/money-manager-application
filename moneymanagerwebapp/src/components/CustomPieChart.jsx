// src/components/CustomPieChart.jsx
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
} from "recharts";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
    return (
        <div className="w-full h-85">
            <ResponsiveContainer>
                <PieChart
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }} // ✅ removes extra chart padding
                >
                    {/* Pie Section */}
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"  // ✅ move pie slightly up to balance space
                        innerRadius={100}
                        outerRadius={125}
                        paddingAngle={0}
                        dataKey="amount"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>

                    {/* Legend aligned closer to pie */}
                    <Legend
                        verticalAlign="bottom"
                        height={20} // ✅ reduce reserved height
                        iconType="circle"
                        wrapperStyle={{ paddingTop: 0, marginTop: -10 }} // ✅ bring legend closer
                    />

                    {/* ===== Center Text ===== */}
                    <g>
                        <text
                            x="50%"
                            y="42%" // slightly above center for title
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-medium"
                            fontSize="18"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="51%" // slightly below for total amount
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="20"
                            fontWeight="bold"
                        >
                            {totalAmount}
                        </text>
                    </g>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;

