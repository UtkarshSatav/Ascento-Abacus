"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const isAdminPath = pathname.startsWith("/admin");
            const isAuthPath = ["/login", "/register"].includes(pathname);

            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "Users", user.uid));
                    const role = userDoc.exists() ? userDoc.data().Role?.trim().toLowerCase() : "user";

                    if (isAuthPath) {
                        router.push(role === "admin" ? "/admin" : "/profile");
                        return;
                    }

                    if (isAdminPath && role !== "admin") {
                        router.push("/profile");
                        return;
                    }
                } catch (err) {
                    console.error("Auth Guard Failure:", err);
                    if (isAdminPath) router.push("/login");
                }
            } else {
                if (isAdminPath) {
                    router.push("/login");
                    return;
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-[#0e141b]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-[#197fe6] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] italic">Securing Tunnel Connection</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
