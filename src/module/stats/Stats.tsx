

"use client";
import React from 'react';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {Dummy_Data} from "@/module/expenses/Expenses";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CreateStats() {
    return (
        <div className="sm:w-[48%] w-full flex-1 p-5">
            <div className="w-1/2 mx-auto items-center">
                <div className="py-6">
                    <h3 className="text-4xl font-extrabold text-black p-6">Statistics</h3>

                    <Doughnut
                        data={{
                            datasets: [{
                                data: Dummy_Data.map(expense => expense.amount),
                                backgroundColor: Dummy_Data.map(expense => expense.color),
                                borderColor: ["#111"]
                            }]
                        }}
                    />


                    {/* Stats Data Below Chart */}
                    <div className="mt-6 w-full text-lg font-semibold">
                        {Dummy_Data.map((expense, index) => (
                            <div key={index} className="flex justify-between px-6 py-2 border-b">
                                <span className="flex items-center">
                                    <span className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: expense.color }} />
                                    {expense.title}
                                </span>
                                <span>₹{expense.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

