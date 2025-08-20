import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">Admin Panel</header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
