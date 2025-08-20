import type { RootState } from "apps/user-frontend/src/store/type";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <p>No user data</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      {user.email && <p><strong>Email:</strong> {user.email}</p>}
    </div>
  );
}
