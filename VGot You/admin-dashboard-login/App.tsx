
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from './services/supabaseClient';
import { Session } from '@supabase/supabase-js';
import LoginPage from './components/LoginPage';

// Lazily load the DashboardPage component. This will create a separate chunk for it.
const DashboardPage = lazy(() => import('./components/DashboardPage'));

const LoadingScreen: React.FC = () => (
    <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-gray-300 text-2xl font-light">Loading...</div>
    </div>
);

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // This initial loading state is for checking the user's session.
    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen">
            {!session ? (
                <LoginPage />
            ) : (
                // Use Suspense to show a fallback while the DashboardPage chunk is loading.
                <Suspense fallback={<LoadingScreen />}>
                    <DashboardPage key={session.user.id} session={session} />
                </Suspense>
            )}
        </div>
    );
};

export default App;
