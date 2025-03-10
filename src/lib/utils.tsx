export const  currencyFormatter=(amount:number)=> {
    const formattter = Intl.NumberFormat("en-US", {
            currency: "INR",
            style: "currency",
        }
    );
    return formattter.format(amount);
};
