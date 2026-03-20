"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

/**
 * HARD-CODED DEMO LOGIN
 * Credentials: admin@demo.com / admin123
 */
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Artificial delay for realism
        setTimeout(() => {
            if (email === "admin@demo.com" && password === "admin123") {
                localStorage.setItem("demo_admin", "true");
                router.push("/admin");
            } else {
                setError("Invalid demo credentials. Use admin@demo.com / admin123");
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#197fe6]/10 text-[#197fe6] rounded-2xl mb-6">
                            <span className="material-symbols-outlined text-3xl font-bold">admin_panel_settings</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Admin Demo Portal</h1>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold border border-red-100 dark:border-red-800 animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 focus:ring-4 focus:ring-[#197fe6]/10 focus:border-[#197fe6] transition-all outline-none font-medium"
                                placeholder="admin@demo.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 focus:ring-4 focus:ring-[#197fe6]/10 focus:border-[#197fe6] transition-all outline-none font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#197fe6] hover:bg-[#197fe6]/90 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-[#197fe6]/20 flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Launch Demo Dashboard"
                            )}
                        </button>
                    </form>

                    <div className="mt-10 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <p className="text-xs font-bold text-[#197fe6] uppercase tracking-widest mb-2">Demo Credentials</p>
                        <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
                           <p><strong>Email:</strong> admin@demo.com</p>
                           <p><strong>Password:</strong> admin123</p>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Interested in joining? <Link href="/register" className="text-[#197fe6] font-bold hover:underline">Apply for Franchise</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
