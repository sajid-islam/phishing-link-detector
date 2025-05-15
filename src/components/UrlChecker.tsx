import React, { useState } from "react";

type InputEvent = React.FormEvent<HTMLFormElement>;
const phishingKeywords: string[] = [
    "login",
    "logon",
    "signin",
    "sign-in",
    "signon",
    "sign-on",
    "verify",
    "verification",
    "account",
    "secure",
    "security",
    "update",
    "confirm",
    "auth",
    "authenticate",
    "authentication",
    "validate",
    "validation",
    "bank",
    "ebay",
    "paypal",
    "wallet",
    "password",
    "passcode",
    "credentials",
    "support",
    "unlock",
    "ssn",
    "social",
    "insurance",
    "user",
    "customer",
    "id",
    "reset",
    "recovery",
    "payment",
    "checkout",
    "invoice",
    "billing",
    "transaction",
];

const UrlChecker = () => {
    const [score, setScore] = useState<number>(0);
    const handleUrlChecker = (e: InputEvent) => {
        e.preventDefault();

        const input = e.currentTarget.elements.namedItem(
            "url"
        ) as HTMLInputElement;

        const url = input?.value;
        const urlHostname = url.split("//")[1];
        const urlScheme = url.split(":")[0];
        const splittedUrlHostname = urlHostname.split(/[/:.?=#&]+/);
        console.log(splittedUrlHostname);
        if (
            splittedUrlHostname.some((urlWord) =>
                phishingKeywords.some((pw) =>
                    pw.includes(urlWord.toLowerCase())
                )
            )
        ) {
            setScore(score + 2);
        }
    };
    console.log(score);
    return (
        <div className="bg-[#56cbf9] h-[40svh]">
            <section className="flex flex-col items-center text-center gap-2 pt-10">
                <h1 className="text-5xl font-bold">Detect Phishing Links</h1>
                <p className="text-lg max-w-2xl">
                    Our tool, TrapURL, instantly checks any URL for phishing
                    threats and malicious content to protect your security.
                </p>
            </section>
            <section className="bg-[#f5f5f5] shadow-2xl max-w-2xl mx-auto mt-20 py-10 px-5 rounded-md">
                <form onSubmit={handleUrlChecker} className="">
                    <h3 className="text-xl font-semibold text-center mb-4">
                        Is This URL Safe? Enter to Find Out!
                    </h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="url"
                            name="url"
                            placeholder="http://example.com"
                            className="input w-full focus:outline-0"
                        />{" "}
                        <button className="btn bg-[#56cbf9]">Analyze</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UrlChecker;
