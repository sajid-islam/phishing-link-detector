import React, { useState } from "react";
import punycode from "punycode/";
import ResultModal from "./ResultModal";
import { toast } from "sonner";

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
const abusedTlds: string[] = [
    "tk",
    "ml",
    "ga",
    "cf",
    "gq", // Free domains from Freenom
    "xyz",
    "top",
    "club",
    "online", // Cheap/abused
    "work",
    "support",
    "site",
    "click",
    "loan",
    "men",
    "stream",
    "trade",
    "win",
    "download",
    "party",
    "biz",
    "info",
    "fit",
    "rest",
    "review",
    "accountant",
    "racing",
    "science",
    "date",
    "faith",
    "webcam",
    "cricket",
    "ninja",
    "host",
    "pw",
    "icu",
    "cam",
    "monster",
    "cyou",
    "bar",
    "kim",
    "space",
    "zip",
    "country",
    "cf",
    "cc",
    "ml",
    "buzz",
    "mom",
    "lol",
    "cn.com",
    "gdn",
    "ml",
    "ml",
    "xn--p1ai", // includes IDNs & repurposed ccTLDs
];

const UrlChecker = () => {
    const [score, setScore] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const modal = document.getElementById(
        "my_modal_3"
    ) as HTMLDialogElement | null;

    const handleUrlChecker = async (e: InputEvent) => {
        e.preventDefault();

        const input = e.currentTarget.elements.namedItem(
            "url"
        ) as HTMLInputElement;
        console.log(input.value);
        if (!input.value) {
            return toast("⚠️ Please enter a URL before scanning");
        }
        modal?.showModal();

        const url: URL = new URL(input?.value);
        const urlHostname: string = url.hostname;
        const totalSubdomains: number = urlHostname
            .split(".")
            .slice(0, -1).length;
        const urlProtocol: string = url.protocol;
        const urlTld: string | undefined = url.host.split(".").pop();
        const specialCharInUrl: number =
            url.href.match(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g)?.length ??
            0;

        const fetchDomainInfo = async () => {
            try {
                const domainInfo = await fetch(
                    `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${
                        import.meta.env.VITE_WHOIS_API_KEY
                    }&domainName=${urlHostname}&outputFormat=JSON`
                );
                return domainInfo.json();
            } catch (error) {
                console.error("There was an error", error);
                setLoading(false);
            }
        };
        const domainInfo = await fetchDomainInfo();

        const domainCreatedDate =
            domainInfo?.WhoisRecord?.createdDate?.split("-")[0];

        const thisYear = new Date().getFullYear();

        // Stop loading when whois api will response
        if (domainCreatedDate || domainInfo.WhoisRecord.dataError) {
            setLoading(false);
        }

        // Condition 1: check the phishing keywords in url
        if (phishingKeywords.some((pk) => urlHostname.includes(pk))) {
            setScore((prevScore) => prevScore + 2);
        }

        //Condition 2: to many subdomains check
        if (totalSubdomains > 3) {
            setScore((prevScore) => prevScore + 2);
        }

        //Condition 3: check shorteners url
        if (urlHostname.length <= 4) {
            setScore((prevScore) => prevScore + 2);
        }

        //Condition 4: check the protocol secure or not
        if (urlProtocol === "http:") {
            setScore((prevScore) => prevScore + 2);
        }

        //Condition 5: check the url is IP_Based URL or not
        if (
            /^(?:\d{1,3}\.){3}\d{1,3}$/.test(urlHostname) ||
            /^\[([a-fA-F0-9:]+)\]$/.test(urlHostname)
        ) {
            setScore((prevScore) => prevScore + 3);
        }

        //Condition 6: check abused tlds
        if (abusedTlds.some((tld) => tld === urlTld)) {
            setScore((prevScore) => prevScore + 2);
        }

        //Condition 7: check homograph characters
        if (punycode.toASCII(urlHostname).includes("xn--")) {
            setScore((prevScore) => prevScore + 6);
        }

        // Condition 8: Check URL length
        if (url.origin.length > 100) {
            setScore((prevScore) => prevScore + 2);
        }

        // Condition 9: Many special character checking
        if (specialCharInUrl > 5) {
            setScore((prevScore) => prevScore + 1);
        }

        // Condition 10: Check domain age -
        if (!domainInfo.WhoisRecord.dataError) {
            const domainAge = thisYear - domainCreatedDate;

            if (domainAge < 1) {
                setScore((prevScore) => prevScore + 5);
            } else if (domainAge >= 1 && domainAge <= 2) {
                setScore((prevScore) => prevScore + 3);
            } else if (domainAge > 2 && domainAge <= 5) {
                setScore((prevScore) => prevScore + 1);
            } else {
                setScore((prevScore) => prevScore + 0);
            }
        }
    };

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
                        <button
                            onClick={() => setLoading(true)}
                            className="btn bg-[#56cbf9]"
                        >
                            Analyze
                        </button>
                    </div>
                </form>
            </section>

            <ResultModal score={score} loading={loading} setScore={setScore} />
        </div>
    );
};

export default UrlChecker;
