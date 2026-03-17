import { useEffect, useState } from "react";

export default function FloatingTimer({ currentView }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const el = document.querySelector(".timer-text");
            if (el) setTime(el.textContent);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time || currentView === 'timer' || time === "00:00") return null;

    return (
        <div style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            padding: "10px 18px",
            borderRadius: "14px",
            background: "rgba(15, 17, 26, 0.85)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            backdropFilter: "blur(12px)",
            color: "#f59e0b",
            fontSize: "15px",
            fontFamily: "monospace",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            animation: "pulse 2s infinite"
        }}>
            <span style={{ fontSize: "10px", color: "#f59e0b" }}>●</span>
            {time}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}