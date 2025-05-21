import { NavLink, useLocation } from "react-router-dom";
import { FaGithub, FaCog } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { animateNavbar } from "../animations/animateNavbar";
import { animatePage } from "../animations/animatePage";

export default function Navbar() {
	const navRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	useEffect(() => {
		animateNavbar(navRef.current);
	}, [location.pathname]);

	console.log(location.pathname);

	const navLinkClass = ({ isActive }: { isActive: boolean }) =>
		`text-sm font-medium px-3 py-2 rounded transition-colors duration-300 cursor-pointer ${
			isActive
				? "bg-gray-700/40 border-[1px] border-white/10 text-white"
				: "text-white hover:bg-gray-700/40 hover:text-white"
		}`;

	return (
		<div
			className="flex justify-center norwester border-b-white/10"
			ref={navRef}
		>
			<nav
				className="
					bg-gray-700/15
					backdrop-blur-[4px] 
					border-b border-white/20 
					flex justify-between items-center py-6 px-50 w-full text-white
				"
			>
				{/* Logo + Nav links left */}
				<div className="flex items-center gap-10">
					<div className="text-white font-bold text-2xl cursor-pointer">
						<h1 className="text-[30px]">EsCreates.</h1>
					</div>

					<div className="flex gap-3 items-center">
						<NavLink to="/" className={navLinkClass}>
							<h1 className="h1">Home</h1>
						</NavLink>
						<NavLink to="/about-me" className={navLinkClass}>
							<h1 className="h1">About</h1>
						</NavLink>
						<NavLink to="/projects" className={navLinkClass}>
							<h1 className="h1">Projects</h1>
						</NavLink>
					</div>
				</div>

				{/* Icons right */}
				<div className="flex gap-4 text-white text-lg cursor-pointer items-center">
					<NavLink to="/lets-chat">
						<h1 className="bg-white mr-10 px-6 py-2 text-black rounded cursor-pointer hover:bg-white/90 transition active:scale-95">
							Let's Chat
						</h1>
					</NavLink>

					<a
						href="https://github.com/Geneyuu"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						className="hover:text-gray-400 transition-colors flex items-center gap-2 mr-5"
					>
						<FaGithub />
						Github
					</a>
					<a
						href="/settings"
						aria-label="Settings"
						className="hover:text-gray-400 transition-colors"
					>
						<FaCog />
					</a>
				</div>
			</nav>
		</div>
	);
}
