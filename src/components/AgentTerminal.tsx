"use client";

import { Terminal, ShieldCheck, Search, FileText } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const SIMULATION_LOGS = [
    { msg: "Connecting to city clerk portal...", icon: Search },
    { msg: "Bypassing CAPTCHA check...", icon: ShieldCheck },
    { msg: "Scanning agenda for 'Short Term Rental'...", icon: Search },
    { msg: "Found 2 matching PDF documents...", icon: FileText },
    { msg: "Extracting keywords: 'Ban', 'Ordinance'...", icon: FileText },
    { msg: "Analysis complete. 1 Critical Alert found.", icon: ShieldCheck }
];

export default function AgentTerminal({ city, onComplete }: { city: string, onComplete: () => void }) {
    const [logs, setLogs] = useState<typeof SIMULATION_LOGS>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLogs([]); // Reset on city change
        let delay = 0;

        SIMULATION_LOGS.forEach((log, index) => {
            delay += Math.random() * 800 + 400; // Random delay between 400ms and 1200ms
            setTimeout(() => {
                setLogs(prev => [...prev, log]);
                if (index === SIMULATION_LOGS.length - 1) {
                    setTimeout(onComplete, 500);
                }
            }, delay);
        });
    }, [city, onComplete]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-card" style={{
            background: '#050510',
            fontFamily: 'monospace',
            padding: '1rem',
            border: '1px solid var(--primary-glow)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                <Terminal size={14} color="#10B981" />
                <span style={{ fontSize: '0.75rem', color: '#10B981', textTransform: 'uppercase' }}>Agent Active: Monitoring {city}</span>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {logs.map((log, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', animation: 'fadeIn 0.2s ease' }}>
                        <span style={{ color: '#666' }}>{new Date().toLocaleTimeString()}</span>
                        <span style={{ color: '#ccc' }}>{">"}</span>
                        <span style={{ color: i === logs.length - 1 ? 'white' : '#aaa' }}>{log.msg}</span>
                    </div>
                ))}
                {logs.length < SIMULATION_LOGS.length && (
                    <div style={{ width: '8px', height: '14px', background: '#10B981', animation: 'blink 1s infinite' }} />
                )}
            </div>

            <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
}
