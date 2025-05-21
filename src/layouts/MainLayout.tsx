import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
	return (
		<>
			<Navbar />
			<div className="relative z-0 min-h-screen w-full px-50 py-0">
				<Outlet />
			</div>
		</>
	);
}
