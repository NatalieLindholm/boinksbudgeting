"use client";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteBudget } from "../utils/handledb";

export default function DeleteBudget({ id }: { id: string }) {
  const deleteForm = async (FormData: FormData) => {
    const id = FormData.get("id") as string;
    const data = await deleteBudget(id);
    console.log(data);
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div>
      <form action={deleteForm}>
        <button onClick={handleClick} className="delete">
          <FaRegTrashAlt />
        </button>
        <input type="hidden" name="id" value={id} />
      </form>
    </div>
  );
}
