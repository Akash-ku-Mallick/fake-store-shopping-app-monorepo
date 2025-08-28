import { useAppSelector } from "../../../hooks/reduxHelper";
import { getMyProfile } from "../../../store/slices/myProfile";

export default function Profile() {
  const user = useAppSelector(getMyProfile);

  if (!user) return <p>No user data</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="space-y-2">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Avatar:</strong> 
          <img 
            src={user.avatar} 
            alt={`${user.name} avatar`} 
            className="w-16 h-16 rounded-full inline-block ml-2"
          />
        </p>
        <p><strong>Created At:</strong> {new Date(user.creationAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
