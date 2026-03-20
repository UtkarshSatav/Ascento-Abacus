"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * DEMO AUTH GUARD
 * Bypasses all Firebase checks and uses the demo_admin flag.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isDemoAdmin = localStorage.getItem("demo_admin") === "true";
        const isAdminPath = pathname.startsWith("/admin");
        const isAuthPath = ["/login", "/register"].includes(pathname);

        if (isDemoAdmin) {
            // If logged in as demo admin, don't allow auth pages
            if (isAuthPath) {
                router.push("/admin");
                return;
            }
        } else {
            // If NOT logged in, don't allow admin pages
            if (isAdminPath) {
                router.push("/login");
                return;
            }
        }

        setLoading(false);
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#197fe6] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Demo Shield Active</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
