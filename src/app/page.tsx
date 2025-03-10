
"use client";
import React, {useEffect, useState} from "react";
import CreateHeader from "@/module/header/page";
import CreateExpenses from '@/module/expenses/Expenses';
import AddExpenseModal from "@/module/modal/AddExpenseModal";
import CreateStats from "@/module/stats/Stats";
import CreateModal from "@/module/modal/AddIncomeModal";
import CreateIncome from "@/module/income/Income";
import {collection, DocumentData, getDocs, Timestamp} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase"
import {useRouter} from "next/navigation";


export default function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [expenseIsOpen, setExpenseIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [expense, setExpense] = useState<DocumentData[]>([]);
    const router = useRouter();




    const getExpenseData = async () => {
        try {
            const collectionRef = collection(db, "expenses");
           
            const docsSnap = await getDocs(collectionRef);
            const data: DocumentData[] = docsSnap.docs.map((doc) => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    ...docData,
                    createdAt: docData.createdAt instanceof Timestamp
                        ? docData.createdAt.toDate()
                        : new Date(docData.createdAt || Date.now()),
                };
            });

            // Merge expenses by summing amounts if titles match
            const mergedExpenses: Record<string, { amount: number; id: string; createdAt: Date }> = {};

            data.forEach(exp => {
                if (mergedExpenses[exp.title]) {
                    mergedExpenses[exp.title].amount += exp.amount; // Add new amount
                } else {
                    mergedExpenses[exp.title] = {
                        amount: exp.amount,
                        id: exp.id,
                        createdAt: exp.createdAt,
                    };
                }
            });

            setExpense(data.map(expense => ({
                amount: expense.amount,
                title: expense.title,
                id: expense.id,
                createdAt: expense.createdAt,
            })));

        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        getExpenseData();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("loggedIn")) {
            router.replace("/log-in");
            return;
        } else {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col px-10 py-5 mx-10">
                <CreateHeader />
                <section className="flex sm:flex-row flex-col mt-10">
                    <div className="relative w-full sm:w-[49%] flex flex-col items-center px-6 sm:px-4">
                        <CreateExpenses
                            expense={expense}
                            setExpenseIsOpen={setExpenseIsOpen}
                            setModalIsOpen={setModalIsOpen}

                        />
                        <AddExpenseModal
                            expenseIsOpen={expenseIsOpen}
                            setExpenseIsOpen={setExpenseIsOpen}
                            onClose={() => setModalIsOpen(false)}
                            expense={expense}
                            updateExpenseData={getExpenseData}
                        />
                    </div>
                    <CreateStats  />
                </section>
                <CreateModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
                    <CreateIncome />
                </CreateModal>
                <footer>
                    <p></p>
                </footer>
            </div>
        </>
    );
}

