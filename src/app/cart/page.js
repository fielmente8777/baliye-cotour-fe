'use client';

import { useState, useEffect } from "react";

import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Address from "@/components/Address/Address";
import {loadStripe} from '@stripe/stripe-js';
import { BASE_URL, getCookie } from "@/lib/cookies";
import axios from "axios";

import { BsFillCartDashFill } from "react-icons/bs";

const stripePromise = loadStripe('pk_test_51RcZTKIEExz8OCXnz6fPGXkmCHmQ1jFftndg0jz5d2bFT2kVjr49XcZBQi6LckFFaZSiFEHlFsJbeYdcvSrmRHlF00n3lasIbb');

export default function Home() {

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0)


    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8085/order/pay/init/test?amount=500", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            const paymentUrl = data?.data?.content?.paymentUrl;
            if (paymentUrl) {
                // ✅ Redirect to Stripe Checkout
                window.location.href = paymentUrl;
            } else {
                alert("Failed to create payment session.");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("An error occurred while initiating payment.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getCart = async () => {
            const urlParams = `${BASE_URL}/cart`;
            const authToken = getCookie('baliye-token');
            if (!authToken) {
                window.location.href = '/login';
                return;
            } else {
                axios.get(urlParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Baliye-Token': authToken
                    }
                }).then((response) => {
                    console.log("Cart data:", response.data.data);
                    setCart(response.data.data.orderItems);
                    const orderItems = response.data.data.orderItems;
                    const totalAmount = orderItems.reduce((acc, item) => acc + item.price, 0);
                    setTotal(totalAmount);
                }).catch((error) => {
                    console.error("Error fetching cart data:", error);
                });
            }
        };

        getCart();
    }, []);


  return (
    <div className={styles.page}>
        <div className={styles.headerWrapper}>
            <div className={styles.header}>My Cart</div>
            <div className={styles.subheader}>3 Items</div>
            <div className={styles.timeline}>
                <div className={step === 0 ? styles.eventActive : styles.event}>Cart</div>
                <img src="/caret-right.svg" />
                <div className={step === 1 ? styles.eventActive : styles.event}>Address</div>
            </div>
        </div>
        <div className={styles.contentWrapper}>
            <div className={styles.cardContainer}>
                {step === 0 && <>
                    {
                        cart.map(item => <div className={styles.card}>
                            <img src="/png/test.png" />
                            <div className={styles.cardContent}>
                                <div>
                                    <div className={styles.cardTitle}>Coord Set</div>
                                    <div className={styles.cardprice}>$130</div>
                                </div>
                                <div className={styles.viewDetails}>View Customization Details</div>
                            </div>
                        </div>)
                    }

                    {
                        cart.length === 0 && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px'}}>
                            <BsFillCartDashFill size={50} color="#000" />
                            <div className={styles.emptyCartText}>Your cart is empty</div>
                        </div>
                    }
                    
                </>}
                {
                    step === 1 && <Address />
                }
            </div>
            <div className={styles.summary}>
                <div className={styles.priceSummary}>
                    <div className={styles.priceHeader}>Price Summary</div>
                    <div className={styles.priceDetail}>
                        <div className={styles.priceDetail}>Cart Total</div>
                        <div className={styles.priceDetail}>${total}</div>
                    </div>
                    <div className={styles.priceDetail}>
                        <div className={styles.priceDetail}>Shipping Cost</div>
                        <div className={styles.priceDetail}>FREE</div>
                    </div>
                    <div className={styles.dashedHr} />
                    <div className={styles.priceDetail}>
                        <div className={styles.priceDetail}>Total</div>
                        <div className={styles.priceDetail}>${total}</div>
                    </div>
                </div>
                <button className={styles.btn} type="button" onClick={() => {
                    if (step  < 1) {
                        if (cart.length === 0) {
                            window.location.href = '/';
                        } else {
                            setStep(step + 1);
                        }
                    } else {
                        handleCheckout()
                    }
                    }}>{step === 1 ?'Proceed to Payment'  : cart.length === 0 ? 'Start Shopping' : 'Continue' }</button>
            </div>
        </div>
    </div>
  );
}
