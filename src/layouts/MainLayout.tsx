import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { animatePage as animatePageFn } from '../animations/animatePage';
import { useEffect, useRef } from 'react';

export default function MainLayout() {
    const pageRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (pageRef.current) {
            animatePageFn(pageRef.current);
        }
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            <div ref={pageRef} className='max-w-screen-xl mx-auto px-5'>
                <Outlet />
            </div>
        </>
    );
}
