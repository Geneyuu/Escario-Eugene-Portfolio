import { NavLink, useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

import { useEffect, useRef } from 'react';
import { animateNavbar } from '../animations/animateNavbar';
import { animatePage } from '../animations/animatePage';

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        animateNavbar(navRef.current);
    }, [location.pathname]);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium px-5 py-0 rounded transition-colors duration-300 cursor-pointer ${
            isActive
                ? 'bg-[#f0694b] border border-black/10 text-white'
                : 'text-black hover:bg-gray-300 hover:text-black'
        }`;

    return (
        <div className='flex justify-center norwester border-b-black/10' ref={navRef}>
            <nav
                className='
				sticky top-0 z-50
				bg-white
				backdrop-blur-[4px] 
				border-b border-black/20 
				flex justify-between items-center py-6 px-70 w-full text-black'
            >
                {/* Logo + Nav links left */}
                <div className='flex items-center gap-10'>
                    <div className='font-bold text-2xl cursor-pointer'>
                        <h1 className='text-[35px] tracking-[-2px]'>&lt;Escreates/&gt;</h1>
                    </div>

                    <div className='flex gap-1 items-center'>
                        <NavLink to='/' className={navLinkClass}>
                            <h1 className='h1'>HOME</h1>
                        </NavLink>
                        <NavLink to='/about-me' className={navLinkClass}>
                            <h1 className='h1'>ABOUT</h1>
                        </NavLink>
                        <NavLink to='/projects' className={navLinkClass}>
                            <h1 className='h1'>PROJECTS</h1>
                        </NavLink>
                    </div>
                </div>

                {/* Icons right */}
                <div className='flex gap-4 text-black text-lg cursor-pointer items-center'>
                    <NavLink to='/lets-chat'>
                        <h1 className='bg-[#0d0d0d] text-white mr-10 px-6 py-2 rounded cursor-pointer hover:bg-[#f0694b] transition active:scale-95'>
                            Let's Connect!
                        </h1>
                    </NavLink>

                    <a
                        href='https://github.com/Geneyuu'
                        target='_blank'
                        rel='noreferrer'
                        aria-label='GitHub'
                        className='hover:text-gray-600 transition-colors flex items-center gap-2 mr-5'
                    >
                        <FaGithub />
                        Geneyuu
                    </a>
                    <a
                        href='/settings'
                        aria-label='Settings'
                        className='hover:text-gray-600 transition-colors bg-gray-200 rounded p-2'
                    >
                        <IoSettingsOutline size={20} />
                    </a>
                </div>
            </nav>
        </div>
    );
}
