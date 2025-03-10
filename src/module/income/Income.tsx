"use client";
import {MdDelete} from "react-icons/md";
import React, {useEffect, useState} from "react";
import {addDoc, collection, deleteDoc, doc, DocumentData, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";
import {currencyFormatter} from "@/lib/utils";
import {uid} from "chart.js/helpers";


export default function CreateIncome() {
    const [amount, setAmount] = useState<number | "">("");
    const [description, setDescription] = useState<string>("");
    const [income, setIncome] = useState<DocumentData[]>([]);

    console.log(income);
//for displaying income data
    useEffect(() => {
        const getIncomeData = async () => {
            const collectionRef = collection(db, "income");
            const docsSnap = await getDocs(collectionRef);

            const data: DocumentData[] = docsSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis()),
            }));

            setIncome(data);
        };

        getIncomeData();
    }, []);
//adding income fields
    const addIncomeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!amount) return;
        const newIncome = {
            amount,
            description,
            createdAt: new Date(),
            uid:uid(),
        };

        const collectionRef = collection(db, "income");
        try {

            //update income

            await addDoc(collectionRef, newIncome);
            console.log(income);
            setAmount("");
            setDescription("");
            const docSnap = await addDoc(collectionRef, newIncome); // Correct reference

            setIncome((prevState) => [
                ...prevState,
                {
                    id: docSnap.id, // Correct way to get the document ID
                    ...newIncome,
                },
            ]);



        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

//delete income fields
    const deleteIncomeEntryHandler = async (incomeId: string) => {
        const docRef = doc(db, "income", incomeId);
        try {
            await deleteDoc(docRef);
            setIncome(prevState => {
                return prevState.filter(i=>i.id!==incomeId)
            })
        }catch(error ){
            if (error instanceof Error){
                console.log(error.message);
            }
        }
    };

    return (
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-4 p-4 text-black">
            <h2 className="text-2xl font-bold text-black text-center mb-4">Add Income</h2>
            <div>
                <label htmlFor="amount" className="block text-gray-700 text-lg font-semibold text-center">
                    Income Amount
                </label>
                <input
                    className="w-80 p-1 border rounded-lg border-black"
                    type="number"
                    min={0.01}
                    step={0.01}
                    placeholder="Enter Income Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? +e.target.value : "")}
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-gray-700 text-lg font-semibold text-center">
                    Description
                </label>
                <input
                    className="w-80 p-1 border rounded-lg border-black"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    placeholder="Enter Income Description"
                    required
                />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="p-1 w-full bg-slate-500 rounded-lg text-white">
                    Add Entry
                </button>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <h3 className="font-bold text-2xl">Income History</h3>
                {income.map(i=>{
return(
    <div className="flex items-start justify-between" key={i.id}>
        <div>
            <p className="font-semibold">{i.description}</p>
            <small className="text-xs">{i.createdAt.toISOString()}</small>
        </div>

        <p className="flex items-center gap-2">
            {currencyFormatter(i.amount)}
            <button onClick={()=>{
                deleteIncomeEntryHandler(i.id)
            }}>
            <MdDelete/>
            </button>
        </p>
    </div>
)
                })}
            </div>
        </form>
    );
}
