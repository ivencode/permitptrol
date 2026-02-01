import PropertySidebar from "@/components/PropertySidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <PropertySidebar />
            <main style={{ flex: 1, background: 'linear-gradient(to bottom right, #05050A, #0A0A15)' }}>
                {children}
            </main>
        </div>
    );
}
