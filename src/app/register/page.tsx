"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegisterSubmit(e: FormEvent) {
        e.preventDefault();
        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });
    }

    return (
        <section>
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            <form
                className="block max-w-xs mx-auto"
                onSubmit={handleRegisterSubmit}
            >
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">
                    or Login with provider
                </div>
                <button className="flex gap-4 justify-center items-center">
                    <Image src={"/google.png"} alt="" width={32} height={32} />
                    Login with google
                </button>
            </form>
        </section>
    );
}