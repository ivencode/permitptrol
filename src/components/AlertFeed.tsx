"use client";

import { Calendar, ExternalLink, Siren, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import AgentTerminal from "./AgentTerminal";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AlertFeed() {
    const { selectedProperty } = usePortfolio();
    const [isScanning, setIsScanning] = useState(false);
    const [alerts, setAlerts] = useState<any[]>([]);

    // Simulation: When city changes, run a scan
    useEffect(() => {
        if (selectedProperty) {
            setIsScanning(true);
        }
    }, [selectedProperty?.id]); // Re-run when property ID changes

    const handleScanComplete = () => {
        setIsScanning(false);
        // Mock different alerts based on city
        if (selectedProperty?.city === 'Austin') {
            setAlerts([{ type: 'critical', title: 'Proposed Ban in Zone B', severity: 'critical', id: 42 }]);
        } else if (selectedProperty?.city === 'Nashville') {
            setAlerts([{ type: 'warning', title: 'New Fire Safety inspection required', severity: 'warning', id: 101 }]);
        } else {
            setAlerts([]);
        }
    };


    return (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', minHeight: '300px' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        background: 'var(--primary-glow)',
                        padding: '8px',
                        borderRadius: '8px',
                        color: 'var(--primary)'
                    }}>
                        <Siren size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>City Council Monitor</h3>
                </div>
                {isScanning && <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCcw size={12} className="spin" /> LIVE AGENT</span>}
            </div>

            {isScanning ? (
                <AgentTerminal city={selectedProperty?.city || 'City'} onComplete={handleScanComplete} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                    {alerts.length > 0 ? alerts.map((alert, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            padding: '1rem',
                            borderLeft: `4px solid ${alert.severity === 'critical' ? '#EF4444' : 'var(--warning)'}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: alert.severity === 'critical' ? '#EF4444' : 'var(--warning)',
                                    fontWeight: 'bold',
                                    background: alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                    padding: '2px 6px',
                                    borderRadius: '4px'
                                }}>
                                    {alert.severity === 'critical' ? 'CRITICAL · PROPOSED BAN' : 'WARNING · COMPLIANCE'}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={12} /> Today, 2:00 PM
                                </span>
                            </div>
                            <p style={{ fontWeight: '500', marginBottom: '0.25rem', lineHeight: '1.4' }}>
                                {alert.title}
                            </p>
                            <button style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary)',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer',
                                padding: 0,
                                marginTop: '0.5rem'
                            }}>
                                Read Full Agenda <ExternalLink size={12} />
                            </button>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            <p>No active alerts found for {selectedProperty?.city}.</p>
                            <p style={{ fontSize: '0.75rem' }}>Agent scan complete.</p>
                        </div>
                    )}
                </div>
            )}
            <style jsx>{`
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
