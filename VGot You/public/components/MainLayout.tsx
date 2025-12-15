import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingWidgets from './FloatingWidgets';

const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <FloatingWidgets />
            <Footer />
        </>
    );
};

export default MainLayout;
