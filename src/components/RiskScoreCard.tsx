import { AlertTriangle, TrendingDown } from "lucide-react";

export default function RiskScoreCard() {
    return (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#aaa', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Revenue Risk Score
                </h3>
                <span style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#EF4444',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <AlertTriangle size={12} /> HIGH RISK
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1, color: '#EF4444' }}>
                    85
                </span>
                <span style={{ color: '#888', paddingBottom: '8px', fontSize: '0.875rem' }}>/ 100</span>
            </div>

            <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }}></div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ccc', fontSize: '0.875rem' }}>Est. Fines (Mo)</span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>$5,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#ccc', fontSize: '0.875rem' }}>Potential Shutdown</span>
                    <span style={{ color: '#EF4444', fontWeight: 'bold' }}>30 Days</span>
                </div>
            </div>
        </div>
    );
}
