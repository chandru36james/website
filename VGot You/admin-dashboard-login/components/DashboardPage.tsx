import React from 'react';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface DashboardPageProps {
    session: Session;
}

// --- Mock Data for Charts ---
const userSignupsData = [
  { name: 'Jan', signups: 400 },
  { name: 'Feb', signups: 300 },
  { name: 'Mar', signups: 500 },
  { name: 'Apr', signups: 280 },
  { name: 'May', signups: 190 },
  { name: 'Jun', signups: 450 },
];

const websiteTrafficData = [
  { name: 'Mon', visits: 240 },
  { name: 'Tue', visits: 139 },
  { name: 'Wed', visits: 980 },
  { name: 'Thu', visits: 390 },
  { name: 'Fri', visits: 480 },
  { name: 'Sat', visits: 380 },
  { name: 'Sun', visits: 430 },
];

const userRolesData = [
  { name: 'Admins', value: 15 },
  { name: 'Editors', value: 45 },
  { name: 'Viewers', value: 120 },
];

const COLORS = ['#6b7280', '#9ca3af', '#d1d5db'];


const DashboardPage: React.FC<DashboardPageProps> = ({ session }) => {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        }
        // The onAuthStateChange listener in App.tsx will handle redirecting to the login page.
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-gray-800 shadow-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18M5.468 12.001l13.064 0M5.468 12.001L4.09 9.75m1.378 2.251L4.09 14.25m15.82 2.25l-1.378-2.25m1.378 2.25l-1.378 2.25M9.75 5.468l2.252-1.378m-2.252 1.378l-2.252 1.378m6.75 11.494l2.252 1.378m-2.252-1.378l2.252-1.378" />
                         </svg>
                        <h1 className="text-2xl font-bold text-gray-200">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://www.vgotyou.com/admin/1204.html" // NOTE: Replace with the actual path to your audit page
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Free Audit
                        </a>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg mb-8">
                    <h2 className="text-3xl font-light text-gray-200 mb-2">Welcome back, Admin!</h2>
                    <p className="text-gray-400 mb-6">You are logged in with the email:</p>
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-gray-100 font-mono break-all">{session.user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-3">
                        <h3 className="font-semibold text-lg text-gray-200 mb-4">Monthly User Signups</h3>
                        <div style={{ width: '100%', height: 300 }}>
                           <ResponsiveContainer>
                                <BarChart data={userSignupsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                    <XAxis dataKey="name" tick={{ fill: '#d1d5db' }} />
                                    <YAxis tick={{ fill: '#d1d5db' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none' }} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}/>
                                    <Legend wrapperStyle={{ color: '#d1d5db' }}/>
                                    <Bar dataKey="signups" fill="#9ca3af" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-2">
                        <h3 className="font-semibold text-lg text-gray-200 mb-4">Weekly Website Traffic</h3>
                         <div style={{ width: '100%', height: 300 }}>
                           <ResponsiveContainer>
                                <LineChart data={websiteTrafficData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                    <XAxis dataKey="name" tick={{ fill: '#d1d5db' }} />
                                    <YAxis tick={{ fill: '#d1d5db' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none' }} />
                                    <Legend wrapperStyle={{ color: '#d1d5db' }}/>
                                    <Line type="monotone" dataKey="visits" stroke="#9ca3af" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="font-semibold text-lg text-gray-200 mb-4">User Role Distribution</h3>
                         <div style={{ width: '100%', height: 250 }}>
                           <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={userRolesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#d1d5db" label>
                                        {userRolesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none' }}/>
                                    <Legend wrapperStyle={{ color: '#d1d5db' }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                     <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-200">Manage Users</h3>
                            <p className="text-gray-400 mt-2">Add, edit, or remove users from your team.</p>
                        </div>
                        <button className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors self-start">
                            Go to Users
                        </button>
                    </div>
                     <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-200">System Settings</h3>
                            <p className="text-gray-400 mt-2">Configure global settings for the application.</p>
                        </div>
                         <button className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors self-start">
                            Go to Settings
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;