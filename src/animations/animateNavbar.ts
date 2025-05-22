import gsap from 'gsap';
import type { GsapTargetNavbar } from '../types/animationNavbarTypes';

export const animateNavbar = (target: GsapTargetNavbar) => {
    if (!target) return;

    gsap.fromTo(
        target,
        { y: -100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
        }
    );
};
