"use client";

import PropertyStatus from "@/components/PropertyStatus";
import RiskScoreCard from "@/components/RiskScoreCard";
import AlertFeed from "@/components/AlertFeed";
import DocumentUploader from "@/components/DocumentUploader";
import { usePortfolio } from "@/context/PortfolioContext";
import PermitWallet from "@/components/PermitWallet";

export default function Dashboard() {
    const { selectedProperty } = usePortfolio();

    if (!selectedProperty) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
                    <p style={{ color: '#888' }}>Monitoring: <span style={{ color: 'white' }}>{selectedProperty.city}, {selectedProperty.state}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="primary-button" style={{ fontSize: '0.875rem', padding: '8px 16px' }}>
                        + Add Property
                    </button>
                </div>
            </header>

            <div className="dashboard-grid">

                {/* Top Row: Property Status (Full Width) */}
                <div style={{ gridColumn: 'span 12' }}>
                    <PropertyStatus />
                </div>

                {/* Middle Row: Risk Score & Document Upload */}
                <div style={{ gridColumn: 'span 4' }}>
                    <RiskScoreCard />
                </div>
                <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column' }}>
                    <DocumentUploader />
                </div>

                <div style={{ gridColumn: 'span 12' }}>
                    <PermitWallet />
                </div>

                {/* Bottom Row: Alert Feed (Full Width / or split depending on design) */}
                <div style={{ gridColumn: 'span 12' }}>
                    <AlertFeed />
                </div>

            </div>
        </div>
    );
}
