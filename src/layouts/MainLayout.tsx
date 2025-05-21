import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { animatePage as animatePageFn } from "../animations/animatePage"; // rename to avoid conflict
import { useEffect, useRef } from "react";

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
			<div
				ref={pageRef}
				className="relative z-0 min-h-screen w-full px-50 py-0"
			>
				<Outlet />
			</div>
		</>
	);
}
