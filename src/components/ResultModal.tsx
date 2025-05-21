import type React from "react";

type ResultModalProps = {
    score: number;
    loading: boolean;
    setScore: (score: number) => void;
};

const getRiskResult = (score: number) => {
    if (score <= 3) {
        return {
            level: "Safe",
            color: "text-green-600",
            icon: "✅",
            message:
                "This URL appears safe, but always double-check before entering sensitive information.",
        };
    } else if (score <= 7) {
        return {
            level: "Suspicious",
            color: "text-yellow-500",
            icon: "⚠️",
            message:
                "This URL has some suspicious traits. Proceed with caution and verify its source.",
        };
    } else if (score <= 14) {
        return {
            level: "Malicious",
            color: "text-orange-600",
            icon: "🚨",
            message:
                "This URL is likely malicious. It may lead to scams or phishing — avoid interacting.",
        };
    } else {
        return {
            level: "Critical Threat",
            color: "text-red-700",
            icon: "❌",
            message:
                "This URL is extremely dangerous and likely part of a phishing attack. Do NOT visit it.",
        };
    }
};

const ResultModal: React.FC<ResultModalProps> = ({
    score,
    loading,
    setScore,
}) => {
    const result = getRiskResult(score);
    const handleSetScoreZero = () => {
        setTimeout(() => {
            setScore(0);
        }, 300);
    };

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button
                        onClick={handleSetScoreZero}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>

                {loading ? (
                    <div className="flex flex-col gap-4 w-full my-20 items-center justify-center">
                        <div className="w-20 h-20 border-4 border-transparent text-[#56cbf9] animate-spin border-t-[#56cbf9] rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-transparent text-[#051923] animate-spin border-t-[#051923] rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Analyzing URL...
                        </p>
                    </div>
                ) : (
                    <div className="text-center space-y-4 my-6">
                        <div className={`text-5xl ${result.color}`}>
                            {result.icon}
                        </div>
                        <h2 className={`text-2xl font-bold ${result.color}`}>
                            {result.level}
                        </h2>
                        <p className="text-gray-700">{result.message}</p>
                    </div>
                )}
            </div>
        </dialog>
    );
};

export default ResultModal;
