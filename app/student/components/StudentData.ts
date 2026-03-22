export const student = {
  name: "Aryan Mehta",
  id: "AA-2024-0847",
  class: "Grade 9 - Section A",
  roll: 12,
  avatar: "AM",
  email: "aryan.mehta@student.acentoabacus.edu",
  phone: "+91 98765 43210",
  dob: "12 March 2010",
  gender: "Male",
  blood: "B+",
  address: "42, Green Park Colony, Pune - 411001",
  parent: "Mr. Rakesh Mehta",
  parentPhone: "+91 98700 11223",
  parentEmail: "rakesh.mehta@gmail.com",
  joined: "June 2021",
};

export const kpis = [
  { label: "Attendance", value: "82%", sub: "Below 85% target", icon: "📅", color: "#f59e0b", trend: "-3%" },
  { label: "GPA Score", value: "8.4", sub: "A Grade", icon: "🎓", color: "#6366f1", trend: "+0.2" },
  { label: "Pending Fees", value: "₹4,500", sub: "Due: 31 Mar", icon: "💰", color: "#ef4444", trend: "" },
  { label: "Upcoming Exams", value: "3", sub: "Next: 25 Mar", icon: "📝", color: "#10b981", trend: "" },
];

export const subjects = [
  { code: "MATH-9A", name: "Mathematics", teacher: "Mrs. Priya Sharma", desc: "Algebra, Geometry, Trigonometry" },
  { code: "SCI-9A", name: "Science", teacher: "Mr. Anil Verma", desc: "Physics, Chemistry, Biology" },
  { code: "ENG-9A", name: "English", teacher: "Ms. Rachel D'Cruz", desc: "Language, Literature, Grammar" },
  { code: "SST-9A", name: "Social Studies", teacher: "Mr. Ramesh Patil", desc: "History, Geography, Civics" },
  { code: "HIN-9A", name: "Hindi", teacher: "Mrs. Sunita Joshi", desc: "Language and Literature" },
  { code: "CS-9A", name: "Computer Science", teacher: "Mr. Karan Malhotra", desc: "Python, Web Basics, Algorithms" },
];

export const timetable = {
  Mon: ["Mathematics", "English", "Science", "—", "Social Studies", "Hindi", "Computer Sc.", "Sports"],
  Tue: ["Science", "Mathematics", "English", "—", "Computer Sc.", "Social Studies", "Hindi", "Art"],
  Wed: ["English", "Hindi", "Mathematics", "—", "Science", "Computer Sc.", "Social Studies", "Sports"],
  Thu: ["Social Studies", "Science", "Hindi", "—", "Mathematics", "English", "Computer Sc.", "Library"],
  Fri: ["Hindi", "Computer Sc.", "Social Studies", "—", "English", "Mathematics", "Science", "Activities"],
  Sat: ["Mathematics", "Science", "English", "—", "—", "—", "—", "—"],
};

export const subjectColors: Record<string, string> = {
  "Mathematics": "#6366f1",
  "English": "#10b981",
  "Science": "#f59e0b",
  "Social Studies": "#ec4899",
  "Hindi": "#14b8a6",
  "Computer Sc.": "#8b5cf6",
  "Sports": "#06b6d4",
  "Art": "#f97316",
  "Library": "#84cc16",
  "Activities": "#e879f9",
  "—": "#374151",
};

export const exams = [
  { name: "Unit Test 3", dates: "25–27 Mar 2025", duration: "1.5 hrs", status: "Upcoming", subjects: ["Maths", "Science", "English"] },
  { name: "Mid-Term Exam", dates: "14–20 Apr 2025", duration: "3 hrs", status: "Scheduled", subjects: ["All Subjects"] },
  { name: "Unit Test 2", dates: "10–12 Feb 2025", duration: "1.5 hrs", status: "Completed", subjects: ["SST", "Hindi", "CS"] },
  { name: "Unit Test 1", dates: "15–17 Dec 2024", duration: "1.5 hrs", status: "Completed", subjects: ["All Subjects"] },
];

