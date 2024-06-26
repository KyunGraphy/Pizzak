"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingUser, setCreatingUser] = useState(false);
    const [error, setError] = useState(false);

    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);

        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });

        !response.ok && setError(true);
        setCreatingUser(false);
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4 font-semibold">
                Register
            </h1>
            {error && (
                <div className="my-4 text-center">
                    Error. Please try again later.
                </div>
            )}
            <form
                className="block max-w-xs mx-auto"
                onSubmit={handleRegisterSubmit}
            >
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={creatingUser}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={creatingUser}
                />
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>
                <div className="my-4 text-center text-gray-500">
                    or Login with provider
                </div>
                <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="flex gap-4 justify-center items-center"
                >
                    <Image src={"/google.png"} alt="" width={32} height={32} />
                    Login with google
                </button>
            </form>
            <div className="my-4 text-center text-gray-500 pt-4">
                Existing account?{" "}
                <Link
                    className="underline text-primary font-semibold"
                    href={"/login"}
                >
                    Login here &raquo;
                </Link>
            </div>
        </section>
    );
}
