"use client";

import { usePortfolio } from "@/context/PortfolioContext";

import { Plus, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddPropertyWizard from "./AddPropertyWizard";

export default function PropertySidebar() {
    const { properties, selectedProperty, selectProperty } = usePortfolio();
    const [showWizard, setShowWizard] = useState(false);
    const pathname = usePathname();

    // Helper to determine status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return '#EF4444';
            case 'warning': return '#F59E0B';
            default: return '#10B981';
        }
    };

    return (
        <aside style={{
            width: '280px',
            borderRight: '1px solid var(--glass-border)',
            height: '100vh',
            position: 'sticky',
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(5, 5, 10, 0.5)',
            backdropFilter: 'blur(20px)'
        }}>
            <div style={{ padding: '1.5rem' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="text-gradient">
                    PermitPatrol
                </Link>
            </div>

            <div style={{ padding: '0 1rem', marginBottom: '2rem' }}>
                <p style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: '#666',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    marginBottom: '0.75rem',
                    paddingLeft: '0.5rem'
                }}>
                    Your Properties
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {properties.map(property => (
                        <button
                            key={property.id}
                            onClick={() => selectProperty(property.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: 'none',
                                background: selectedProperty?.id === property.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                                color: selectedProperty?.id === property.id ? 'white' : '#888',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s ease',
                                width: '100%'
                            }}
                            className="hover:bg-white/5"
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <Home size={16} />
                                <div style={{
                                    position: 'absolute',
                                    top: '-2px',
                                    right: '-2px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: getStatusColor(property.status),
                                    border: '2px solid var(--background)'
                                }} />
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <p style={{ fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {property.address}
                                </p>
                                <p style={{ fontSize: '0.75rem', color: '#666' }}>{property.city}, {property.state}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setShowWizard(true)}
                    style={{
                        marginTop: '1rem',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px dashed var(--glass-border)',
                        background: 'transparent',
                        color: '#888',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                    }}>
                    <Plus size={16} /> Add Property
                </button>
            </div>

            <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-main)' }}></div>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Demo User</p>
                        <p style={{ fontSize: '0.75rem', color: '#666' }}>Premium Plan</p>
                    </div>
                </div>
            </div>

            {showWizard && <AddPropertyWizard onClose={() => setShowWizard(false)} />}
        </aside>
    );
}
