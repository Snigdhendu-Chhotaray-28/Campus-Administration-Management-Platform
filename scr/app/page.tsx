'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Bell, ChevronLeft, ChevronRight, Play, BookOpen, Award, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

// Count-up Anim Component
const Counter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 2000,
  suffix = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span className="font-display font-extrabold text-4xl sm:text-5xl">{count}{suffix}</span>;
};

export default function Home() {
  const { notices, events } = useApp();
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [deptIdx, setDeptIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    {
      quote: "My four years at Nexus were transformative. The engineering faculty are outstanding, and the campus research infrastructure helped me publish my first paper.",
      author: "David Miller",
      role: "Software Engineer, Microsoft (Class of 2024)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      quote: "The diverse community and startup support at Nexus enabled us to launch our EdTech company right from the campus incubator. Truly a world-class institute.",
      author: "Sophia Chen",
      role: "Co-Founder, EduLearn (Class of 2023)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      quote: "The academic rigor combined with a wide range of extracurricular activities allowed me to develop leadership skills that I use daily as a senior analyst.",
      author: "Marcus Aurelius",
      role: "Consultant, McKinsey & Co (Class of 2022)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    }
  ];

  const featuredDept = [
    {
      id: "dept-1",
      name: "Computer Science",
      desc: "AI, Machine Learning, Cybersecurity & Software Systems.",
      icon: <BookOpen className="h-6 w-6" />,
      count: "24 Courses",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dept-2",
      name: "Electronics Eng.",
      desc: "Digital systems, VLSI Design, IOT, and Robotics.",
      icon: <Award className="h-6 w-6" />,
      count: "18 Courses",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dept-3",
      name: "Mathematics",
      desc: "Applied calculus, probability modeling, and foundations.",
      icon: <Users className="h-6 w-6" />,
      count: "12 Courses",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const campusGallery = [
    { img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80", title: "Main Administrative Building", desc: "Our campus administrative center, showcasing architectural excellence and workspace layout." },
    { img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80", title: "Central Library Study Halls", desc: "A quiet, smart study space containing over 50,000 reference resources and digital archives." },
    { img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80", title: "Advanced Computing Labs", desc: "State-of-the-art programming and cloud research workstations for engineering scholars." },
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80", title: "Student Activity Center", desc: "The cultural hub hosting student clubs, athletic events, and collaborative workspace lounges." }
  ];

  // Auto-scroll campus gallery carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % campusGallery.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevDept = () => {
    setDeptIdx((prev) => (prev === 0 ? featuredDept.length - 1 : prev - 1));
  };

  const nextDept = () => {
    setDeptIdx((prev) => (prev === featuredDept.length - 1 ? 0 : prev + 1));
  };

  const getVisibleDepts = () => {
    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push(featuredDept[(deptIdx + i) % featuredDept.length]);
    }
    return list;
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-brand-dark-bg transition-colors duration-300 text-slate-900 dark:text-slate-100">

      {/* 1. Hero Section */}
      <section className="relative py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Hero Left Content */}
          <div className="space-y-8 text-left">
            <Badge variant="primary" className="bg-[#004b93]/10 text-[#004b93] border-none px-4 py-1.5 text-xs font-semibold tracking-wider">
              Welcome to Nexus University
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
              Shaping the Innovators of <br />
              <span className="text-[#004b93] dark:text-sky-400">Tomorrow</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              Join a distinguished collegiate community dedicated to high academic standards, advanced engineering research, and career-accelerating industry opportunities.
            </p>

            {/* Quick Actions (Matching Image 1 & 2 styles) */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/admissions">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#004b93] hover:bg-[#00376c] text-white font-extrabold uppercase text-xs tracking-wider py-3.5 px-6 shadow border-none"
                  rightIcon={<ArrowRight size={14} />}
                >
                  Admission 2026
                </Button>
              </Link>
              <Link href="/academics">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#004b93] hover:bg-[#00376c] text-white font-extrabold uppercase text-xs tracking-wider py-3.5 px-6 shadow border-none"
                >
                  Explore Curriculums
                </Button>
              </Link>
              <Link href="/admissions">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#004b93] hover:bg-[#00376c] text-white font-extrabold uppercase text-xs tracking-wider py-3.5 px-6 shadow border-none"
                >
                  Apply Online
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right image (using central library photo in Silicon layout context) */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 h-[300px] sm:h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
              alt="Nexus Central Library"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Dark banner overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 text-white flex justify-between items-end">
              <div>
                <p className="text-xxs uppercase tracking-widest text-sky-300 font-bold">Campus Heritage</p>
                <h4 className="text-lg font-bold">Nexus University</h4>
                <p className="text-xs text-slate-400">Pioneering Educational Excellence</p>
              </div>
              <span className="bg-[#b32025] hover:bg-[#94181c] p-2.5 rounded-full cursor-pointer transition-colors shadow">
                <Play className="h-4.5 w-4.5 fill-white ml-0.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Campus Heritage Info Section (using Silicon Innovation Carousel Layout) */}
      <section className="relative bg-white dark:bg-slate-900/40 py-16 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl min-h-[300px] flex flex-col md:flex-row">

            {/* Carousel Slides Graphic (Left) */}
            <div className="md:w-1/2 relative h-48 md:h-auto overflow-hidden bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={carouselIdx}
                  src={campusGallery[carouselIdx].img}
                  alt={campusGallery[carouselIdx].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Carousel Content (Right) */}
            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <Badge variant="primary" className="bg-[#004b93] text-white py-1 px-3 border-none">Campus Gallery</Badge>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl font-black text-slate-950 dark:text-white leading-tight">
                      {campusGallery[carouselIdx].title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      {campusGallery[carouselIdx].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicator dots */}
              <div className="flex items-center gap-2 mt-8">
                {campusGallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${carouselIdx === idx ? 'bg-[#004b93] w-6' : 'bg-slate-300 dark:bg-slate-700 w-2.5'
                      }`}
                    title={`Campus Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skewed Blue separator divider border */}
      <div className="w-full relative h-12 overflow-hidden bg-white dark:bg-brand-dark-bg z-10 pointer-events-none select-none">
        <div className="absolute top-4 left-0 right-0 h-1.5 bg-[#004b93] transform skew-y-[-1.5deg]" />
      </div>

      {/* 3. Featured Departments Section (using Academic Programs Slider Layout) */}
      <section className="relative py-16 bg-white dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
            {/* Left grey accent title block */}
            <div className="bg-slate-100 dark:bg-slate-800 px-8 py-5 border-l-4 border-[#004b93] rounded shadow-sm">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Featured Departments
              </h2>
            </div>

            {/* Right text desc */}
            <div className="max-w-2xl">
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-semibold">
                Explore our central academic departments led by distinguished faculty members.
              </p>
            </div>
          </div>

          {/* Centered button */}
          <div className="flex justify-center mb-12">
            <Link href="/departments">
              <Button
                variant="primary"
                size="lg"
                className="bg-[#004b93] hover:bg-[#00376c] text-white font-extrabold uppercase text-xs tracking-wider py-3.5 px-8 shadow border-none"
              >
                Explore Curriculums
              </Button>
            </Link>
          </div>

          {/* Card slider deck */}
          <div className="relative px-2 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden py-4">
              {getVisibleDepts().map((dept, index) => (
                <div
                  key={`${dept.id}-${index}`}
                  className="rounded-xl overflow-hidden shadow-lg border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between transition-transform duration-350 hover:-translate-y-1.5 h-full"
                >
                  {/* Card top Image */}
                  <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                    <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-[#004b93] text-white text-[10px] font-bold py-1 px-2.5 rounded shadow">
                      {dept.count}
                    </div>
                  </div>

                  {/* Card Central Container - Dark Blue Background */}
                  <div className="bg-[#004b93] text-white p-6 flex-grow flex flex-col justify-between min-h-[170px]">
                    <div>
                      <div className="bg-white/10 p-2.5 rounded-lg w-fit mb-3">
                        {dept.icon}
                      </div>
                      <h4 className="text-base sm:text-lg font-extrabold leading-tight tracking-wide uppercase line-clamp-1">
                        {dept.name}
                      </h4>
                      <p className="text-xs text-blue-100/90 leading-relaxed mt-2 line-clamp-3">
                        {dept.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-xxs text-blue-200/80 font-bold uppercase tracking-wider">
                      {dept.count} • Nexus Campus
                    </div>
                  </div>

                  {/* Card Bottom - Crimson Red Button */}
                  <Link href="/departments" className="block">
                    <button className="w-full bg-[#b32025] hover:bg-[#94181c] text-white py-3.5 text-xs font-bold tracking-wider transition-colors duration-250 flex items-center justify-center gap-1.5 uppercase select-none border-none cursor-pointer">
                      Explore Department <span className="text-sm">»</span>
                    </button>
                  </Link>

                </div>
              ))}
            </div>

            {/* Slider arrows */}
            <button
              onClick={prevDept}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-2.5 sm:p-3.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all"
              title="Previous Department"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>
            <button
              onClick={nextDept}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-2.5 sm:p-3.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all"
              title="Next Department"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>

            {/* Indicator dots */}
            <div className="flex justify-center items-center gap-1.5 mt-8">
              {featuredDept.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setDeptIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${deptIdx === idx ? 'bg-[#b32025] w-6' : 'bg-slate-350 dark:bg-slate-700 w-2.5'
                    }`}
                  title={`Department Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 4. Real-time Notices & Events Preview Panel */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Notices Panel */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 dark:bg-red-950/20 text-[#b32025] p-2.5 rounded-xl">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Notices</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Stay updated with official bulletins</p>
                  </div>
                </div>
                <Link href="/notices">
                  <Button variant="ghost" size="sm" className="text-[#004b93] font-bold">View All</Button>
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {notices && notices.slice(0, 5).map((notice) => (
                  <Card key={notice.id} variant="default" className="hover:border-[#004b93] hover:shadow-md transition-all">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={notice.category === 'Exams' ? 'danger' : notice.category === 'Placement' ? 'success' : 'primary'} size="sm" className="bg-[#004b93]/10 text-[#004b93] border-none">
                          {notice.category}
                        </Badge>
                        <span className="text-xs text-slate-500 font-semibold">{notice.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-950 dark:text-slate-100 hover:text-[#004b93] cursor-pointer line-clamp-1 transition-colors">
                        <Link href="/notices">{notice.title}</Link>
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                        {notice.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Events Panel */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 dark:bg-blue-950/20 text-[#004b93] p-2.5 rounded-xl">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Participate in collegiate experiences</p>
                  </div>
                </div>
                <Link href="/events">
                  <Button variant="ghost" size="sm" className="text-[#004b93] font-bold">View All</Button>
                </Link>
              </div>

              <div className="flex flex-col gap-5">
                {events && events.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex flex-col sm:flex-row gap-5 bg-white dark:bg-slate-900 p-4 border border-slate-200/70 dark:border-slate-800 rounded-xl hover:shadow-md transition-all">
                    <div className="h-32 sm:h-24 sm:w-32 rounded-lg overflow-hidden flex-shrink-0 relative bg-slate-100">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2">
                        <Badge variant="accent" size="sm" className="bg-[#b32025] text-white border-none">{event.category}</Badge>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between py-0.5 gap-2 flex-grow">
                      <div>
                        <h4 className="text-base font-extrabold text-slate-950 dark:text-white hover:text-[#004b93] transition-colors cursor-pointer line-clamp-1">
                          <Link href={`/events`}>{event.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-500 font-semibold mt-1">
                        <span>{event.date} • {event.time}</span>
                        <Link href={`/events`} className="text-[#004b93] hover:underline flex items-center gap-1 font-bold">
                          Register <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Heritage Overview Block (Silicon-style callout) */}
      <section className="py-20 bg-white dark:bg-slate-900/20 border-t border-slate-200/60 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-6 text-left">
              <Badge variant="accent" className="bg-[#b32025] text-white border-none py-1 px-3">Campus Heritage</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
                Pioneering Educational Excellence Since <span className="text-gradient">1998</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Nexus College is a premier technical institution situated in a lush, smart-infrastructure campus. Our focus is to deliver a balanced education that bridges engineering principles with global business practices.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Equipped with modern research centers, incubation labs, and outstanding athletic facilities, we help students grow into global citizens prepared to tackle critical issues in healthcare, tech, and environment.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button variant="outline" className="border-[#004b93] text-[#004b93] hover:bg-[#004b93] hover:text-white" rightIcon={<ArrowRight size={16} />}>
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video mockup frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-slate-800 h-[280px] sm:h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                alt="Nexus Campus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                <button className="h-16 w-16 bg-[#004b93] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 border-none cursor-pointer">
                  <Play className="h-6 w-6 ml-1 text-white fill-white" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Alumni Testimonials Slider Section */}
      <section className="py-20 bg-white dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="success" className="bg-[#10B981]/15 text-[#10B981] border-none">Testimonials</Badge>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white mt-4">What Our Alumni Say</h2>
          </div>

          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col gap-6 items-center text-center">
            <p className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300 italic max-w-2xl leading-relaxed">
              "{testimonials[testimonialIdx].quote}"
            </p>
            <div className="flex items-center gap-4 mt-2">
              <img
                src={testimonials[testimonialIdx].avatar}
                alt={testimonials[testimonialIdx].author}
                className="h-12 w-12 rounded-full object-cover border-2 border-[#004b93]"
              />
              <div className="text-left">
                <h4 className="font-extrabold text-slate-950 dark:text-white">{testimonials[testimonialIdx].author}</h4>
                <p className="text-xs text-slate-500 font-semibold">{testimonials[testimonialIdx].role}</p>
              </div>
            </div>

            {/* Slider Dots navigation controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-600 dark:text-slate-400 cursor-pointer"
                title="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${i === testimonialIdx ? 'bg-[#004b93] w-4' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-600 dark:text-slate-400 cursor-pointer"
                title="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats Counter trust metrics in Deep Blue */}
      <section className="relative py-16 bg-[#004b93] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Counter end={12000} suffix="+" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200 mt-2">Active Students</p>
            </div>
            <div className="flex flex-col items-center">
              <Counter end={450} suffix="+" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200 mt-2">Expert Faculty</p>
            </div>
            <div className="flex flex-col items-center">
              <Counter end={96} suffix="%" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200 mt-2">Placement Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <Counter end={85} suffix="+" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200 mt-2">Global Partner Univ</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
