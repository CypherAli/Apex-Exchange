"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await res.json();
      // Lưu token và chuyển hướng
      login(data.access_token);
      router.push('/'); // Redirect to home 
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0e11] text-white">
      <div className="bg-[#1e2026] p-8 rounded-lg shadow-lg w-96 border border-gray-800">
        {/* Back to Home Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-4 text-gray-400 hover:text-yellow-500 text-sm flex items-center gap-2 transition"
        >
          <span>←</span> Back to Home
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-500">
          Login to Binance Clone
        </h1>
        
        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#2b3139] border border-gray-700 rounded p-2 text-white focus:border-yellow-500 outline-none"
              placeholder="testuser"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2b3139] border border-gray-700 rounded p-2 text-white focus:border-yellow-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p className="font-semibold mb-2">🔑 Test Account:</p>
          <div className="bg-[#2b3139] p-3 rounded border border-gray-700">
            <p className="font-mono text-white">Username: <span className="text-yellow-400">trader1</span></p>
            <p className="font-mono text-white">Password: <span className="text-yellow-400">Pass1234</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
