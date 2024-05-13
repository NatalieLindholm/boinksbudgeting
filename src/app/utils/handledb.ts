"use server";
import { revalidateTag } from "next/cache";
import { db } from "./db";

export async function BudgetData() {
  try {
    const data = await db.query("SELECT * FROM budget");
    console.log(data.rows); // Check the structure of the returned data
    return data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function ExpensData() {
  try {
    const data = await db.query("SELECT * FROM expenses");
    console.log(data.rows); // Check the structure of the returned data
    return data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function saveDataBudget(category: string, amount: number) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query("INSERT INTO budget(category, amount) VALUES ($1,$2)", [
      category,
      amount,
    ]);
    return "Saved Successfully";
  } catch (error) {
    console.log(error);
    return "Didnt save";
  }
}

export async function saveDataExpenses(category: string, amount: number) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query(
      "INSERT INTO expenses(category, amount, date) VALUES ($1,$2, )",
      [category, amount]
    );
    return "Saved Successfully";
  } catch (error) {
    console.log(error);
    return "Didnt save";
  }
}

export async function saveDataBalance(amount: number) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query("INSERT INTO balance(amount) VALUES ($1)", [amount]);
    return "Saved Successfully";
  } catch (error) {
    console.log(error);
    return "Didnt save";
  }
}

export async function getExpensData() {
  try {
    const expensData = await ExpensData();
    return expensData;
  } catch (error) {
    console.log(error);
    return "Didnt get";
  }
}

export async function getBudgetData() {
  try {
    const budgetData = await BudgetData();
    return budgetData;
  } catch (error) {
    console.log(error);
    return "Didnt get";
  }
}

export async function deleteBudget(id: string) {
  try {
    await db.query("DELETE FROM budget WHERE id = $1", [id]);
    revalidateTag("id");
    return "Deleted";
  } catch (error) {
    console.log(error);
    return "didnt delete";
  }
}

// export async function getDataById(id:number) {
//     try {
//       const data = await db.query('SELECT * FROM projects WHERE id=$1', [id]);
//       console.log(data.rows); // Check the structure of the returned data
//       return data.rows[0];
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
