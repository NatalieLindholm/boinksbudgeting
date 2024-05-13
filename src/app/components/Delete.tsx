"use client";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteBudget } from "../utils/handledb";
import { useRouter } from "next/navigation";

export default function Delete({ id }: { id: string }) {
  const router = useRouter();
  const deleteForm = async (FormData: FormData) => {
    const id = FormData.get("id") as string;
    const data = await deleteBudget(id);
    console.log(data);
    router.replace("/budgets");
  };
  return (
    <div>
      <form action={deleteForm}>
        <button className="delete">
          <FaRegTrashAlt />
        </button>
        <input type="hidden" name="id" value={id} />
      </form>
    </div>
  );
}
