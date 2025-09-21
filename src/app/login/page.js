'use client';

import { useState } from "react";

import styles from "./page.module.css";
import countryIcons, { countryData } from "@/lib/country";
import CIcon from '@coreui/icons-react';

import { signIn } from "next-auth/react";
import Button from "@/components/Button/Button";
import OTPInput from "react-otp-input";
import axios from "axios";
import { BASE_URL, setCookie } from "@/lib/cookies";


export default function Home() {

    const [country, setCountry] = useState('IN');
    const [number, setNumber] = useState('');
    const [active, setActive] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifyOtp, setVerifyOtp] = useState(false);

    const countries = Object.keys(countryIcons);

    const handleLogin = async () => {
        if (verifyOtp) {
            const url = `${BASE_URL}/auth/otp/verify?phoneNumber=${number}&otp=${otp}`;
             await axios.post(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if (res.data.data.otpVerified) {
                    setCookie("baliye-token", res.data.data.token, 7);
                    setCookie("baliye-user", JSON.stringify(res.data.data.user), 7);
                    window.location.href = '/';
                } else {
                    alert(res.data.data.message || "Something went wrong");
                }
            }).catch((err) => {
                console.error(err);
                alert("Failed to send OTP. Please try again.");
            });
        } else {
            const url = `${BASE_URL}/auth/otp/send?phoneNumber=${number}`;
            await axios.post(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if (res.data.data.success) {
                    setVerifyOtp(true);
                } else {
                    alert(res.data.data.message || "Something went wrong");
                }
            }).catch((err) => {
                console.error(err);
                alert("Failed to send OTP. Please try again.");
            });
        }
    }

    return (
        <div className={styles.page}>
            {active && <div className={styles.backdrop} onClick={() => setActive(false)} />}
            <div className={styles.loginContainer}>
                <div>
                    <div className={styles.header}>{verifyOtp ? 'Welcome to Baliye Cotour' : 'Verify Phone Number'}</div>
                    <div className={styles.subheader}>{verifyOtp ? 'Join/Sign in with' : <>Enter One Time Password sent to<br /><b>{number}</b></>}</div>
                </div>
                {!verifyOtp && <div style={{ position: 'relative' }}>
                    <div className={styles.inputBox}>
                        <div className={styles.countryWrapper} onClick={() => setActive(!active)}>
                            <CIcon size="sm" width={50} icon={countryIcons[country]} title={countryData[country]?.phone} />
                        </div>
                        <div onClick={() => setActive(!active)}><img src="/CaretDown.svg" alt="" style={{ transform: active ? 'rotate(180deg)' : '' }} /></div>
                        <input type="text" className={styles.textBoxNone} onChange={e => setNumber(e.target.value)} placeholder="123 456 7890" />
                    </div>
                    {active && <div className={styles.countryDrop}>
                        {
                            countries.map((d, i) => <div key={i} onClick={() => { setActive(!active); setCountry(d); }} className={styles.countryDropItem}><CIcon size="sm" width={50} icon={countryIcons[d]} title={countryData[d]?.name} /></div>)
                        }
                    </div>}
                </div>}
                {
                    verifyOtp && <div>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                height: '60px',
                                width: '55px',
                                borderRadius: '12px'
                            }}
                            containerStyle={{
                                display: 'flex',
                                gap: '10px'
                            }}
                            />
                    </div>
                }
                <Button disabled={number === ""} onClick={() => handleLogin()} fullLength>{verifyOtp ? 'Verif OTP' : "Let's go"}</Button>
                {verifyOtp && <Button type="text" fullLength>Resend OTP</Button>}
                <div className={styles.lineWrapper}>
                    <div className={styles.line} />
                    <div className={styles.lineText}>or</div>
                    <div className={styles.line} />
                </div>
                <div className={styles.socialWrapper}>
                    <div onClick={() => signIn("google", { redirect: false })} className={styles.socialOpt}>
                        <img src="/gmail.svg" />
                        <div>Gmail</div>
                    </div>
                    <div onClick={() => signIn("azureAd", { redirect: false })} className={styles.socialOpt}>
                        <img src="/Outlook.svg" />
                        <div>Outlook</div>
                    </div>
                </div>
            </div> 
            <img
                className={styles.logo}
                src="/png/login.svg"
            />
        </div>
    );
};
