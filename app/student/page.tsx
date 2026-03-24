"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { student } from "./components/StudentData";
import { Skeleton } from "./components/PortalComponents";
import { 
  PageDashboard, PageAcademics, PageTimetable, PageExams, PageAttendance, 
  PageFees, PageResults, PageTeachers, PageNotifications, PageDocuments, 
  PageProfile, PageSettings 
} from "./components/PortalPages";

// --- NAV CONFIG ---
const navItems = [
  { id:"dashboard",   label:"Dashboard",       icon:"🏠" },
  { id:"academics",   label:"My Academics",    icon:"🎓" },
  { id:"timetable",   label:"Timetable",       icon:"🗓️" },
  { id:"exams",       label:"Exams",           icon:"📝" },
  { id:"attendance",  label:"Attendance",      icon:"📅" },
  { id:"fees",        label:"Fees",            icon:"💰" },
  { id:"results",     label:"Results",         icon:"📈" },
  { id:"teachers",    label:"Teachers",        icon:"👨‍🏫" },
  { id:"notifications",label:"Notifications",  icon:"🔔", badge:2 },
  { id:"documents",   label:"Documents",       icon:"📂" },
  { id:"profile",     label:"Profile",         icon:"👤" },
  { id:"settings",    label:"Settings",        icon:"⚙️" },
];

const pages: Record<string, React.ComponentType> = {
  dashboard:PageDashboard,
  academics:PageAcademics,
  timetable:PageTimetable,
  exams:PageExams,
  attendance:PageAttendance,
  fees:PageFees,
  results:PageResults,
  teachers:PageTeachers,
  notifications:PageNotifications,
  documents:PageDocuments,
  profile:PageProfile,
  settings:PageSettings,
};

// --- APP ---
export default function StudentPortal() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "Users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = (userData.Role || "User").trim().toLowerCase();
          
          if (role === "student" || role === "user") { // Assuming 'student' or 'user' can access for now
            setUser(firebaseUser);
            setAuthLoading(false);
          } else {
            router.push("/profile");
          }
        } else {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const navigate = (id: string) => {
    setLoading(true);
    if (window.innerWidth <= 768) setSidebarOpen(false);
    setTimeout(() => { setPage(id); setLoading(false); }, 400);
  };

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#030712", display: "flex", alignItems: "center", justifyContent: "center", color: "#f9fafb", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, opacity: 0.8 }}>AUTHENTICATING...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  const PageComp = pages[page] || PageDashboard;

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f9fafb", fontFamily: "'DM Sans', sans-serif", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:#0f172a;}
        ::-webkit-scrollbar-thumb{background:#374151;border-radius:4px;}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .page-anim{animation:fadeIn .35s ease}
        button:hover{opacity:.9}
        .nav-item:hover{background:#1f2937!important}
      `}</style>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && typeof window !== 'undefined' && window.innerWidth <= 768 && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "#000a", zIndex: 40 }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 0,
        minWidth: sidebarOpen ? 240 : 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        background: "#080f1a",
        borderRight: "1px solid #1f2937",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        transition: "width .25s,min-width .25s",
        zIndex: 50,
        flexShrink: 0,
      }}>
        <div style={{ width: 240, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
          {/* Logo */}
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1f2937", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#197fe6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "#fff", flexShrink: 0 }}>A</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#f9fafb", letterSpacing: ".3px" }}>AcentoAbacus</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 1 }}>Student Portal</div>
              </div>
            </div>
          </div>

          {/* Student Mini Card */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #1f2937", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", background: "#0f172a", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#197fe6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>AM</div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f3f4f6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{student.name}</div>
                <div style={{ fontSize: 10, color: "#6b7280" }}>Grade 9 · {student.id}</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
            {navItems.map(item => (
              <button key={item.id} className="nav-item" onClick={() => navigate(item.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left", marginBottom: 2,
                  background: page === item.id ? "#0c2d4e" : "transparent",
                  color: page === item.id ? "#60a5fa" : "#9ca3af",
                  transition: "background .15s",
                }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: page === item.id ? 700 : 500, flex: 1 }}>{item.label}</span>
                {item.badge && <span style={{ background: "#ef4444", color: "#fff", borderRadius: 20, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>{item.badge}</span>}
                {page === item.id && <div style={{ width: 3, height: 16, borderRadius: 2, background: "#197fe6" }} />}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #1f2937", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4b5563", textAlign: "center" }}>AcentoAbacus ERP · v2.5.1</div>
            <div style={{ fontSize: 10, color: "#374151", textAlign: "center", marginTop: 2 }}>Academic Year 2024–25</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top Navbar */}
        <header style={{ height: 60, background: "#080f1a", borderBottom: "1px solid #1f2937", display: "flex", alignItems: "center", padding: "0 20px", gap: 12, flexShrink: 0, position: "sticky", top: 0, zIndex: 30 }}>
          <button onClick={() => setSidebarOpen(p => !p)}
            style={{ width: 34, height: 34, borderRadius: 8, background: "#1f2937", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>
            ☰
          </button>

          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 6, flex: 1, overflow: "hidden" }}>
            <span style={{ color: "#4b5563", whiteSpace: "nowrap" }}>AcentoAbacus</span>
            <span style={{ color: "#374151" }}>›</span>
            <span style={{ color: "#f3f4f6", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {navItems.find(n => n.id === page)?.label}
            </span>
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={{ width: 34, height: 34, borderRadius: 8, background: "#1f2937", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14, position: "relative" }}>
              🔔
              <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: "2px solid #080f1a" }} />
            </button>
            <button style={{ width: 34, height: 34, borderRadius: 8, background: "#1f2937", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>📥</button>
            <button style={{ width: 34, height: 34, borderRadius: 8, background: "#1f2937", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>📆</button>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#197fe6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0 }}>AM</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 24px" }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Skeleton h={40} r={12} w="40%" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                {[1, 2, 3, 4].map(i => <Skeleton key={i} h={100} r={16} />)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Skeleton h={160} r={16} />
                <Skeleton h={160} r={16} />
              </div>
              <Skeleton h={200} r={16} />
            </div>
          ) : (
            <div className="page-anim">
              <PageComp />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
