"use client";
import Budgets from "../components/Budgets";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BudgetData } from "../utils/handledb";
import DeleteBudget from "../components/DeleteBudget";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [budgetData, setBudgetData] = useState<any>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    BudgetData().then((data) => {
      setBudgetData(data);
    });

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <main className="home">
      <div id="sidebar" className="h-24 bg-[#EC6E2A]">
        <div>
          <Link href={"/home"}>
            <button className="display">Home</button>
          </Link>
          <Link href={"/payments"}>
            <button className="display">Payments</button>
          </Link>
        </div>
        <div id="mobileButton" ref={menuRef}>
          <button
            onClick={handleClick}
            className={`button ${isOpen ? "" : ""}`}
          >
            <svg
              className="icon h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                className="icon"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>

          {isOpen && (
            <div className="dropdown">
              <a href="/home" className="text">
                Home
              </a>
              <a href="/payments" className="text">
                Payment
              </a>
            </div>
          )}
        </div>
      </div>

      <Budgets></Budgets>

      <div id="site_scroll" className="flex justify-center flex-wrap mt-5">
        {budgetData.map((budget: any) => (
          <div key={budget.id} className="budget_div">
            <h1>{budget.category}</h1>
            <h2>
              {budget.expenses} / {budget.amount}€
            </h2>
            <DeleteBudget id={budget.id} />
          </div>
        ))}

        {/* <div className="overBudget">
          <h1 className="font-bold">Food</h1>
          <h2>334 / 200€</h2>
          <button className="delete">d</button>
        </div> */}
      </div>
    </main>
  );
}
