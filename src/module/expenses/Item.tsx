import React from "react";
import {currencyFormatter} from "@/lib/utils";

interface CreateItemProps {
    color: string;
    title: string;
    amount: number;

}

export default function CreateItem({ color, title, amount}: CreateItemProps) {
    return (
        <div className="flex sm:flex-row px-9 py-5  bg-transparent border border-gray-700 rounded-2xl text-black items-center justify-between w-full hover:bg-black transform hover:scale-110 hover:shadow-xl transition-all duration-500 ease-in-out hover:text-yellow-500">
            <div className="w-[25px] h-[25px] rounded-full" style={{ backgroundColor: color }}></div>

            <h4 className="capitalize text-xl font-bold">{title}</h4>


            <p>{currencyFormatter(amount)}</p>
        </div>
    );
}
