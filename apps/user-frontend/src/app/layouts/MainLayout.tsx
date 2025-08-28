import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHelper";
// import { useGetMyProfileQuery } from "../../store/services/profileApi";
import ProductSearch from "@shared/components/ui/searchbar/productSearch";
import AppToaster from "@shared/components/ui/toaste";
import { currentToken, currentUser, logout } from "../../store/slices/authSlice";

export default function MainLayout() {
  const dispatch = useAppDispatch()
  const User = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);
  // useGetMyProfileQuery(undefined, {
  //   skip: true,
  // });

  function triggerLogout(): void {
    dispatch(logout())
  }

  return (
    <div className="flex flex-col justify-between min-h-svh bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-blue-200 text-gray-900 flex justify-between items-center sticky top-0 z-20 shadow-md">
        <div>
          <Link
            to="/"
            className="text-lg font-bold text-yellow-700 hover:text-yellow-800 transition-colors"
          >
            SHopSe
          </Link>
        </div>

        <ProductSearch />

        <div className="flex space-x-3 items-center">
          <Link
            to="/cart"
            className="px-3 py-1 rounded-md bg-yellow-200 hover:bg-yellow-300 text-gray-800 transition-colors"
          >
            Cart
          </Link>
          {User?.name?.firstName}
          {token && User ? (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  src={User?.avatar ?? "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                  alt="avatar"
                  className="h-[30px] w-[30px] rounded-full border border-yellow-400"
                />
              </button>

              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all">
                <div className="px-4 py-2 text-center border-b text-sm font-medium text-blue-700">
                  {User.name?.firstName}
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-50 text-sm"
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-red-500"
                  onClick={triggerLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="px-3 py-1 rounded-md bg-yellow-200 hover:bg-yellow-300 text-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="p-4 flex flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-4 bg-blue-100 text-center text-gray-700 border-t border-yellow-200">
        © 2025 MyShop — <span className="text-yellow-600">Made with ❤️</span>
      </footer>
      
      <AppToaster />
    </div>
  );
}
