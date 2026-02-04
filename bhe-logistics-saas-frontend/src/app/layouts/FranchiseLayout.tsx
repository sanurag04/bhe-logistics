/** @format */

import { Outlet } from 'react-router-dom';
import Header from '../../layout/Header';
import Sidebar from '../../layout/Sidebar';

function FranchiseLayout() {
	return (
		<div className="h-screen w-screen flex flex-col overflow-hidden">
			{/* Header */}
			<Header />

			{/* Body */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<Sidebar />

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto bg-gray-50 p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default FranchiseLayout;
