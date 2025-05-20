import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
