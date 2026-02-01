"use client";

import { Upload, FileText, Check, XCircle, Search } from "lucide-react";
import { useState } from "react";

export default function DocumentUploader() {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'error' | 'success'>('idle');

    const handleUpload = () => {
        setStatus('uploading');

        // Simulate upload delay
        setTimeout(() => {
            setStatus('analyzing');

            // Simulate CV analysis delay then error
            setTimeout(() => {
                setStatus('error');
            }, 2000);
        }, 1000);
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} className="text-secondary" /> Permit Validator
            </h3>

            {status === 'idle' && (
                <div
                    onClick={handleUpload}
                    style={{
                        border: '2px dashed var(--glass-border)',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: 'rgba(255,255,255,0.01)'
                    }}
                    className="hover:bg-white/5"
                >
                    <Upload size={32} style={{ color: '#888', marginBottom: '0.5rem' }} />
                    <p style={{ fontWeight: 500 }}>Drop your floor plan here</p>
                    <p style={{ fontSize: '0.875rem', color: '#666' }}>PDF, JPG, PNG (Max 10MB)</p>
                </div>
            )}

            {status === 'uploading' && (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div className="spinner" style={{
                        width: '30px', height: '30px', border: '3px solid rgba(255,255,255,0.1)',
                        borderLeftColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1rem'
                    }} />
                    <p>Uploading...</p>
                </div>
            )}

            {status === 'analyzing' && (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        background: 'rgba(79, 70, 229, 0.1)',
                        padding: '1rem',
                        borderRadius: '50%',
                        marginBottom: '1rem',
                        color: 'var(--primary)'
                    }}>
                        <Search className="pulse" size={24} />
                    </div>
                    <p style={{ fontWeight: 500 }}>AI Analysis in progress...</p>
                    <p style={{ fontSize: '0.875rem', color: '#888' }}>Checking egress windows & fire safety...</p>
                </div>
            )}

            {status === 'error' && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #EF4444',
                    borderRadius: '12px',
                    padding: '1.5rem'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <XCircle size={24} color="#EF4444" style={{ flexShrink: 0 }} />
                        <div>
                            <h4 style={{ fontWeight: 'bold', color: '#EF4444', marginBottom: '4px' }}>Validation Failed</h4>
                            <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                                Your floor plan is missing a <strong>secondary egress window</strong> in the master bedroom.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                style={{
                                    background: '#EF4444',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}>
                                Fix & Re-upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .spinner { animation: spin 1s linear infinite; }
        .pulse { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; transform: scale(1.1); } }
      `}</style>
        </div>
    );
}
