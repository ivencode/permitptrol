"use client";

import { CheckCircle, MapPin, RefreshCw } from "lucide-react";

export default function PropertyStatus() {
    return (
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    height: '48px',
                    width: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--success)'
                }}>
                    <MapPin size={24} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '4px' }}>1200 S Congress Ave</h2>
                    <p style={{ color: '#888', fontSize: '0.875rem' }}>Austin, TX 78704 · Unit B</p>
                </div>
            </div>

            <div style={{ textAlign: 'right' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '6px',
                    color: 'var(--success)',
                    fontWeight: 'bold',
                    marginBottom: '4px'
                }}>
                    <CheckCircle size={16} /> Monitored Active
                </div>
                <p style={{ color: '#888', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <RefreshCw size={10} className="spin-slow" /> Last checked: 2 min ago
                </p>
            </div>

            <style jsx>{`
        .spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
