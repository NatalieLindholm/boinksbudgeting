"use client";
import React, { useState } from "react";
import { saveDataExpenses } from "../utils/handledb";

export default function Expenses() {
  const [visiable, setVisiable] = useState(false);

  const create = async (FormData: FormData) => {
    const category = FormData.get("category") as string;
    const amount = FormData.get("amount") as unknown as number;
    const data = await saveDataExpenses(category, amount);
    // console.log(data);
    setVisiable(!visiable);
  };

  const handleClick = () => {
    window.location.reload();
  };
  return (
    <div>
      <button
        className="text-4xl text-[#28AB96] font-bold"
        onClick={() => setVisiable(!visiable)}
      >
        +
      </button>
      {visiable && (
        <form action={create}>
          <div className="popupDiv">
            <h1 className="popup_h1">Add Expens</h1>
            <div className="popup">
              <p>Amount</p>
              <input type="number" name="amount" placeholder="Enter amount" />
            </div>
            <div className="popup">
              <p>Category</p>
              <select className="category" name="category">
                <option value="Food">Food</option>
                <option value="Hygien">Hygien</option>
                <option value="Gas">Gas</option>
                <option value="Rent">Rent</option>
                <option value="Clothing">Clothing</option>
                <option value="Household">Household</option>
                <option value="Payment">Payment</option>
              </select>
            </div>
            <div className="popup"></div>
            <button onClick={handleClick} className="popup_button">
              Done
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
