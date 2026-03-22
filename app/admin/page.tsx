"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CheckCircle2, 
  CreditCard, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronRight,
  UserPlus,
  RefreshCw,
  Plus,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  Clock,
  ArrowUpRight,
  TrendingUp,
  FileText,
  X,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { 
    collection, 
    query, 
    onSnapshot, 
    addDoc, 
    orderBy, 
    limit, 
    getDoc, 
    setDoc,
    doc,
    serverTimestamp,
    where,
    getDocs
} from "firebase/firestore";

type Tab = 'dashboard' | 'enquiries' | 'students' | 'attendance' | 'fees' | 'exams' | 'settings';

export default function AdminPortal() {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    
    // Data State
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [fees, setFees] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [exams, setExams] = useState<any[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [stats, setStats] = useState({
        students: 0,
        teachers: 0,
        attendance: 0,
        fees: 0
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, "Users", firebaseUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.Role?.trim().toLowerCase() === "admin") {
                        setUser(firebaseUser);
                        setUserData(data);
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

    // REAL-TIME DATA FETCHING
    useEffect(() => {
        if (!user) return;

        // Listen for Enquiries
        const qEnquiries = query(collection(db, "Enquiries"), orderBy("createdAt", "desc"), limit(20));
        const unsubEnquiries = onSnapshot(qEnquiries, (snapshot) => {
            setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Listen for Students
        const qStudents = query(collection(db, "Students"), orderBy("studentName", "asc"));
        const unsubStudents = onSnapshot(qStudents, (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(list);
            setStats(prev => ({ ...prev, students: list.length }));
        });

        // Listen for Fees
        const qFees = query(collection(db, "Fees"), orderBy("date", "desc"), limit(50));
        const unsubFees = onSnapshot(qFees, (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFees(list);
            const total = list.reduce((acc, curr: any) => acc + (Number(curr.amount) || 0), 0);
            setStats(prev => ({ ...prev, fees: total }));
        });

        // Listen for Exams
        const qExams = query(collection(db, "Exams"), orderBy("date", "desc"));
        const unsubExams = onSnapshot(qExams, (snapshot) => {
            setExams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Listen for System Config
        const unsubConfig = onSnapshot(doc(db, "Settings", "GlobalConfig"), (doc) => {
            if (doc.exists()) setConfig(doc.data());
        });

        // Listen for Attendance on selected date
        const qAttendance = query(collection(db, "Attendance"), where("date", "==", selectedDate));
        const unsubAttendance = onSnapshot(qAttendance, (snapshot) => {
            setAttendance(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubEnquiries();
            unsubStudents();
            unsubFees();
            unsubExams();
            unsubConfig();
            unsubAttendance();
        };
    }, [user, selectedDate]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const openModal = (type: string) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            let collectionName = "";
            if (modalType === 'student') collectionName = "Students";
            else if (modalType === 'enquiry') collectionName = "Enquiries";
            else if (modalType === 'payment') collectionName = "Fees";
            else if (modalType === 'class') collectionName = "Classes";

            if (collectionName) {
                await addDoc(collection(db, collectionName), {
                    ...data,
                    createdAt: serverTimestamp(),
                    createdBy: user.uid
                });
                setIsModalOpen(false);
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 3000);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Failed to save data. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const markAttendance = async (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
        try {
            const attendanceId = `${studentId}_${selectedDate}`;
            await setDoc(doc(db, "Attendance", attendanceId), {
                studentId,
                date: selectedDate,
                status,
                updatedAt: serverTimestamp(),
                updatedBy: user.uid
            });
        } catch (err) {
            console.error("Attendance Error:", err);
            alert("Failed to mark attendance.");
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <div className="w-16 h-16 border-4 border-[#197fe6] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold animate-pulse text-sm uppercase tracking-widest">Securing Cloud Session...</p>
            </div>
        );
    }

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: enquiries.length },
        { id: 'students', label: 'Students', icon: Users, badge: students.length },
        { id: 'attendance', label: 'Attendance', icon: CheckCircle2 },
        { id: 'fees', label: 'Fees & Payments', icon: CreditCard },
        { id: 'exams', label: 'Exams & Result', icon: GraduationCap },
        { id: 'settings', label: 'System Config', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 shadow-sm flex flex-col z-50">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-[#197fe6]/20">
                            <Image 
                                src="/Acento-Logo.jpg" 
                                alt="Ascento Logo" 
                                fill 
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent italic">
                            ERP Console
                        </span>
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-1.5 mt-4 overflow-y-auto">
                    {navItems.map((item) => {
                         const Icon = item.icon;
                         return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as Tab)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
                                    activeTab === item.id
                                        ? "bg-[#197fe6] text-white shadow-xl shadow-[#197fe6]/20 font-bold"
                                        : "hover:bg-slate-50 text-slate-500 hover:text-slate-900"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon size={20} />
                                    <span className="text-sm">{item.label}</span>
                                </div>
                                {item.badge ? (
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${activeTab === item.id ? 'bg-white text-[#197fe6]' : 'bg-slate-100 text-slate-500'}`}>
                                        {item.badge}
                                    </span>
                                ) : null}
                            </button>
                         );
                    })}
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm mt-8"
                    >
                        <LogOut size={20} />
                        Terminate Session
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-widest">Logged in As</p>
                        <p className="text-sm font-black text-slate-900 truncate">{userData?.Name || user.email}</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-40 sticky top-0">
                    <div className="max-w-xl w-full">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#197fe6] transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Universal DB Search..."
                                className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#197fe6] focus:ring-4 focus:ring-[#197fe6]/5 py-3 pl-12 pr-4 rounded-2xl transition-all outline-none text-sm font-bold"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Live Connection
                        </div>
                        <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors relative border border-slate-100">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#197fe6] to-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 uppercase">
                                {userData?.Name?.[0] || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-8 bg-slate-50/20">
                    <AnimatePresence mode="wait">
                        {activeTab === "dashboard" && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Mission Intelligence</h2>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Real-time Data Streams Activity</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => openModal('student')}
                                            className="px-6 py-3.5 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#197fe6]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                                        >
                                            <Plus size={16} strokeWidth={3} /> Register New Student
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard
                                        title="Active Students"
                                        value={stats.students}
                                        change="Current Records"
                                        icon={<Users className="text-blue-500" size={24} />}
                                        color="blue"
                                        trend="neutral"
                                    />
                                    <StatCard
                                        title="Total Revenue"
                                        value={`₹${stats.fees.toLocaleString()}`}
                                        change="Aggregated Flow"
                                        icon={<CreditCard className="text-violet-500" size={24} />}
                                        color="violet"
                                        trend="neutral"
                                    />
                                    <StatCard
                                        title="New Leads"
                                        value={enquiries.length}
                                        change="Unconverted"
                                        icon={<MessageSquare className="text-orange-500" size={24} />}
                                        color="orange"
                                        trend="neutral"
                                    />
                                    <StatCard
                                        title="Classes"
                                        value="0"
                                        change="Today Scheduled"
                                        icon={<Calendar className="text-emerald-500" size={24} />}
                                        color="emerald"
                                        trend="neutral"
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Recent Enquiries Table */}
                                        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                                <h3 className="font-black text-slate-900 uppercase tracking-tight italic text-lg">Inbound Leads Pipeline</h3>
                                                <button onClick={() => setActiveTab('enquiries')} className="text-[10px] font-black uppercase tracking-widest text-[#197fe6] hover:underline">View All Leads</button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-slate-50/50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                                                            <th className="px-8 py-5">Entity</th>
                                                            <th className="px-8 py-5">Target Program</th>
                                                            <th className="px-8 py-5">Origin</th>
                                                            <th className="px-8 py-5 text-right">Timestamp</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100">
                                                        {enquiries.slice(0, 5).map((enquiry: any, i: number) => (
                                                            <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                                                <td className="px-8 py-5 font-bold text-slate-900">{enquiry.studentName}</td>
                                                                <td className="px-8 py-5 text-sm font-bold text-slate-500">{enquiry.course}</td>
                                                                <td className="px-8 py-5">
                                                                    <span className="px-2.5 py-1 rounded-lg bg-[#197fe6]/5 text-[#197fe6] text-[9px] font-black uppercase tracking-widest">
                                                                        {enquiry.source || 'Direct'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-8 py-5 text-[10px] font-bold text-slate-400 text-right">
                                                                    {enquiry.createdAt?.toDate ? enquiry.createdAt.toDate().toLocaleDateString() : 'Pending'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {enquiries.length === 0 && (
                                                            <tr>
                                                                <td colSpan={4} className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs italic">Lead stream is silent</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl text-white overflow-hidden relative">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                                            <h3 className="font-black text-lg mb-8 flex items-center gap-2 relative z-10 italic"><Plus size={20} className="text-[#197fe6]" /> High-Level Actions</h3>
                                            <div className="grid grid-cols-1 gap-3 relative z-10">
                                                <QuickActionBtn 
                                                    onClick={() => openModal('student')}
                                                    label="Initialize Student" 
                                                    icon={<UserPlus size={18} />} 
                                                    color="#197fe6" 
                                                />
                                                <QuickActionBtn 
                                                    onClick={() => openModal('enquiry')}
                                                    label="Log New Enquiry" 
                                                    icon={<MessageSquare size={18} />} 
                                                    color="#10b981" 
                                                />
                                                <QuickActionBtn 
                                                    onClick={() => openModal('payment')}
                                                    label="Process Payment" 
                                                    icon={<CreditCard size={18} />} 
                                                    color="#8b5cf6" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "enquiries" && (
                            <motion.div
                                key="enquiries"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Enquiry Ledger</h2>
                                    <button 
                                        onClick={() => openModal('enquiry')}
                                        className="px-6 py-3.5 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px]"
                                    >
                                        Execute New Capture
                                    </button>
                                </div>
                                <DataTable
                                    columns={[
                                        { key: 'studentName', label: 'Lead Contact' },
                                        { key: 'email', label: 'Email Index' },
                                        { key: 'phone', label: 'Communication' },
                                        { key: 'course', label: 'Target Program' },
                                        { key: 'status', label: 'Priority' },
                                    ]}
                                    data={enquiries}
                                />
                            </motion.div>
                        )}

                        {activeTab === "students" && (
                            <motion.div
                                key="students"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Human Capital Registry</h2>
                                    <button 
                                        onClick={() => openModal('student')}
                                        className="px-6 py-3.5 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px]"
                                    >
                                        Register New Entity
                                    </button>
                                </div>
                                <DataTable
                                    columns={[
                                        { key: 'studentName', label: 'Legal Name' },
                                        { key: 'studentId', label: 'Identification ID' },
                                        { key: 'course', label: 'Enrolled Program' },
                                        { key: 'batchCode', label: 'Allocation' },
                                        { key: 'status', label: 'Current State' },
                                    ]}
                                    data={students}
                                />
                            </motion.div>
                        )}

                        {activeTab === "attendance" && (
                            <motion.div
                                key="attendance"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Daily Attendance Log</h2>
                                    <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-2xl border border-slate-200">
                                        <Calendar size={18} className="text-[#197fe6]" />
                                        <input 
                                            type="date" 
                                            value={selectedDate} 
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="bg-transparent font-bold outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                                                <th className="px-8 py-5 text-[#197fe6]">Entity</th>
                                                <th className="px-8 py-5">Control Status</th>
                                                <th className="px-8 py-5 text-right">Synchronization</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {students.map((student: any) => {
                                                const record = attendance.find(a => a.studentId === student.id);
                                                return (
                                                    <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="px-8 py-5">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-slate-900">{student.studentName}</span>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.studentId}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <div className="flex gap-2">
                                                                {['Present', 'Absent', 'Late'].map((status) => (
                                                                    <button
                                                                        key={status}
                                                                        onClick={() => markAttendance(student.id, status as any)}
                                                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                                            record?.status === status
                                                                                ? status === 'Present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                                                                                : status === 'Absent' ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                                                                                : 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                                                                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                                                        }`}
                                                                    >
                                                                        {status}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-right">
                                                            {record ? (
                                                                <div className="flex items-center justify-end gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                                                                    <CheckCircle2 size={14} /> Synchronized
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-end gap-2 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                                                                   <Clock size={14} /> No Log Signal
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "fees" && (
                            <motion.div
                                key="fees"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Financial Ledger</h2>
                                    <button 
                                        onClick={() => openModal('payment')}
                                        className="px-6 py-3.5 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px]"
                                    >
                                        Execute New Stream
                                    </button>
                                </div>
                                <DataTable
                                    columns={[
                                        { key: 'studentName', label: 'Beneficiary' },
                                        { key: 'amount', label: 'Value (₹)', format: (v: any) => `₹${Number(v).toLocaleString()}` },
                                        { key: 'method', label: 'Protocol' },
                                        { key: 'date', label: 'Temporal Marker' },
                                        { key: 'status', label: 'Settlement', format: (v: any) => (
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                v === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                                {v || 'Paid'}
                                            </span>
                                        )},
                                    ]}
                                    data={fees}
                                />
                            </motion.div>
                        )}

                        {activeTab === "exams" && (
                            <motion.div
                                key="exams"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Examination Console</h2>
                                    <button 
                                        onClick={() => openModal('exam')}
                                        className="px-6 py-3.5 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px]"
                                    >
                                        Schedule New Exam
                                    </button>
                                </div>
                                <DataTable
                                    columns={[
                                        { key: 'examName', label: 'Assessment' },
                                        { key: 'date', label: 'Temporal Marker' },
                                        { key: 'course', label: 'Program Target' },
                                        { key: 'maxMarks', label: 'Ceiling' },
                                        { key: 'status', label: 'Phase' },
                                    ]}
                                    data={exams}
                                />
                            </motion.div>
                        )}

                        {activeTab === "settings" && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">System Configuration</h2>
                                    <button 
                                        onClick={() => openModal('class')}
                                        className="px-6 py-3.5 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px]"
                                    >
                                        Initialize Batch
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Global Metrics config placeholder */}
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                                        <h3 className="font-black text-slate-900 uppercase tracking-widest mb-6 text-sm italic">Economic Constants</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Base Registration Fee</span>
                                                <span className="font-black text-slate-900 italic">₹{config?.registrationFee || '1,500'}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Monthly Tuition (Std)</span>
                                                <span className="font-black text-slate-900 italic">₹{config?.monthlyFee || '2,200'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                                        <h3 className="font-black text-slate-900 uppercase tracking-widest mb-6 text-sm italic">Organizational Hierarchy</h3>
                                        <div className="p-8 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                                            <p className="text-slate-300 font-bold uppercase tracking-widest text-xs italic">Staff management offline</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Global Success Feedback */}
            <AnimatePresence>
                {showSuccessToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-12 right-12 z-[200] bg-[#197fe6] text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-blue-400/30 backdrop-blur-xl"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] leading-none mb-1">Transaction Successful</p>
                            <p className="text-[10px] font-bold opacity-70">Cloud Database Synchronized Instantly</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Layer */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden z-20 border border-white"
                        >
                            <div className="p-10 pb-0 flex items-center justify-between">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 italic tracking-tight capitalize">
                                        Data Entry Form
                                    </h3>
                                    <p className="text-[#197fe6] text-[10px] font-black uppercase tracking-[0.2em] mt-1 ml-1">
                                        Target Node: {modalType}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    disabled={isSubmitting}
                                    className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all border border-slate-100"
                                >
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="p-10 space-y-6">
                                {modalType === 'student' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField name="studentName" label="Full Entity Name" placeholder="Rahul Sharma" required />
                                        <InputField name="phone" label="Contact Protocol" placeholder="+91 98765 43210" required />
                                        <InputField name="dob" label="Temporal Origin" type="date" required />
                                        <SelectField name="course" label="Target Program" options={['Abacus Level 1', 'Advanced Abacus', 'Vedic Math', 'Speed Math']} />
                                        <div className="col-span-2">
                                            <InputField name="address" label="Logistics Pointer (Address)" placeholder="Street, City, State" />
                                        </div>
                                    </div>
                                )}

                                {modalType === 'enquiry' && (
                                    <div className="space-y-4">
                                        <InputField name="studentName" label="Lead Identifier" placeholder="Sumit Jha" required />
                                        <div className="grid grid-cols-2 gap-4">
                                           <InputField name="email" label="Digital Address" type="email" placeholder="sumit@example.com" />
                                           <InputField name="phone" label="Signal Frequency" placeholder="+91 98765 43210" required />
                                        </div>
                                        <SelectField name="source" label="Origin Channel" options={['Website', 'Instagram', 'Referral', 'Walk-in']} />
                                        <SelectField name="course" label="Interested Program" options={['Abacus Level 1', 'Advanced Abacus', 'Vedic Math', 'Speed Math']} />
                                    </div>
                                )}

                                {modalType === 'payment' && (
                                    <div className="space-y-4">
                                        <InputField name="studentName" label="Beneficiary" placeholder="Student Name" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField name="amount" label="Value Transfer (₹)" type="number" placeholder="2500" required />
                                            <SelectField name="method" label="Transfer Protocol" options={['UPI', 'Cash', 'Card', 'Cheque']} />
                                        </div>
                                        <InputField name="date" label="Transaction Date" type="date" required />
                                    </div>
                                )}

                                {modalType === 'exam' && (
                                    <div className="space-y-4">
                                        <InputField name="examName" label="Assessment Identifier" placeholder="Final Level 1 Exam" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField name="date" label="Temporal Marker" type="date" required />
                                            <SelectField name="course" label="Program Target" options={['Abacus Level 1', 'Advanced Abacus', 'Vedic Math', 'Speed Math']} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField name="maxMarks" label="Ceiling Score" type="number" placeholder="100" required />
                                            <InputField name="passingMarks" label="Threshold" type="number" placeholder="40" required />
                                        </div>
                                    </div>
                                )}

                                {modalType === 'class' && (
                                    <div className="space-y-4">
                                        <InputField name="batchName" label="Batch Designation" placeholder="Evening Batch A" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <SelectField name="day" label="Operational Loop" options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} />
                                            <InputField name="time" label="Temporal Slot" type="time" required />
                                        </div>
                                        <SelectField name="course" label="Linked Program" options={['Abacus Level 1', 'Advanced Abacus', 'Vedic Math', 'Speed Math']} />
                                    </div>
                                )}

                                <div className="flex gap-4 pt-6">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isSubmitting}
                                        className="flex-1 py-5 rounded-[1.5rem] bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all border border-slate-100"
                                    >
                                        Abort
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] py-5 rounded-[1.5rem] bg-[#197fe6] text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#197fe6]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            "Sync to Cloud"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ title, value, change, icon, color, trend }: any) {
    const colors: any = {
        blue: "bg-blue-50 text-blue-600 ring-blue-100",
        emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        orange: "bg-orange-50 text-orange-600 ring-orange-100",
        violet: "bg-violet-50 text-violet-600 ring-violet-100",
    };
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-4 rounded-2xl ring-1 ${colors[color]}`}>{icon}</div>
                {trend === 'up' && <ArrowUpRight size={18} className="text-emerald-500"/>}
                {trend === 'neutral' && <TrendingUp size={18} className="text-slate-200"/>}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 relative z-10 italic">{value}</h3>
            <p className="text-[10px] font-black text-[#197fe6] mt-2 relative z-10 flex items-center gap-1 uppercase tracking-widest opacity-60">
              {change}
            </p>
            <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${colors[color]} opacity-10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150`}></div>
        </div>
    );
}

function DataTable({ columns, data }: any) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                        {columns.map((col: any) => <th key={col.key} className="px-8 py-5">{col.label}</th>)}
                        <th className="px-8 py-5 text-right">Ops</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                            {columns.map((col: any) => (
                                <td key={col.key} className="px-8 py-5 text-sm font-bold text-slate-600">
                                    {col.format ? col.format(row[col.key]) : (row[col.key] || '---')}
                                </td>
                            ))}
                            <td className="px-8 py-5 text-right">
                              <button className="p-2 rounded-xl hover:bg-white hover:shadow-md text-slate-300 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100">
                                <MoreVertical size={16}/>
                              </button>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="p-32 text-center italic text-slate-300 font-bold uppercase tracking-widest text-xs">
                                No records indexed in the cloud
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function QuickActionBtn({ label, icon, color, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-all text-left group border border-white/5 hover:border-white/10 shadow-lg"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/10 text-white transition-transform group-hover:scale-110" style={{ color }}>
                    {icon}
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{label}</span>
            </div>
            <ChevronRight size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}

function InputField({ label, ...props }: any) {
    return (
        <div className="space-y-1.5 flex flex-col">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#197fe6] ml-2">{label}</label>
            <input 
                {...props}
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem] text-sm font-bold focus:ring-8 focus:ring-[#197fe6]/5 focus:bg-white focus:border-[#197fe6] transition-all outline-none"
            />
        </div>
    );
}

function SelectField({ label, options, name }: { label: string, options: string[], name: string }) {
    return (
        <div className="space-y-1.5 flex flex-col">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#197fe6] ml-2">{label}</label>
            <div className="relative">
                <select name={name} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem] text-sm font-bold focus:ring-8 focus:ring-[#197fe6]/5 focus:bg-white focus:border-[#197fe6] transition-all outline-none appearance-none cursor-pointer">
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={16} strokeWidth={3} />
                </div>
            </div>
        </div>
    );
}

function ChevronDown({ size, strokeWidth, ...props }: any) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            {...props}
        >
            <path d="m6 9 6 6 6-6"/>
        </svg>
    );
}
