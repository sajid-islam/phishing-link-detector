import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Allow requests from anywhere (or restrict to your frontend domain)
    res.setHeader("Access-Control-Allow-Origin", "*");
    // For preflight requests
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.status(200).end();
        return;
    }

    const { domainName } = req.body;
    try {
        const response = await fetch(
            `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.VITE_WHOIS_API_KEY}&domainName=${domainName}&outputFormat=JSON`
        );
        const domainInfo = await response.json();
        res.status(200).json(domainInfo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch WHOIS data" });
        console.error("There was an error", error);
    }
}
