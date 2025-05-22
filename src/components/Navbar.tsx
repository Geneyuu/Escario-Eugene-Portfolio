import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const updateIndicator = () => {
            const activeLink = navRef.current?.querySelector('.active') as HTMLElement | null;
            console.log(activeLink);

            if (activeLink && indicatorRef.current) {
                indicatorRef.current.style.left = `${activeLink.offsetLeft}px`;
                indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [pathname]);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
            isActive ? 'text-gray-800 transition-all duration-800 active' : 'text-white hover:text-white'
        }`;

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-full max-w-[1280px] px-4">
            {/* LEFT: Logo */}
            <NavLink to="/">
                <img src={logo} alt="Logo" className="object-contain h-15 " />
            </NavLink>

            {/* CENTER: Nav Links */}
            <div ref={navRef} className="relative flex gap-5 px-2 py-[7px] bg-white/15 rounded-xl border border-white/20 shadow-inner overflow-hidden backdrop-blur-md ">
                {/* Sliding Indicator */}
                <div ref={indicatorRef} className="absolute top-2 bottom-2 bg-white rounded-md transition-all duration-600 z-0" />

                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/about-me" className={navLinkClass}>
                    About Me
                </NavLink>
                <NavLink to="/projects" className={navLinkClass}>
                    Projects
                </NavLink>
                <NavLink to="/lets-chat" className={navLinkClass}>
                    Contact
                </NavLink>
            </div>

            {/* RIGHT: Link or Button */}
            <div className="text-white text-sm">Links</div>
        </nav>
    );
}
