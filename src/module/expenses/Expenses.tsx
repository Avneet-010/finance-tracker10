"use client";
import React, {JSX, useEffect, useMemo, useState} from "react";
import {currencyFormatter} from "@/lib/utils";
import CreateItem from "@/module/expenses/Item";
import {DocumentData} from "firebase/firestore";

interface Expense {
    id: number | string;
    title: string;
    amount: number;
    color: string;
    createdAt: Date;
}

interface ExpensesProps {
    setExpenseIsOpen: (isOpen: boolean) => void;
    setModalIsOpen: (isOpen: boolean) => void;
    updateExpenseData?: () => Promise<void>;
    expense: DocumentData[];

}

export const Dummy_Data: Expense[] = [
    {id: "1", title: "Entertainment", amount: 300, color: "#FF5733", createdAt: new Date()},
    {id: "2", title: "Gas", amount: 400, color: "#33FF57", createdAt: new Date()},
    {id: "3", title: "Food", amount: 500, color: "#3357FF", createdAt: new Date()},
    {id: "4", title: "Miscellaneous", amount: 1000, color: "rgba(108,197,232,0.93)", createdAt: new Date()},
    {id: "5", title: "Clothes", amount: 900, color: "#caca7e", createdAt: new Date()},
];

export default function CreateExpenses({setExpenseIsOpen, setModalIsOpen, expense}: ExpensesProps): JSX.Element {

    const [categoryTotal, setCategoryTotal] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const getExpenses = async () => {
            // await updateExpenseData(); // Fetch latest expense data from Firebase
            console.log("expenses:", expense);
            // Calculate category-wise total after fetching
            if (expense.length > 0) {
                const categoryTotals = expense.reduce((acc, item) => {
                    acc[item.title] = (acc[item.title] || 0) + Number(item.amount);
                    return acc;
                }, {} as { [key: string]: number });

                setCategoryTotal(categoryTotals);
                console.log("category total:", categoryTotals);
            }
        };
        getExpenses();
    }, [expense]);

    const data = useMemo(() => {
        if (!categoryTotal) {
            return Dummy_Data;
        }
        return Dummy_Data.map(value => {
            value.amount = categoryTotal[value.title]
            return value;
        })
    }, [categoryTotal])

    return (
        <div className="sm:w-full flex flex-col items-center font-extrabold p-20">
            <div>
                <small className="text-black p-4 text-4xl">
                    My Balance <span className="px-10 text-blue-700">{currencyFormatter(1000)}</span>
                </small>
            </div>
            <div className="flex mt-3 gap-3 items-center justify-center w-96 py-3">
                <button onClick={() => setExpenseIsOpen(true)}
                        className="px-4 py-2 w-full text-2xl capitalize rounded-xl bg-gray-700 text-amber-50 border hover:scale-110 outline hover:shadow-xl transition-all duration-500">
                    + Expense
                </button>

                <button onClick={() => setModalIsOpen(true)}
                        className="px-4 py-2 text-md w-full text-2xl capitalize rounded-xl border bg-gray-800 text-amber-50 hover:scale-110 hover:shadow-xl transition-all duration-300">
                    + Income
                </button>
            </div>
            <h2 className="text-3xl  md:shrink-0 text-black font-extrabold mt-4">My Expenses</h2>
            <div
                className="flex flex-col gap-4 mt-3 w-full max-w-[400px] sm:w-96 items-center justify-center px-4 sm:px-0">
                {data.map((expense) => (
                    <CreateItem
                        key={expense.id}
                        color={expense.color}
                        title={expense.title}
                        amount={expense.amount}
                    />
                ))}
            </div>
        </div>
    );
}
