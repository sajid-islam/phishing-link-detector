const UrlChecker = () => {
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
                <form className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="http://example.com"
                        className="input w-full"
                    />{" "}
                    <button className="btn bg-[#56cbf9]">Analyze</button>
                </form>
            </section>
        </div>
    );
};

export default UrlChecker;
