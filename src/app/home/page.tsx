"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Expenses from "../components/Expenses";
import { ExpensData } from "../utils/handledb";
import ChangeBalance from "../components/ChangeBalance";
import { BalanceData } from "../utils/handledb";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [expensData, setExpensData] = useState<any>([]);
  const [balanceData, setBalanceData] = useState<any>([]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    ExpensData().then((data) => {
      setExpensData(data);
    });

    BalanceData().then((data) => {
      setBalanceData(data);
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
      <div id="sidebar" className="h-24 bg-[#32396B]">
        <div>
          <Link href={"/budgets"}>
            <button className="display">Budgets</button>
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
              <a href="/budgets" className="text">
                Budgets
              </a>
              <a href="/payments" className="text">
                Payment
              </a>
            </div>
          )}
        </div>
      </div>

      <div
        id="content"
        className="flex flex-col items-center justify-evenly h-full"
      >
        <div>
          {balanceData.map((balance: any) => (
            <div
              key={balance.id}
              className="m-5 bg-[#0079AD] rounded-xl text-white text-3xl w-64 h-24 flex flex-col items-center justify-center relative"
            >
              <h1 className="font-bold">Balance</h1>
              <h2>{balance.amount} €</h2>
              <ChangeBalance />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <h1 className="text-4xl">Expenses</h1>
          <Expenses></Expenses>
        </div>
        <div className=" w-full">
          <div className="expenses_scroll">
            {expensData.map((expens: any) => (
              <div key={expens.id} className="expenses_div">
                <p>{expens.category}</p>
                <p className="text-red-600 font-bold mb-3">
                  -{expens.amount} €
                </p>
                <p>{JSON.stringify(expens.date)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
