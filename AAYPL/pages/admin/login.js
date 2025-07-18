import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "preciousadmin" && password === "Badeji123@") {
      document.cookie = "adminSession=true; path=/";
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="mb-4 text-xl font-bold text-blue-700">Admin Login</h2>
        <input value={username} onChange={e => setUsername(e.target.value)}
          placeholder="Username" className="w-full mb-2 border p-2 rounded" required autoFocus />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password" className="w-full mb-2 border p-2 rounded" required />
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Login</button>
      </form>
    </div>
  );
}