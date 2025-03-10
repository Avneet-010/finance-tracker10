import {createContext, ReactNode, useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";

// Define Expense Type
interface Expense {
    id?: string;
    title: string;
    amount: number;
    color: string;
}

// Define Context Type
interface FinanceContextType {
    income: string[];
    expenses: Expense[];
    addExpenseItem: (newExpense: Expense,category:string) => Promise<void>;
    removeExpenseItem: (expenseId: string) => void;
}

// Create Context
export const financeContext = createContext<FinanceContextType>({
    income: [],
    expenses: [],
    addExpenseItem: async () => {},
    removeExpenseItem: () => {},
});

export default function FinanceContextProvider({ children }: { children: ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    // Function to add an expense to Firebase
    const addExpenseItem = async (newExpense:Expense) => {
        if (!newExpense.id) {
            console.error("Expense ID is missing!");
            return;
        }
        const docRef = doc(db, "expenses", newExpense.id)
        try {
            await updateDoc(docRef, { ...newExpense });

            setExpenses(prevState => {
                const updatedExpenses=[...prevState,newExpense]
                return updatedExpenses;
            })

        } catch (error) {
            throw (error)
        }

    };






    // Function to remove an expense (can be implemented later)
    const removeExpenseItem = (expenseId: string) => {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== expenseId));
    };

    return (
        <financeContext.Provider value={{ income: ["test"], expenses, addExpenseItem, removeExpenseItem }}>
            {children}
        </financeContext.Provider>
    );
}
