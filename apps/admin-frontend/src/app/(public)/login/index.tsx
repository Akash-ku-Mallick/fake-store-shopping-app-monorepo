export default function Login() {
  return (
    <div className="p-6 bg-white rounded shadow-md w-96">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <form>
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
