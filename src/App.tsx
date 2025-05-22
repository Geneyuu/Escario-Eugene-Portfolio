import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './styles/nprogress-custom.css';
import { useEffect } from 'react';

function ProgressBar() {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();

        const timer = setTimeout(() => {
            NProgress.done();
        }, 200);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    console.log(location.pathname);
    return null;
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="relative z-0 min-h-screen w-full">
                <ProgressBar />
                {/* <ParticleBackground /> */}
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}
