'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type Role = 'STUDENT' | 'FACULTY' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  // Student specific
  gpa?: number;
  attendance?: number;
  department?: string;
  rollNo?: string;
  semester?: string;
  phone?: string;
  address?: string;
  bloodGroup?: string;
  dob?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Academics' | 'Exams' | 'Admissions' | 'Placement' | 'Events' | 'General';
  date: string;
  author: string;
  hasAttachment?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Tech' | 'Sports' | 'Cultural' | 'Academics';
  image: string;
  registeredCount: number;
  isRegistered?: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  department: string;
  description: string;
  syllabus?: string[];
  schedule?: { day: string; time: string; room: string }[];
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  marks: number;
  grade: string;
  semester: string;
}

export interface Payment {
  id: string;
  studentId: string;
  purpose: 'Tuition Fee' | 'Hostel Fee' | 'Exam Fee';
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  date: string;
  invoiceNo: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNo: string;
  courseCode: string;
  percentage: number;
  attended: number;
  total: number;
}

interface AppContextType {
  user: UserProfile | null;
  login: (email: string, role: Role) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  
  // Notices
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;
  
  // Events
  events: Event[];
  registerForEvent: (id: string) => void;
  addEvent: (event: Omit<Event, 'id' | 'registeredCount' | 'isRegistered'>) => void;
  
  // Courses & Grades
  courses: Course[];
  grades: Grade[];
  updateGrade: (id: string, marks: number, grade: string) => void;
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  
  // Payments
  payments: Payment[];
  makePayment: (id: string) => void;
  addPaymentRecord: (payment: Omit<Payment, 'id' | 'date' | 'invoiceNo' | 'status'>) => void;
  
