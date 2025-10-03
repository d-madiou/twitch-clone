import React from 'react';
import { Navbar } from './_components/navbar';

interface BrowseLayoutProps {
    children: React.ReactNode;
}

const BrowseLayout: React.FC<BrowseLayoutProps> = ({ children }) => {
    return (
        <>
        <Navbar />
        <div className='bg-gray-900 min-h-screen p-4 mt-20'>
            {children}
        </div>
        </>
    );
};

export default BrowseLayout;