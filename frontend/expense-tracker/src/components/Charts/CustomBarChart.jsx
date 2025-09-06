import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({ data, xKey = "month" }) => {
    if (!data || data.length === 0) {
        return <p className="text-gray-400 text-center">No data available</p>;
    }

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#4CAF50" : "#93c5fd"; 
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">
                        {payload[0].payload[xKey]}
                    </p>
                    <p className="text-sm text-gray-600">
                        Amount:{" "}
                        <span className="text-sm font-medium text-gray-900">
                            ${payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white mt-6 rounded-lg shadow p-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
