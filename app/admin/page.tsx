"use client";

import { useState, useEffect } from "react";
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

// --- MOCK DATA (Small set for Demo) ---
const MOCK_DASHBOARD_DATA = {
    totalStudents: 12,
    totalTeachers: 4,
    attendanceTodayPercentage: 85,
    feesCollectedThisMonth: 15400,
    recentEnquiries: [
        { studentName: "Rahul Verma", course: "Abacus Level 1", source: "Website", status: "New", createdAt: new Date().toISOString() },
        { studentName: "Sanya Gupta", course: "Vedic Math", source: "Instagram", status: "Follow-up", createdAt: new Date(Date.now() - 86400000).toISOString() },
    ]
};

const MOCK_ENQUIRIES = [
    { studentName: "Rahul Verma", email: "rahul@example.com", phone: "+91 9876543210", course: "Abacus Level 1", status: "New", createdAt: new Date().toISOString() },
    { studentName: "Sanya Gupta", email: "sanya@example.com", phone: "+91 9876543211", course: "Vedic Math", status: "Follow-up", createdAt: new Date().toISOString() },
];

const MOCK_STUDENTS = [
    { studentName: "John Doe", studentId: "ASC001", course: "Abacus Level 1", batchCode: "BATCH-A", admissionDate: "2024-01-15T10:00:00Z", status: "Active" },
    { studentName: "Jane Smith", studentId: "ASC002", course: "Advanced Abacus", batchCode: "BATCH-B", admissionDate: "2024-02-10T10:00:00Z", status: "Active" },
];

const UPCOMING_CLASSES = [
    { id: 1, time: "10:30 AM", subject: "Junior Level 1", teacher: "Mrs. Sharma", room: "A01" },
    { id: 2, time: "12:00 PM", subject: "Advanced Abacus", teacher: "Mr. Khanna", room: "B03" },
];

type Tab = 'dashboard' | 'enquiries' | 'students' | 'attendance' | 'fees' | 'exams' | 'settings';

