"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type Property = {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    status: 'active' | 'warning' | 'critical';
    riskScore: number;
    lastChecked: string;
};

type PortfolioContextType = {
    properties: Property[];
    selectedProperty: Property | null;
    selectProperty: (id: string) => void;
    addProperty: (property: Omit<Property, 'id' | 'status' | 'riskScore' | 'lastChecked'>) => void;
};

// Mock Initial Data
const INITIAL_PROPERTIES: Property[] = [
    {
        id: '1',
        address: '1200 S Congress Ave',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        status: 'active',
        riskScore: 85,
        lastChecked: '2 min ago'
    },
    {
        id: '2',
        address: '500 Broadway',
        city: 'Nashville',
        state: 'TN',
        zip: '37203',
        status: 'warning',
        riskScore: 45,
        lastChecked: '1 hour ago'
    },
    {
        id: '3',
        address: '880 Harbor Dr',
        city: 'San Diego',
        state: 'CA',
        zip: '92101',
        status: 'critical',
        riskScore: 92,
        lastChecked: 'Just now'
    }
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
    const [selectedPropertyId, setSelectedPropertyId] = useState<string>(INITIAL_PROPERTIES[0].id);

    const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

    const selectProperty = (id: string) => {
        setSelectedPropertyId(id);
    };

    const addProperty = (newProp: Omit<Property, 'id' | 'status' | 'riskScore' | 'lastChecked'>) => {
        const property: Property = {
            ...newProp,
            id: Math.random().toString(36).substr(2, 9),
            status: 'active', // Default for new properties
            riskScore: 10, // Low initial risk
            lastChecked: 'Just now'
        };
        setProperties([...properties, property]);
        setSelectedPropertyId(property.id);
    };

    return (
        <PortfolioContext.Provider value={{ properties, selectedProperty, selectProperty, addProperty }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
}