  // Attendance
  attendance: AttendanceRecord[];
  updateAttendance: (studentId: string, courseCode: string, isAttended: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Static Data
const initialNotices: Notice[] = [
  {
    id: 'n-1',
    title: 'Mid-Semester Examination Schedule - Fall 2026',
    content: 'The mid-semester examinations will commence from September 14, 2026. Students are advised to download their admit cards from the portal. Standard guidelines regarding exam rules must be strictly followed.',
    category: 'Exams',
    date: '2026-08-10',
    author: 'Office of the Controller of Examinations',
    hasAttachment: true
  },
  {
    id: 'n-2',
    title: 'Campus Recruitment Drive by Google India',
    content: 'Google India is organizing a campus placement drive for final year B.Tech and MCA students. Registrations close on August 25, 2026. Ensure your student profiles are updated.',
    category: 'Placement',
    date: '2026-08-12',
    author: 'Training & Placement Cell',
    hasAttachment: true
  },
  {
    id: 'n-3',
    title: 'Admission Open for Certification Courses 2026',
    content: 'Nexus College invites applications for various professional certification courses including Cloud Engineering, Cybersecurity, and Business Analytics. Classes start next month.',
    category: 'Admissions',
    date: '2026-08-13',
    author: 'Admissions Office',
    hasAttachment: false
  },
  {
    id: 'n-4',
    title: 'Renovation of central computing facility labs',
    content: 'Computing Labs 3 and 4 will remain closed for hardware upgrades and network updates from August 18 to August 20. Alternate arrangements are made in Lab 1.',
    category: 'General',
    date: '2026-08-14',
    author: 'IT Infrastructure Division',
    hasAttachment: false
  }
];

const initialEvents: Event[] = [
  {
    id: 'e-1',
    title: 'Nexus Hackathon 2026',
    description: 'A 48-hour intense hackathon challenging students to solve real-world problems in climate tech, AI, and smart infrastructure. Cash prizes up to $5,000.',
    date: '2026-09-05',
    time: '09:00 AM',
    location: 'Main Auditorium & Innovation Lab',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    registeredCount: 142,
    isRegistered: false
  },
  {
    id: 'e-2',
    title: 'Inter-College Athletics Championship',
    description: 'The annual sports meet featuring track events, football, basketball, and tennis. Come support our college team, the Nexus Titans!',
    date: '2026-09-18',
    time: '08:00 AM',
    location: 'Sports Complex & Arena',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    registeredCount: 88,
    isRegistered: false
  },
  {
    id: 'e-3',
    title: 'Symphony Cultural Fest 2026',
    description: 'Our flagship annual cultural showcase. Highlights include rock band showdowns, classical dance routines, street theatre, and celebrity guest performances.',
    date: '2026-10-01',
    time: '04:00 PM',
    location: 'Open Air Theatre',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80',
    registeredCount: 310,
    isRegistered: false
  }
];

const initialCourses: Course[] = [
  {
    id: 'c-1',
    code: 'CS-302',
    name: 'Data Structures and Algorithms',
    credits: 4,
    department: 'Computer Science',
    description: 'Analysis and performance of algorithms, list, stacks, queues, trees, graphs, sorting, searching, hashing and advanced algorithmic designs.',
    syllabus: ['Introduction & Complexity Analysis', 'Linear Data Structures', 'Trees and Binary Search Trees', 'Graph Algorithms', 'Dynamic Programming & Greedy Algorithms'],
    schedule: [
      { day: 'Monday', time: '10:00 AM - 11:30 AM', room: 'Room 301' },
      { day: 'Wednesday', time: '10:00 AM - 11:30 AM', room: 'Room 301' }
    ]
  },
  {
    id: 'c-2',
    code: 'CS-420',
    name: 'Artificial Intelligence',
    credits: 4,
    department: 'Computer Science',
    description: 'Fundamental concepts of intelligent agents, heuristic search, logical representation, machine learning basics, neural networks and computer vision.',
    syllabus: ['Search & Optimization', 'Knowledge Representation', 'Probabilistic Reasoning', 'Machine Learning Foundations', 'Deep Learning & NLP'],
    schedule: [
      { day: 'Tuesday', time: '01:00 PM - 02:30 PM', room: 'Seminar Hall B' },
      { day: 'Thursday', time: '01:00 PM - 02:30 PM', room: 'Seminar Hall B' }
    ]
  },
  {
    id: 'c-3',
    code: 'MATH-201',
    name: 'Linear Algebra and Calculus',
    credits: 3,
    department: 'Mathematics',
    description: 'Vector spaces, linear transformations, matrices, eigenvalues, multi-variable calculus, partial derivatives, and integrations with engineering applications.',
    syllabus: ['System of Linear Equations', 'Vector Spaces & Subspaces', 'Eigenvalues & Diagonalization', 'Partial Differentiation', 'Multiple Integrals'],
    schedule: [
      { day: 'Monday', time: '08:30 AM - 10:00 AM', room: 'Room 104' },
      { day: 'Friday', time: '08:30 AM - 10:00 AM', room: 'Room 104' }
    ]
  },
  {
    id: 'c-4',
    code: 'EE-205',
    name: 'Digital Electronics',
    credits: 3,
    department: 'Electrical Engineering',
    description: 'Number systems, logic gates, boolean algebra minimization, combinational logic circuits, flip-flops, sequential design, and FPGA basics.',
    syllabus: ['Boolean Functions & K-Maps', 'Combinational Logic (Adders, Multiplexers)', 'Latches & Flip-Flops', 'Registers & Counters', 'Memory & Programmable Logic'],
    schedule: [
      { day: 'Wednesday', time: '02:30 PM - 04:00 PM', room: 'Electrical Lab A' },
      { day: 'Friday', time: '02:30 PM - 04:00 PM', room: 'Electrical Lab A' }
    ]
  }
];

const initialGrades: Grade[] = [
  { id: 'g-1', studentId: 'std_alex', studentName: 'Alex Carter', courseCode: 'CS-302', courseName: 'Data Structures and Algorithms', marks: 88, grade: 'B+', semester: 'Semester 5' },
  { id: 'g-2', studentId: 'std_alex', studentName: 'Alex Carter', courseCode: 'CS-420', courseName: 'Artificial Intelligence', marks: 95, grade: 'A', semester: 'Semester 5' },
  { id: 'g-3', studentId: 'std_alex', studentName: 'Alex Carter', courseCode: 'MATH-201', courseName: 'Linear Algebra and Calculus', marks: 91, grade: 'A-', semester: 'Semester 5' },
  { id: 'g-4', studentId: 'std_alex', studentName: 'Alex Carter', courseCode: 'EE-205', courseName: 'Digital Electronics', marks: 74, grade: 'C+', semester: 'Semester 5' }
];

const initialPayments: Payment[] = [
  { id: 'p-1', studentId: 'std_alex', purpose: 'Tuition Fee', amount: 4800, status: 'SUCCESS', date: '2025-08-18', invoiceNo: 'INV-2025-0041' },
  { id: 'p-2', studentId: 'std_alex', purpose: 'Hostel Fee', amount: 1200, status: 'SUCCESS', date: '2025-08-19', invoiceNo: 'INV-2025-0042' },
  { id: 'p-3', studentId: 'std_alex', purpose: 'Exam Fee', amount: 150, status: 'SUCCESS', date: '2025-11-05', invoiceNo: 'INV-2025-0988' },
  { id: 'p-4', studentId: 'std_alex', purpose: 'Tuition Fee', amount: 5000, status: 'PENDING', date: '2026-08-01', invoiceNo: 'INV-2026-0091' },
  { id: 'p-5', studentId: 'std_alex', purpose: 'Hostel Fee', amount: 1300, status: 'PENDING', date: '2026-08-01', invoiceNo: 'INV-2026-0092' },
  { id: 'p-6', studentId: 'std_alex', purpose: 'Exam Fee', amount: 180, status: 'PENDING', date: '2026-08-02', invoiceNo: 'INV-2026-0214' }
];

const initialAttendance: AttendanceRecord[] = [
  { studentId: 'std_alex', studentName: 'Alex Carter', rollNo: 'CS-2024-039', courseCode: 'CS-302', percentage: 91.5, attended: 26, total: 28 },
  { studentId: 'std_alex', studentName: 'Alex Carter', rollNo: 'CS-2024-039', courseCode: 'CS-420', percentage: 89.2, attended: 25, total: 28 },
  { studentId: 'std_alex', studentName: 'Alex Carter', rollNo: 'CS-2024-039', courseCode: 'MATH-201', percentage: 95.8, attended: 23, total: 24 },
  { studentId: 'std_alex', studentName: 'Alex Carter', rollNo: 'CS-2024-039', courseCode: 'EE-205', percentage: 83.3, attended: 20, total: 24 },
  // Additional students for Faculty View
  { studentId: 'std_emma', studentName: 'Emma Watson', rollNo: 'CS-2024-001', courseCode: 'CS-302', percentage: 96.4, attended: 27, total: 28 },
  { studentId: 'std_liam', studentName: 'Liam Neeson', rollNo: 'CS-2024-012', courseCode: 'CS-302', percentage: 78.5, attended: 22, total: 28 },
  { studentId: 'std_olivia', studentName: 'Olivia Wilde', rollNo: 'CS-2024-055', courseCode: 'CS-302', percentage: 85.7, attended: 24, total: 28 }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [courses] = useState<Course[]>(initialCourses);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);

  // Load state from localStorage if client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('camp_user');
      const storedNotices = localStorage.getItem('camp_notices');
      const storedEvents = localStorage.getItem('camp_events');
      const storedGrades = localStorage.getItem('camp_grades');
      const storedPayments = localStorage.getItem('camp_payments');
      const storedAttendance = localStorage.getItem('camp_attendance');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedNotices) setNotices(JSON.parse(storedNotices));
      if (storedEvents) setEvents(JSON.parse(storedEvents));
      if (storedGrades) setGrades(JSON.parse(storedGrades));
      if (storedPayments) setPayments(JSON.parse(storedPayments));
      if (storedAttendance) setAttendance(JSON.parse(storedAttendance));
    }
  }, []);

  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // Auth Operations
  const login = (email: string, role: Role): boolean => {
    let mockProfile: UserProfile | null = null;

    if (role === 'STUDENT' && email === 'student@nexus.edu') {
      mockProfile = {
        id: 'std_alex',
        name: 'Alex Carter',
        email: 'student@nexus.edu',
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        gpa: 3.82,
        attendance: 90.4,
        department: 'Computer Science & Engineering',
        rollNo: 'CS-2024-039',
        semester: 'Semester 5',
        phone: '+1 (555) 382-9901',
        address: '42 Academic Way, Suite 102, University Town, UT 90210',
        bloodGroup: 'O+',
        dob: '2004-06-15'
      };
    } else if (role === 'FACULTY' && email === 'faculty@nexus.edu') {
      mockProfile = {
        id: 'fac_vance',
        name: 'Dr. Elizabeth Vance',
        email: 'faculty@nexus.edu',
        role: 'FACULTY',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        department: 'Computer Science & Engineering',
        phone: '+1 (555) 774-2900',
        address: 'Office 402, CSE Block, Nexus Campus',
        dob: '1978-11-23'
      };
    } else if (role === 'ADMIN' && email === 'admin@nexus.edu') {
      mockProfile = {
        id: 'adm_arthur',
        name: 'Dean Arthur Pendelton',
        email: 'admin@nexus.edu',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        department: 'Central Administration',
        phone: '+1 (555) 999-1000',
        address: 'Admins Block, Office 101, Nexus Campus'
      };
    }

    if (mockProfile) {
      setUser(mockProfile);
      saveToStorage('camp_user', mockProfile);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('camp_user');
    }
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    saveToStorage('camp_user', updated);
  };

  // Notice Operations
  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `n-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedNotices = [newNotice, ...notices];
    setNotices(updatedNotices);
    saveToStorage('camp_notices', updatedNotices);
  };

  const deleteNotice = (id: string) => {
    const updatedNotices = notices.filter(n => n.id !== id);
    setNotices(updatedNotices);
    saveToStorage('camp_notices', updatedNotices);
  };

  // Event Operations
  const registerForEvent = (id: string) => {
    const updatedEvents = events.map(e => {
      if (e.id === id) {
        const isRegistered = !e.isRegistered;
        return {
          ...e,
          isRegistered,
          registeredCount: e.registeredCount + (isRegistered ? 1 : -1)
        };
      }
      return e;
    });
    setEvents(updatedEvents);
    saveToStorage('camp_events', updatedEvents);
  };

  const addEvent = (eventData: Omit<Event, 'id' | 'registeredCount' | 'isRegistered'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `e-${Date.now()}`,
      registeredCount: 0,
      isRegistered: false
    };
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    saveToStorage('camp_events', updatedEvents);
  };

  // Grades Operations
  const updateGrade = (id: string, marks: number, gradeLetter: string) => {
    const updatedGrades = grades.map(g => {
      if (g.id === id) {
        return { ...g, marks, grade: gradeLetter };
      }
      return g;
    });
    setGrades(updatedGrades);
    saveToStorage('camp_grades', updatedGrades);
  };

  const addGrade = (gradeData: Omit<Grade, 'id'>) => {
    const newGrade: Grade = {
      ...gradeData,
      id: `g-${Date.now()}`
    };
    const updatedGrades = [...grades, newGrade];
    setGrades(updatedGrades);
    saveToStorage('camp_grades', updatedGrades);
  };

  // Payment Operations
  const makePayment = (id: string) => {
    const updatedPayments = payments.map(p => {
      if (p.id === id) {
        return { ...p, status: 'SUCCESS' as const, date: new Date().toISOString().split('T')[0] };
      }
      return p;
    });
    setPayments(updatedPayments);
    saveToStorage('camp_payments', updatedPayments);
  };

  const addPaymentRecord = (payData: Omit<Payment, 'id' | 'date' | 'invoiceNo' | 'status'>) => {
    const newPayment: Payment = {
      ...payData,
      id: `p-${Date.now()}`,
      status: 'PENDING',
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedPayments = [newPayment, ...payments];
    setPayments(updatedPayments);
    saveToStorage('camp_payments', updatedPayments);
  };

  // Attendance Operations
  const updateAttendance = (studentId: string, courseCode: string, isAttended: boolean) => {
    const updatedAttendance = attendance.map(a => {
      if (a.studentId === studentId && a.courseCode === courseCode) {
        const attended = a.attended + (isAttended ? 1 : -1);
        const total = a.total + 1; // Mark attendance increment
        const newPercentage = parseFloat(((attended / total) * 100).toFixed(1));
        return { ...a, attended, total, percentage: newPercentage };
      }
      return a;
    });
    setAttendance(updatedAttendance);
    saveToStorage('camp_attendance', updatedAttendance);
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      updateProfile,
      notices,
      addNotice,
      deleteNotice,
      events,
      registerForEvent,
      addEvent,
      courses,
      grades,
      updateGrade,
      addGrade,
      payments,
      makePayment,
      addPaymentRecord,
      attendance,
      updateAttendance
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
