'use client';

import React, { useState } from 'react';
import { BookOpen, Calendar, CreditCard, Award, User, Clock, Bell, Download, FileText, CheckCircle, AlertTriangle, Play, ChevronRight, Edit3 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

export default function StudentDashboard() {
  const { user, notices, courses, grades, payments, attendance, updateProfile, makePayment } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Profile editing states
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');

  if (!user) return null;

  // Timetable Static Schedule (Weekly)
  const weeklyTimetable = [
    { time: '09:00 AM - 10:30 AM', mon: 'CS-302 (Room 301)', tue: 'CS-420 (Seminar Hall B)', wed: 'CS-302 (Room 301)', thu: 'CS-420 (Seminar Hall B)', fri: 'MATH-201 (Room 104)' },
    { time: '11:00 AM - 12:30 PM', mon: 'MATH-201 (Room 104)', tue: 'Self Study', wed: 'EE-205 (Lab A)', thu: 'Self Study', fri: 'EE-205 (Lab A)' },
    { time: '01:30 PM - 03:00 PM', mon: 'CS-302 Lab (Lab 2)', tue: 'Academics Writing', wed: 'CS-420 Lab (Lab 3)', thu: 'Minor Project', fri: 'Sports Elective' }
  ];

  // Recharts Mock Data for GPA trends
  const gpaData = [
    { sem: 'Sem 1', gpa: 3.65 },
    { sem: 'Sem 2', gpa: 3.72 },
    { sem: 'Sem 3', gpa: 3.58 },
    { sem: 'Sem 4', gpa: 3.78 },
    { sem: 'Sem 5', gpa: 3.82 }
  ];

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ phone, address, bloodGroup });
    setIsEditing(false);
    alert('Student profile updated successfully!');
  };

  const handlePayFee = (paymentId: string) => {
    makePayment(paymentId);
    alert('Payment transaction completed successfully! Receipt generated.');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-brand-primary">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {user.name}
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Roll No: {user.rollNo} • {user.department}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <Badge variant="primary" className="py-1">Semester: {user.semester}</Badge>
          <Badge variant="success" className="py-1">CGPA: {user.gpa}</Badge>
          <Badge variant="info" className="py-1">Attendance: {user.attendance}%</Badge>
        </div>
      </div>

      {/* Tabs Selector */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
        className="w-full"
        tabs={[
          { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
          { id: 'attendance', label: 'Attendance', icon: <Clock size={16} /> },
          { id: 'grades', label: 'Grades & Results', icon: <Award size={16} /> },
          { id: 'timetable', label: 'Timetable', icon: <Calendar size={16} /> },
          { id: 'payments', label: 'Fee Payments', icon: <CreditCard size={16} /> },
          { id: 'profile', label: 'My Profile', icon: <User size={16} /> }
        ]}
      />

      {/* Tab Panels */}
      <div className="space-y-6">
        
        {/* OVERVIEW PANEL */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* KPI grid */}
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card variant="default">
                  <CardContent className="p-6 space-y-2">
                    <span className="text-xxs font-bold text-slate-450 uppercase block">Cumulative GPA</span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">{user.gpa}</h2>
                    <span className="text-[10px] text-emerald-500 font-bold block flex items-center gap-0.5">
                      Class Rank: 4th / 120
                    </span>
                  </CardContent>
                </Card>

                <Card variant="default">
                  <CardContent className="p-6 space-y-2">
                    <span className="text-xxs font-bold text-slate-450 uppercase block">Attendance Ratio</span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">{user.attendance}%</h2>
                    <span className="text-[10px] text-emerald-500 font-bold block flex items-center gap-0.5">
                      Requirement (75%): Safe
                    </span>
                  </CardContent>
                </Card>

                <Card variant="default" className="border-rose-200 dark:border-rose-900/40">
                  <CardContent className="p-6 space-y-2">
                    <span className="text-xxs font-bold text-slate-450 uppercase block">Unpaid Balance</span>
                    <h2 className="text-3xl font-black text-rose-600 dark:text-rose-450">
                      ${payments.filter(p => p.status === 'PENDING').reduce((sum, curr) => sum + curr.amount, 0)}
                    </h2>
                    <span className="text-[10px] text-rose-500 font-bold block flex items-center gap-0.5">
                      3 Pending Invoices
                    </span>
                  </CardContent>
                </Card>
              </div>

              {/* Courses Registered grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Course Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} variant="default" className="hover:border-slate-300 dark:hover:border-slate-800 transition-colors">
                      <CardHeader className="p-5 pb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-brand-primary">{course.code}</span>
                          <span className="text-xxs font-bold text-slate-450 uppercase">{course.credits} Credits</span>
                        </div>
                        <CardTitle className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">{course.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 pt-0 space-y-2">
                        <p className="text-xs text-slate-550 dark:text-slate-450 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 text-xxs font-semibold text-slate-450">
                          {course.schedule?.map((s, i) => (
                            <span key={i} className="block mt-1 first:mt-0">{s.day}: {s.time} ({s.room})</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right widgets (Notices & quick links) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Notices widget */}
              <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Bell className="h-4.5 w-4.5 text-brand-primary" />
                    <span>Recent Board notices</span>
                  </h3>
                  <button onClick={() => setActiveTab('notices')} className="text-xxs font-bold text-brand-primary hover:underline outline-none">
                    View
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-3.5 pt-1">
                  {notices.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="pt-3.5 first:pt-0 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Badge variant={notice.category === 'Exams' ? 'danger' : 'primary'} size="sm">
                          {notice.category}
                        </Badge>
                        <span className="text-[10px] text-slate-450 font-medium">{notice.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 hover:text-brand-primary cursor-pointer leading-tight">
                        {notice.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class link widget */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/10 opacity-30 pointer-events-none" />
                <h4 className="font-bold text-sm uppercase tracking-wider text-indigo-400 relative z-10">Live Classroom</h4>
                <h3 className="font-bold text-lg text-white mt-2 relative z-10">Advanced AI Lecture</h3>
                <p className="text-xs text-slate-400 mt-1 relative z-10">Starts in 45 minutes with Dr. Vance</p>
                <div className="pt-4 relative z-10">
                  <Button size="sm" variant="primary" className="w-full justify-center gap-1.5" leftIcon={<Play size={14} />}>
                    Join Stream
                  </Button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ATTENDANCE PANEL */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Charts left */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Attendance Breakdown</h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendance.filter(a => a.studentId === user.id)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.1} />
                    <XAxis dataKey="courseCode" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} />
                    <Bar dataKey="percentage" fill="var(--color-brand-primary)" radius={[4, 4, 0, 0]}>
                      {attendance.filter(a => a.studentId === user.id).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.percentage < 75 ? 'var(--color-brand-accent)' : entry.percentage < 85 ? 'rgba(79, 70, 229, 0.7)' : 'var(--color-brand-primary)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-4 justify-center text-xxs font-bold text-slate-550 dark:text-slate-400">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-primary" /> Adequate (≥ 85%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500/70" /> Warning (75% - 85%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-accent" /> Shortage (&lt; 75%)</span>
              </div>
            </div>

            {/* List right */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Subject logs</h3>
              </div>
              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-650 dark:text-slate-350 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Subject</th>
                    <th className="p-4">Classes Attended</th>
                    <th className="p-4">Total lectures</th>
                    <th className="p-4 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                  {attendance.filter(a => a.studentId === user.id).map((record, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{record.courseCode}</div>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{record.attended} classes</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{record.total} classes</td>
                      <td className="p-4 text-right">
                        <Badge variant={record.percentage < 75 ? 'danger' : record.percentage < 85 ? 'warning' : 'success'} size="sm">
                          {record.percentage}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRADES & RESULTS PANEL */}
        {activeTab === 'grades' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* GPA chart */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">GPA Progression</h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gpaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.1} />
                    <XAxis dataKey="sem" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[2.0, 4.0]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="gpa" stroke="var(--color-brand-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-indigo-50/40 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30 text-xs text-indigo-700 dark:text-indigo-400 font-semibold text-center">
                Your performance has increased by 0.17 GPA points since Semester 1.
              </div>
            </div>

            {/* Marks breakdown */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Semester Result Sheets</h3>
              </div>
              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-650 dark:text-slate-350 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Course Name</th>
                    <th className="p-4">Score / 100</th>
                    <th className="p-4 text-right">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-sm">
                  {grades.filter(g => g.studentId === user.id).map((g, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{g.courseName}</div>
                        <div className="text-xxs font-semibold text-slate-450 mt-1">{g.courseCode}</div>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{g.marks} / 100</td>
                      <td className="p-4 text-right">
                        <Badge variant={g.grade.startsWith('A') ? 'success' : g.grade.startsWith('B') ? 'primary' : 'warning'} size="sm">
                          {g.grade}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TIMETABLE PANEL */}
        {activeTab === 'timetable' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6">
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-2">Weekly Schedule Grid</h3>
              <p className="text-xs text-slate-450">Active lectures and lab testbeds timings for this term</p>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-650 dark:text-slate-350 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4 min-w-[150px]">Time Slot</th>
                    <th className="p-4 min-w-[120px]">Monday</th>
                    <th className="p-4 min-w-[120px]">Tuesday</th>
                    <th className="p-4 min-w-[120px]">Wednesday</th>
                    <th className="p-4 min-w-[120px]">Thursday</th>
                    <th className="p-4 min-w-[120px]">Friday</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {weeklyTimetable.map((slot, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="p-4 font-bold text-slate-650 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/50">{slot.time}</td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-300">{slot.mon}</td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-300">{slot.tue}</td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-300">{slot.wed}</td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-300">{slot.thu}</td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-300">{slot.fri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS PANEL */}
        {activeTab === 'payments' && (
          <div className="space-y-8">
            {/* Pending Fees grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="text-rose-500" />
                <span>Pending Invoices</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {payments.filter(p => p.studentId === user.id && p.status === 'PENDING').length === 0 ? (
                  <Card className="col-span-3 text-center py-10 bg-white dark:bg-slate-900">
                    <CardContent className="text-slate-500 font-semibold">All bills cleared! No pending balances.</CardContent>
                  </Card>
                ) : (
                  payments.filter(p => p.studentId === user.id && p.status === 'PENDING').map((bill) => (
                    <Card key={bill.id} className="border-rose-100 dark:border-rose-900/30">
                      <CardContent className="p-5 flex flex-col justify-between h-48">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Badge variant="warning" size="sm">{bill.purpose}</Badge>
                            <span className="text-xxs font-bold text-slate-450">{bill.invoiceNo}</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">${bill.amount}</h3>
                        </div>
                        <Button variant="primary" size="sm" className="w-full justify-center" onClick={() => handlePayFee(bill.id)}>
                          Pay Online
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Receipts transaction logs */}
            <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">Transaction History</h3>
                <p className="text-xs text-slate-450">View all past payments and download official invoices</p>
              </div>
              
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-650 dark:text-slate-350 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Billing Item</th>
                    <th className="p-4">Invoice No</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {payments.filter(p => p.studentId === user.id && p.status === 'SUCCESS').map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{record.purpose}</div>
                        <div className="text-xs font-bold text-emerald-500 mt-0.5">${record.amount} Paid</div>
                      </td>
                      <td className="p-4 text-slate-550 dark:text-slate-400">{record.invoiceNo}</td>
                      <td className="p-4 text-slate-550 dark:text-slate-400">{record.date}</td>
                      <td className="p-4">
                        <Badge variant="success" size="sm">PAID</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Download size={12} />}
                          className="h-8 py-1 px-2.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-brand-primary"
                          onClick={() => alert(`Downloading Invoice Receipt ${record.invoiceNo}...`)}
                        >
                          Invoice PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STUDENT PROFILE PANEL */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info display left */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center space-y-4">
              <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-brand-primary mx-auto shadow-md">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{user.name}</h3>
                <span className="text-xxs font-bold text-slate-450 uppercase mt-0.5 block">{user.rollNo}</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-805 pt-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 space-y-3">
                <p><span className="text-slate-450 block uppercase text-xxs font-bold">Email Address</span> {user.email}</p>
                <p><span className="text-slate-450 block uppercase text-xxs font-bold">Primary Phone</span> {user.phone}</p>
                <p><span className="text-slate-450 block uppercase text-xxs font-bold">Residential Address</span> {user.address}</p>
              </div>
            </div>

            {/* Editing form right */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <h3 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider">Personal details</h3>
                <Button size="sm" variant={isEditing ? 'outline' : 'primary'} leftIcon={<Edit3 size={14} />} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Primary Phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  required
                />
                
                <Input
                  label="Blood Group"
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g. O+"
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Residential Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>

                {isEditing && (
                  <div className="sm:col-span-2 flex justify-end">
                    <Button type="submit" variant="primary">
                      Save Profile Changes
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