export const attendance = {
  overall: 82,
  bySubject: [
    { subject: "Mathematics", present: 41, total: 48, pct: 85 },
    { subject: "Science", present: 38, total: 48, pct: 79 },
    { subject: "English", present: 44, total: 48, pct: 92 },
    { subject: "Social Studies", present: 39, total: 48, pct: 81 },
    { subject: "Hindi", present: 36, total: 48, pct: 75 },
    { subject: "Computer Sc.", present: 43, total: 48, pct: 90 },
  ],
};

export const fees = [
  { type: "Tuition Fee – Q4", amount: 12000, due: "31 Mar 2025", status: "Pending" },
  { type: "Activity Fee", amount: 2500, due: "31 Mar 2025", status: "Pending" },
  { type: "Tuition Fee – Q3", amount: 12000, due: "31 Dec 2024", status: "Paid" },
  { type: "Exam Fee", amount: 800, due: "20 Dec 2024", status: "Paid" },
  { type: "Tuition Fee – Q2", amount: 12000, due: "30 Sep 2024", status: "Paid" },
];

export const results = [
  { subject: "Mathematics", ut1: 38, ut2: 34, ut3: null, mid: null, grade: "B+" },
  { subject: "Science", ut1: 42, ut2: 40, ut3: null, mid: null, grade: "A" },
  { subject: "English", ut1: 44, ut2: 43, ut3: null, mid: null, grade: "A+" },
  { subject: "Social Studies", ut1: 36, ut2: 38, ut3: null, mid: null, grade: "B+" },
  { subject: "Hindi", ut1: 33, ut2: 35, ut3: null, mid: null, grade: "B" },
  { subject: "Computer Sc.", ut1: 45, ut2: 44, ut3: null, mid: null, grade: "A+" },
];

export const teachers = [
  { name: "Mrs. Priya Sharma", subject: "Mathematics", exp: "12 years", email: "priya.sharma@acentoabacus.edu", phone: "Ext. 201" },
  { name: "Mr. Anil Verma", subject: "Science", exp: "9 years", email: "anil.verma@acentoabacus.edu", phone: "Ext. 202" },
  { name: "Ms. Rachel D'Cruz", subject: "English", exp: "7 years", email: "rachel.dcruz@acentoabacus.edu", phone: "Ext. 203" },
  { name: "Mr. Ramesh Patil", subject: "Social Studies", exp: "15 years", email: "ramesh.patil@acentoabacus.edu", phone: "Ext. 204" },
  { name: "Mrs. Sunita Joshi", subject: "Hindi", exp: "11 years", email: "sunita.joshi@acentoabacus.edu", phone: "Ext. 205" },
  { name: "Mr. Karan Malhotra", subject: "Computer Science", exp: "5 years", email: "karan.malhotra@acentoabacus.edu", phone: "Ext. 206" },
];

export const notifications = [
  { type: "Announcement", title: "Annual Day Celebration", body: "Annual Day is on 5th April. All students must participate in at least one event.", time: "2h ago", read: false },
  { type: "Reminder", title: "Fee Due Alert", body: "Q4 Tuition Fee of ₹12,000 is due by 31 March 2025. Please pay before the deadline.", time: "5h ago", read: false },
  { type: "Event", title: "Science Fair Registration", body: "Register for the Inter-School Science Fair by 28 March. Contact your Science teacher.", time: "1d ago", read: true },
  { type: "Announcement", title: "Unit Test 3 Schedule Released", body: "Unit Test 3 will be held from 25–27 March. Detailed schedule shared below.", time: "2d ago", read: true },
  { type: "Reminder", title: "Attendance Warning", body: "Your overall attendance is 82% which is below the required 85%. Please improve.", time: "3d ago", read: true },
];

export const documents = [
  { name: "Admit Card – Unit Test 3", type: "Admit Card", date: "22 Mar 2025", size: "142 KB" },
  { name: "Report Card – Q2 2024", type: "Report Card", date: "15 Oct 2024", size: "380 KB" },
  { name: "Fee Receipt – Q3", type: "Receipt", date: "2 Jan 2025", size: "95 KB" },
  { name: "Transfer Certificate", type: "Certificate", date: "10 Jun 2021", size: "210 KB" },
  { name: "Bonafide Certificate", type: "Certificate", date: "1 Aug 2024", size: "180 KB" },
];
