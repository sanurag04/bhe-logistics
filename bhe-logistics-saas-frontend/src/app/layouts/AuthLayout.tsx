/** @format */
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] flex items-center justify-center">
      <Outlet />
    </div>
  );
}
