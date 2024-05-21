"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PaymentData } from "../utils/handledb";
import Payments from "../components/Payment";
import DeletePayment from "../components/DeletePayment";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<any>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    PaymentData().then((data) => {
      setPaymentData(data);
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
          <Link href={"/home"}>
            <button className="display">Home</button>
          </Link>
          <Link href={"/budgets"}>
            <button className="display">Budgets</button>
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

      <Payments></Payments>

      <div id="site_scroll" className="flex justify-center flex-wrap mt-5">
        {paymentData.map((payment: any) => (
          <div key={payment.id} className="payment_div">
            <h2>{payment.amount}€</h2>
            <p>{payment.description}</p>
            <DeletePayment id={payment.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
