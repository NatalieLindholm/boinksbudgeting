"use client";
import { saveDataBudget } from "../utils/handledb";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Budgets() {
  const [visiable, setVisiable] = useState(false);

  const create = async (FormData: FormData) => {
    const category = FormData.get("category") as string;
    const amount = FormData.get("amount") as unknown as number;
    const data = await saveDataBudget(category, amount);
    console.log(data);
  };
  return (
    <div>
      <button className="addBudget" onClick={() => setVisiable(!visiable)}>
        <FaPlus />
      </button>
      {visiable && (
        <form action={create}>
          <div className="popupDiv">
            <h1 className="popup_h1">Create Budget</h1>
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
              </select>
            </div>
            <button className="popup_button">Done</button>
          </div>
        </form>
      )}
    </div>
  );
}