export default function AdminPortal() {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [authLoading, setAuthLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isDemoAdmin = localStorage.getItem("demo_admin") === "true";
        if (!isDemoAdmin) {
            router.push("/login");
        } else {
            setAuthLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("demo_admin");
        router.push("/login");
    };

    const openModal = (type: string) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(false);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <div className="w-16 h-16 border-4 border-[#197fe6] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold animate-pulse">Initializing ERP Console...</p>
            </div>
        );
    }

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: MOCK_ENQUIRIES.length },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: CheckCircle2 },
        { id: 'fees', label: 'Fees & Payments', icon: CreditCard },
        { id: 'exams', label: 'Exams & Result', icon: GraduationCap },
        { id: 'settings', label: 'Portal Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-200 shadow-sm flex flex-col z-50">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#197fe6] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#197fe6]/30">
                            A
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Ascento Admin
                        </span>
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
                    {navItems.map((item) => {
                         const Icon = item.icon;
                         return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as Tab)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                                    activeTab === item.id
                                        ? "bg-[#197fe6] text-white shadow-md shadow-[#197fe6]/20 font-semibold"
                                        : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon size={20} />
                                    {item.label}
                                </div>
                                {item.badge ? (
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-white text-[#197fe6]' : 'bg-red-500 text-white'}`}>
                                        {item.badge}
                                    </span>
                                ) : null}
                            </button>
                         );
                    })}
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium mt-8"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-200">
                    <div className="bg-slate-900 p-4 rounded-2xl text-white">
                        <p className="text-xs text-slate-400 mb-1 font-medium">System Role</p>
                        <p className="text-sm font-bold flex items-center justify-between">
                            Master Admin <ChevronRight size={14} className="text-[#197fe6]" />
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between z-40 sticky top-0">
                    <div className="max-w-xl w-full">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#197fe6] transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Universal Search (Students, Fees, Courses...)"
                                className="w-full bg-slate-100/80 border-transparent focus:bg-white focus:border-[#197fe6]/20 focus:ring-4 focus:ring-[#197fe6]/5 py-3 pl-12 pr-4 rounded-2xl transition-all outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div> Database Synced
                        </div>
                        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900 leading-tight">Admin Demo</p>
                                <p className="text-xs font-semibold text-[#197fe6]">Online</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#197fe6]/10 flex items-center justify-center text-[#197fe6] font-bold border-2 border-white shadow-sm overflow-hidden">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-8 bg-slate-50/30">
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
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Overview Dashboard</h2>
                                        <p className="text-slate-500 font-medium">Synced with Cloud Database. Live session active.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 text-xs font-bold">
                                            <RefreshCw size={14} /> Sync
                                        </button>
                                        <button 
                                            onClick={() => openModal('student')}
                                            className="px-5 py-3 rounded-xl bg-[#197fe6] text-white font-bold text-sm shadow-lg shadow-[#197fe6]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                                        >
                                            <Plus size={18} /> New Admission
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard
                                        title="Total Students"
                                        value={MOCK_DASHBOARD_DATA.totalStudents}
                                        change="+2 since yesterday"
                                        icon={<Users className="text-blue-500" size={24} />}
                                        color="blue"
                                        trend="up"
                                    />
                                    <StatCard
                                        title="Active Teachers"
                                        value={MOCK_DASHBOARD_DATA.totalTeachers}
                                        change="Staff Strength"
                                        icon={<GraduationCap className="text-emerald-500" size={24} />}
                                        color="emerald"
                                        trend="neutral"
                                    />
                                    <StatCard
                                        title="Today's Attendance"
                                        value={`${MOCK_DASHBOARD_DATA.attendanceTodayPercentage}%`}
                                        change="Active sessions"
                                        icon={<CheckCircle2 className="text-orange-500" size={24} />}
                                        color="orange"
                                        trend="up"
                                    />
                                    <StatCard
                                        title="Fees Collected"
                                        value={`₹${(MOCK_DASHBOARD_DATA.feesCollectedThisMonth).toLocaleString()}`}
                                        change="This Month"
                                        icon={<CreditCard className="text-violet-500" size={24} />}
                                        color="violet"
                                        trend="up"
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Recent Enquiries Table */}
                                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                                <h3 className="font-bold text-lg">Recent Admission Enquiries</h3>
                                                <button onClick={() => setActiveTab('enquiries')} className="text-sm font-bold text-[#197fe6] hover:underline">View All</button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-slate-50/50 text-slate-500 text-xs font-black uppercase tracking-wider">
                                                            <th className="px-6 py-4">Student Name</th>
                                                            <th className="px-6 py-4">Course</th>
                                                            <th className="px-6 py-4">Source</th>
                                                            <th className="px-6 py-4 text-right">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100">
                                                        {MOCK_DASHBOARD_DATA.recentEnquiries.map((enquiry: any, i: number) => (
                                                            <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                                                <td className="px-6 py-4 font-bold text-slate-900">{enquiry.studentName}</td>
                                                                <td className="px-6 py-4 text-sm font-medium text-slate-600">{enquiry.course}</td>
                                                                <td className="px-6 py-4">
                                                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-tight">
                                                                        {enquiry.source}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-xs font-bold text-slate-400 text-right">
                                                                    {new Date(enquiry.createdAt).toLocaleDateString()}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {MOCK_DASHBOARD_DATA.recentEnquiries.length === 0 && (
                                                            <tr>
                                                                <td colSpan={4} className="p-10 text-center text-slate-400 italic">No recent enquiries found.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="font-bold text-lg">Upcoming Classes</h3>
                                                <button onClick={() => openModal('class')} className="p-1.5 rounded-lg bg-[#197fe6]/10 text-[#197fe6] hover:bg-[#197fe6]/20 transition-all">
                                                    <Plus size={16}/>
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                {UPCOMING_CLASSES.map((cls) => (
                                                    <div key={cls.id} className="p-4 rounded-2xl border border-slate-100 hover:border-[#197fe6]/30 hover:bg-[#197fe6]/5 transition-all group">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <p className="text-xs font-black text-[#197fe6] uppercase tracking-wider">{cls.time}</p>
                                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg group-hover:bg-[#197fe6] group-hover:text-white transition-colors">Room {cls.room}</span>
                                                        </div>
                                                        <h4 className="font-bold text-slate-900">{cls.subject}</h4>
                                                        <p className="text-sm text-slate-500 font-medium">{cls.teacher}</p>
                                                    </div>
                                                ))}
                                                {UPCOMING_CLASSES.length === 0 && (
                                                    <div className="p-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                                        <p className="text-xs font-bold text-slate-400 uppercase">No classes today</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl text-white overflow-hidden relative">
                                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#197fe6]/20 rounded-full blur-2xl"></div>
                                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10"><Plus size={20} className="text-[#197fe6]" /> Quick Actions</h3>
                                            <div className="grid grid-cols-2 gap-3 relative z-10">
                                                <button 
                                                    onClick={() => openModal('student')}
                                                    className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left"
                                                >
                                                    <UserPlus size={18} className="text-[#197fe6]" />
                                                    <span className="text-xs font-bold">Add Student</span>
                                                </button>
                                                <button 
                                                    onClick={() => openModal('enquiry')}
                                                    className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left"
                                                >
                                                    <MessageSquare size={18} className="text-emerald-400" />
                                                    <span className="text-xs font-bold">New enquiry</span>
                                                </button>
                                                <button 
                                                    onClick={() => openModal('payment')}
                                                    className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left"
                                                >
                                                    <CreditCard size={18} className="text-violet-400" />
                                                    <span className="text-xs font-bold">Fee Payment</span>
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab('settings')}
                                                    className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left"
                                                >
                                                    <Settings size={18} className="text-slate-400" />
                                                    <span className="text-xs font-bold">Configuration</span>
                                                </button>
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
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Enquiry Management</h2>
                                    <button 
                                        onClick={() => openModal('enquiry')}
                                        className="px-6 py-3 rounded-xl bg-[#197fe6] text-white font-bold text-sm"
                                    >
                                        Add New Entry
                                    </button>
                                </div>
                                <DataTable
                                    columns={[
                                        { key: 'studentName', label: 'Student' },
                                        { key: 'email', label: 'Email' },
                                        { key: 'phone', label: 'Phone' },
                                        { key: 'course', label: 'Course' },
                                        { key: 'status', label: 'Status' },
                                        { key: 'createdAt', label: 'Date', format: (v: any) => new Date(v).toLocaleDateString() },
                                    ]}
                                    data={MOCK_ENQUIRIES}
                                />
                            </motion.div>
                        )}

                        {activeTab === "students" && (
                            <motion.div
                                key="students"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Student Directory</h2>
                                    <button 
                                        onClick={() => openModal('student')}
                                        className="px-6 py-3 rounded-xl bg-[#197fe6] text-white font-bold text-sm"
                                    >
                                        Onboard Student
                                    </button>
                                </div>
                                <DataTable
                                    columns={[
                                        { key: 'studentId', label: 'ID' },
                                        { key: 'studentName', label: 'Name' },
                                        { key: 'course', label: 'Course' },
                                        { key: 'batchCode', label: 'Batch' },
                                        { key: 'status', label: 'Status' },
                                    ]}
                                    data={MOCK_STUDENTS}
                                />
                            </motion.div>
                        )}

                        {["attendance", "fees", "exams", "settings"].includes(activeTab) && (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter capitalize">{activeTab} Management</h2>
                                    <button 
                                        onClick={() => openModal(activeTab === 'fees' ? 'payment' : activeTab === 'attendance' ? 'class' : 'general')}
                                        className="px-6 py-3 rounded-xl bg-[#197fe6] text-white font-bold text-sm"
                                    >
                                        Action
                                    </button>
                                </div>
                                <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-32 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                                        <Search size={40}/>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-500 uppercase tracking-widest leading-none">Modules Loaded</h4>
                                    <p className="text-slate-400 mt-2 text-sm italic">Connect to specific batch or branch for detailed records.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Success Toast */}
            {showSuccessToast && (
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-8 right-8 z-[200] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500"
                >
                    <CheckCircle2 size={24} />
                    <div>
                        <p className="text-sm font-black uppercase tracking-widest">Entry Synced Successfully</p>
                        <p className="text-xs opacity-80">Cloud database updated (Demo Mode)</p>
                    </div>
                </motion.div>
            )}

            {/* Global Modal System */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden z-20 border border-slate-100"
                        >
                            <div className="p-8 pb-0 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 capitalize italic">
                                        {modalType?.replace('_', ' ')} Application Form
                                    </h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                        Branch: Main Center • DEMO MODE
                                    </p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
                                {modalType === 'student' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Student Full Name" placeholder="Rahul Sharma" required />
                                        <InputField label="Parent Contact" placeholder="+91 98765 43210" required />
                                        <InputField label="Date of Birth" type="date" required />
                                        <SelectField label="Select Course" options={['Abacus Level 1', 'Advanced Abacus', 'Vedic Math', 'Speed Math']} />
                                        <div className="col-span-2">
                                            <InputField label="Residential Address" placeholder="Street, City, State" />
                                        </div>
                                    </div>
                                )}

                                {modalType === 'enquiry' && (
                                    <div className="space-y-4">
                                        <InputField label="Lead Name" placeholder="Sumit Jha" required />
                                        <div className="grid grid-cols-2 gap-4">
                                           <InputField label="Email Address" type="email" placeholder="sumit@example.com" />
                                           <InputField label="Phone Number" placeholder="+91 98765 43210" required />
                                        </div>
                                        <SelectField label="Enquiry Source" options={['Website', 'Instagram', 'Referral', 'Walk-in']} />
                                        <textarea 
                                            className="w-full bg-slate-50 border-none p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#197fe6]/20 transition-all outline-none min-h-[100px]" 
                                            placeholder="Notes about interest..."
                                        ></textarea>
                                    </div>
                                )}

                                {modalType === 'payment' && (
                                    <div className="space-y-4">
                                        <SelectField label="Select Student" options={['John Doe (ASC001)', 'Jane Smith (ASC002)', 'Rahul Verma']} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Amount (₹)" type="number" placeholder="2500" required />
                                            <SelectField label="Payment Method" options={['UPI', 'Cash', 'Card', 'Cheque']} />
                                        </div>
                                        <InputField label="Transaction ID / Receipt No." placeholder="REF12345678" />
                                    </div>
                                )}

                                {modalType === 'class' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Class Title" placeholder="Abacus Level 2" required />
                                        <SelectField label="Teacher" options={['Mrs. Sharma', 'Mr. Khanna', 'Ms. Gupta']} />
                                        <InputField label="Start Time" type="time" required />
                                        <InputField label="Batch Code" placeholder="BATCH-D" />
                                        <div className="col-span-2">
                                           <SelectField label="Classroom" options={['Room A01', 'Room B03', 'Room C02 (Lab)']} />
                                        </div>
                                    </div>
                                )}

                                {modalType === 'general' && (
                                    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                        <Target size={48} className="text-slate-300 mb-4" />
                                        <p className="text-slate-500 font-bold">Additional form modules for {activeTab} can be configured here.</p>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] py-4 rounded-2xl bg-[#197fe6] text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-[#197fe6]/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        Save to Cloud
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
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-2xl ring-1 ${colors[color]}`}>{icon}</div>
                {trend === 'up' && <ArrowUpRight size={18} className="text-emerald-500"/>}
                {trend === 'neutral' && <TrendingUp size={18} className="text-slate-200"/>}
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest text-[10px] relative z-10">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 relative z-10">{value}</h3>
            <p className="text-xs font-bold text-slate-400 mt-2 relative z-10 flex items-center gap-1">
              <Clock size={12}/> {change}
            </p>
            <div className={`absolute -right-8 -bottom-8 w-24 h-24 ${colors[color]} opacity-10 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150`}></div>
        </div>
    );
}

function DataTable({ columns, data }: any) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                        {columns.map((col: any) => <th key={col.key} className="px-6 py-4">{col.label}</th>)}
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                            {columns.map((col: any) => (
                                <td key={col.key} className="px-6 py-4 text-sm font-medium text-slate-600">
                                    {col.format ? col.format(row[col.key]) : (row[col.key] || 'N/A')}
                                </td>
                            ))}
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all">
                                <MoreVertical size={16}/>
                              </button>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="p-20 text-center italic text-slate-400 text-sm">
                                No records currently stored in the demo.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function InputField({ label, ...props }: any) {
    return (
        <div className="space-y-1.5 flex flex-col">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
            <input 
                {...props}
                className="w-full bg-slate-50 border-none p-4 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#197fe6]/10 focus:bg-white focus:border-[#197fe6]/20 transition-all outline-none border-transparent"
            />
        </div>
    );
}

function SelectField({ label, options }: { label: string, options: string[] }) {
    return (
        <div className="space-y-1.5 flex flex-col">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
            <select className="w-full bg-slate-50 border-none p-4 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#197fe6]/10 focus:bg-white transition-all outline-none appearance-none cursor-pointer">
                {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
        </div>
    );
}
