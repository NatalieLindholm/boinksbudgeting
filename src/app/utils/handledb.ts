"use server";
import { revalidateTag } from "next/cache";
import { db } from "./db";

// Save budget data to db
export async function saveDataBudget(category: string, amount: number) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query("INSERT INTO budget(category, amount) VALUES ($1,$2)", [
      category,
      amount,
    ]);
    return "Saved budget successfully";
  } catch (error) {
    console.log(error);
    return "Budget didnt save";
  }
}

// Get it from db
export async function getBudgetData() {
  try {
    const data = await db.query(
      "SELECT budget.*, SUM(expenses.amount) AS expenses FROM budget INNER JOIN expenses ON expenses.category = budget.category GROUP BY budget.id"
    );
    console.log(data.rows); // Check the structure of the returned data
    return data.rows;
  } catch (error) {
    console.error("Error fetching budget data:", error);
    return [];
  }
}

// Display budget data on client side
export async function BudgetData() {
  try {
    const budgetData = await getBudgetData();
    return budgetData;
  } catch (error) {
    console.log(error);
    return "Didnt get budget data";
  }
}

// Delete budget
export async function deleteBudget(id: string) {
  try {
    await db.query("DELETE FROM budget WHERE id = $1", [id]);
    revalidateTag("id");
    return "Deleted budget";
  } catch (error) {
    console.log(error);
    return "didnt delete budget";
  }
}

// ==============================================================================

// Save expens data to db
export async function saveDataExpenses(category: string, amount: number) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query("INSERT INTO expenses(category, amount) VALUES ($1,$2)", [
      category,
      amount,
    ]);

    return "Saved expens successfully";
  } catch (error) {
    console.log(error);
    return "Expens didnt save";
  } finally {
    await db.query("UPDATE balance SET amount = amount - $1 WHERE id = 1", [
      amount,
    ]);
  }
}

// Get expens data from db
export async function getExpensData() {
  try {
    const data = await db.query("SELECT * FROM expenses ORDER BY id DESC");
    console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Error fetching expens data:", error);
    return [];
  }
}

// Display expens data on client side
export async function ExpensData() {
  try {
    const expensData = await getExpensData();
    return expensData;
  } catch (error) {
    console.log(error);
    return "Didnt get expens data";
  }
}
// ==============================================================================

// Save balance data to db
export async function saveDataBalance(amount: number) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query("UPDATE balance SET amount = $1 WHERE id = 1", [amount]);
    return "Updated balance successfully";
  } catch (error) {
    console.log(error);
    return "Balance didnt save";
  }
}

// Get balance data from db
export async function getBalanceData() {
  try {
    const balanceData = await db.query("SELECT * FROM balance");
    console.log(balanceData);
    return balanceData.rows;
  } catch (error) {
    console.error("Error fetching balance data:", error);
    return [];
  }
}

// Display balance data on client side
export async function BalanceData() {
  try {
    const balanceData = await getBalanceData();
    return balanceData;
  } catch (error) {
    console.log(error);
    return "Didnt get balance data";
  }
}

// ==============================================================================

// Save payment data to db
export async function saveDataPayment(amount: number, description: string) {
  if (!amount) {
    return "amount is not defined";
  }
  try {
    await db.query("INSERT INTO payments(amount, description) VALUES ($1,$2)", [
      amount,
      description,
    ]);
    return "Saved payment successfully";
  } catch (error) {
    console.log(error);
    return "Payment didnt save";
  }
}

// Get it from db
export async function getPaymentData() {
  try {
    const data = await db.query("SELECT * FROM payments");
    console.log(data.rows); // Check the structure of the returned data
    return data.rows;
  } catch (error) {
    console.error("Error fetching payment data:", error);
    return [];
  }
}

// Display payment data on client side
export async function PaymentData() {
  try {
    const paymentData = await getPaymentData();
    return paymentData;
  } catch (error) {
    console.log(error);
    return "Didnt get payment data";
  }
}

// Delete payment
export async function deletePayment(id: string) {
  try {
    await db.query("DELETE FROM payments WHERE id = $1", [id]);
    revalidateTag("id");
    return "Deleted payment";
  } catch (error) {
    console.log(error);
    return "Didnt delete payment";
  }
}
