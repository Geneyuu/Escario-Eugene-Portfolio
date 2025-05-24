// layouts/HeroLayout.tsx
import React from 'react';

interface HeroLayoutProps {
    children: React.ReactNode;
}

const HeroLayout: React.FC<HeroLayoutProps> = ({ children }) => {
    return <section className='w-full px='>{children}</section>;
};

export default HeroLayout;
