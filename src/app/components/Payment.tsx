"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { saveDataPayment } from "../utils/handledb";

export default function Payments() {
  const [visiable, setVisiable] = useState(false);

  const create = async (FormData: FormData) => {
    const amount = FormData.get("amount") as unknown as number;
    const description = FormData.get("description") as string;
    const data = await saveDataPayment(amount, description);
    console.log(data);
    setVisiable(!visiable);
  };

  const handleClick = () => {
    window.location.reload();
  };
  return (
    <div>
      <button className="addButton" onClick={() => setVisiable(!visiable)}>
        <FaPlus />
      </button>
      {visiable && (
        <form action={create}>
          <div className="popupDiv">
            <h1 className="popup_h1">Add Payment</h1>
            <div className="popup">
              <p>Amount</p>
              <input type="number" name="amount" placeholder="Enter amount" />
            </div>
            <div className="popup">
              <p>Description</p>
              <input
                type="text"
                placeholder="Enter description"
                name="description"
              />
            </div>
            <button className="popup_button" onClick={handleClick}>
              Done
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
