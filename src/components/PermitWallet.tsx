"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { FileCheck, Clock, AlertTriangle } from "lucide-react";

export default function PermitWallet() {
    const { selectedProperty } = usePortfolio();

    if (!selectedProperty) return null;

    // Mock expiry dates based on property to show variety
    const getExpiry = () => {
        if (selectedProperty.city === 'Austin') return { days: 12, date: 'Feb 15, 2026', status: 'warning' };
        if (selectedProperty.city === 'Nashville') return { days: 145, date: 'Jun 30, 2026', status: 'good' };
        return { days: -5, date: 'Jan 25, 2026', status: 'critical' };
    };

    const expiry = getExpiry();

    return (
        <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem', background: 'linear-gradient(to right, rgba(255,255,255,0.02), rgba(255,255,255,0.0))' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <FileCheck size={24} color="#ccc" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>STR Permit #{1000 + parseInt(selectedProperty.id) * 35}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#888' }}>Issued by City of {selectedProperty.city}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>EXPIRES ON</p>
                        <p style={{ fontWeight: 600 }}>{expiry.date}</p>
                    </div>

                    <div style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: expiry.status === 'good' ? 'rgba(16, 185, 129, 0.1)' : (expiry.status === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
                        color: expiry.status === 'good' ? 'var(--success)' : (expiry.status === 'warning' ? 'var(--warning)' : '#EF4444'),
                        border: `1px solid ${expiry.status === 'good' ? 'var(--success)' : (expiry.status === 'warning' ? 'var(--warning)' : '#EF4444')}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 600
                    }}>
                        {expiry.status === 'critical' ? <AlertTriangle size={16} /> : <Clock size={16} />}
                        {expiry.status === 'critical' ? 'EXPIRED' : `${expiry.days} Days Left`}
                    </div>

                    <button style={{
                        background: 'white', color: 'black', fontWeight: 600,
                        border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'
                    }}>
                        Renew Now
                    </button>
                </div>
            </div>
        </div>
    );
}
