"use client";
import React, { useState } from "react";
import { saveDataBalance } from "../utils/handledb";
import { FaPen } from "react-icons/fa";

export default function ChangeBalance() {
  const [visiable, setVisiable] = useState(false);

  const create = async (FormData: FormData) => {
    const amount = FormData.get("amount") as unknown as number;
    const data = await saveDataBalance(amount);
    // console.log(data);
    setVisiable(!visiable);
  };

  const handleClick = () => {
    window.location.reload();
  };
  return (
    <div>
      <button id="add" className="pen" onClick={() => setVisiable(!visiable)}>
        <FaPen />
      </button>
      {visiable && (
        <form action={create}>
          <div className="popupDiv">
            <h1 className="popup_h1">Change Balance</h1>
            <div className="popup">
              <p>Amount</p>
              <input type="number" name="amount" placeholder="Enter balance" />
            </div>
            <button onClick={handleClick} className="popup_button">
              Done
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
