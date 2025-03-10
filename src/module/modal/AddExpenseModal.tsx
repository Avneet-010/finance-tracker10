import React, {useState} from "react";
// import {financeContext} from '@/lib/store/finance-context';
import {addDoc, collection, DocumentData} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import {Dummy_Data} from "@/module/expenses/Expenses";

interface ExpensesProps {
    expenseIsOpen: boolean;
    setExpenseIsOpen: (isOpen: boolean) => void;
    onClose: () => void;
    expense: DocumentData[];
    updateExpenseData: () => void;
}

interface Expense {
    id: number;
    title: string;
    amount: number;
    color: string;
    createdAt: string;
}

export default function AddExpenseModal({
                                            expenseIsOpen,
                                            setExpenseIsOpen,
                                            onClose,
                                            expense,
                                            updateExpenseData
                                        }: ExpensesProps) {
    const [amount, setAmount] = useState<number | "">("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // const { addExpenseItem } = useContext(financeContext);
    const [title, setTitle] = useState<string | null>(null);


    console.log(expense);
    // console.log(addExpenseItem);



    const addExpenseItemHandler = async () => {
        setTitle(selectedCategory);

        if (!amount || isNaN(Number(amount))) {
            console.error("Amount is missing or invalid!");
            return;
        }
        if (!title) {
            console.error("No category selected!");
            return;
        }
        if (selectedCategory === null) {
            console.warn("No category selected");
            return;
        }

        const parsedAmount = Number(amount) || 0;

        const newExpense: Expense = {
            id: Date.now(),
            title: title,
            color: Dummy_Data.find(item => item.id === selectedCategory)?.color || "#000000",
            amount: parsedAmount,
            createdAt: new Date().toISOString(),
        };

        try {

            await addDoc(collection(db, "expenses"), newExpense);
            console.log("Expense successfully added!");

            setAmount("");
            // setSelectedCategory(null);
            onClose();
            updateExpenseData();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };
    console.log("Selected Category:", selectedCategory);


    if (!expenseIsOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-1/2 h-3/4 bg-gray-200 p-6 rounded-3xl shadow-lg relative overflow-y-auto">
                <button
                    className="absolute top-4 right-4 h-10 w-10 rounded-full font-bold bg-slate-500 text-white"
                    onClick={() => setExpenseIsOpen(false)}
                >
                    X
                </button>
                <div className="flex flex-col items-center gap-4 p-4 text-black">
                    <h2 className="text-2xl font-bold text-black text-center mb-4">Add an Expense</h2>
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 text-lg font-semibold text-center">
                            Expense Amount
                        </label>
                        <input
                            id="amount"
                            className="w-80 p-1 border rounded-lg border-black"
                            type="number"
                            min={0.01}
                            step={0.01}
                            placeholder="Enter Expense Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value ? +e.target.value : "")}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-4 mt-3">
                        {Dummy_Data.map((val) => (
                            <button key={val.id} onClick={() => setSelectedCategory(String(val.title))}>
                                <div style={{boxShadow: val.id === selectedCategory ? "1px 1px 4px" : "none"}}
                                     className="flex p-5 px-10 w-96 max-w-md py-5 bg-transparent border border-gray-700 rounded-2xl text-black items-center justify-between hover:bg-black transform hover:scale-110 hover:shadow-xl transition-all duration-500 ease-in-out hover:text-yellow-500">
                                    <div className="flex items-center gap-2">
                                        <div className="w-[25px] h-[25px] rounded-full"
                                             style={{backgroundColor: val.color}}/>
                                        <h4 className="capitalize">{val.title}</h4>
                                    </div>
                                </div>
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                if (selectedCategory !== null) {
                                    const selectedExpense = Dummy_Data.find((item) => item.id === selectedCategory);
                                    if (selectedExpense) {
                                        addExpenseItemHandler();
                                    } else {
                                        console.warn("Selected category does not match any existing expenses");
                                    }
                                } else {
                                    console.warn("No category selected");
                                }
                            }}
                            className="p-1 w-full bg-slate-500 rounded-lg text-white"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
