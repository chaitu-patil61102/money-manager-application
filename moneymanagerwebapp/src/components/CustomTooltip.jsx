// import React from "react";

// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//         const data = payload[0].payload;

//         return (
//             <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200 text-sm">
//                 {/* Date */}
//                 {/* <p className="font-semibold">{label}</p> */}
//                 <p className="font-semibold">{label}</p>

//                 {/* Total */}
//                 <p className="font-semibold mt-1">
//                     Total:{" "}
//                     <span className="text-purple-600">
//                         ₹{data.total?.toLocaleString()}
//                     </span>
//                 </p>

//                 {/* Details */}
//                 <p className="text-gray-500 mt-1">Details:</p>
//                 <p className="text-gray-700">
//                     {data.type}: ₹{data.amount?.toLocaleString()}
//                 </p>
//             </div>
//         );
//     }

//     return null;
// };

// export default CustomTooltip;

// CustomTooltip.js
import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200 text-sm">
                <p className="font-semibold">{label}</p>

                {/* Display the correct total amount for the date */}
                <p className="font-semibold mt-1">
                    Total:{" "}
                    <span className="text-purple-600">
                        ₹{data.total?.toLocaleString()}
                    </span>
                </p>

                <p className="text-gray-500 mt-1">Details:</p>
                {/* Loop through the new `details` array to show each transaction */}
                {data.details.map((detail, index) => (
                    <p key={index} className="text-gray-700">
                        {detail.type}: ₹{detail.amount?.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default CustomTooltip;   