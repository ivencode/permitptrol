"use client";

import { useState } from "react";
import { X, Search, MapPin, Check } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AddPropertyWizard({ onClose }: { onClose: () => void }) {
    const { addProperty } = usePortfolio();
    const [step, setStep] = useState<1 | 2>(1);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [scanning, setScanning] = useState(false);

    const handleScan = () => {
        if (!address || !city) return;
        setScanning(true);

        // Simulate city database discovery
        setTimeout(() => {
            setScanning(false);
            setStep(2);
        }, 1500);
    };

    const handleConfirm = () => {
        addProperty({
            address,
            city,
            state: 'TX', // Mocked for simplicity
            zip: '00000'
        });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
            backdropFilter: 'blur(5px)'
        }}>
            <div className="glass-card" style={{ width: '500px', padding: '2rem', background: '#0A0A15' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Add New Property</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {step === 1 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Street Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="e.g. 123 Ocean Drive"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="e.g. Miami"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                            />
                        </div>

                        <button
                            onClick={handleScan}
                            className="primary-button"
                            style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                            {scanning ? (
                                <>
                                    <div className="spinner" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                                    Locating City Database...
                                </>
                            ) : (
                                <>
                                    <Search size={18} /> find City Regulations
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '50%', color: 'var(--success)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                        }}>
                            <Check size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>City Council Found</h3>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>
                            We found the official agenda portal for <strong>{city}</strong>. We can start monitoring instantly.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setStep(1)}
                                style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--glass-border)', color: '#ccc', cursor: 'pointer' }}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="primary-button"
                                style={{ flex: 1 }}
                            >
                                Start Monitoring
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
