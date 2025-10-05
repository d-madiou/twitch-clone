import React from 'react';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { Container } from './_components/container';

interface BrowseLayoutProps {
    children: React.ReactNode;
}

const BrowseLayout: React.FC<BrowseLayoutProps> = ({ children }) => {
    return (
        <>
        <Navbar />
        <div className='bg-gray-900 min-h-screen p-4 mt-20'>
            <Sidebar />
            <Container>
              {children}
            </Container>
        </div>
        </>
    );
};

export default BrowseLayout;