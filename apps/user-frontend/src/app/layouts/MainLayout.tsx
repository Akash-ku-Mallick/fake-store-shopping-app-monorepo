import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 bg-gray-200 text-center">© 2025 MyShop</footer>
    </div>
  );
}
