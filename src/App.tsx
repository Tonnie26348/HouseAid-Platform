import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Employers = lazy(() => import("./pages/Employers"));
const Workers = lazy(() => import("./pages/Workers"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Partners = lazy(() => import("./pages/Partners"));
const Platform = lazy(() => import("./pages/Platform"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateJob = lazy(() => import("./pages/CreateJob"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const MyWorkers = lazy(() => import("./pages/MyWorkers"));
const Contracts = lazy(() => import("./pages/Contracts"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Join = lazy(() => import("./pages/Join"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllWorkers = lazy(() => import("./pages/AllWorkers"));
const EmployerProfileView = lazy(() => import("./pages/EmployerProfileView"));
const WorkerContracts = lazy(() => import("./pages/WorkerContracts"));
const Messages = lazy(() => import("./pages/Messages"));
const Academy = lazy(() => import("./pages/Academy"));
const CoursePlayer = lazy(() => import("./pages/CoursePlayer"));

import MainLayout from "./components/shared/MainLayout";
import DashboardLayout from "./components/shared/DashboardLayout";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import HouseholdProtectedRoute from "./components/shared/HouseholdProtectedRoute";
import WorkerProtectedRoute from "./components/shared/WorkerProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <Suspense fallback={
            <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50 font-sans">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading HouseAid</p>
              </div>
            </div>
          }>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/workers" element={<Workers />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/partners" element={<Partners />} />
              </Route>

              {/* Authentication Routes */}
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Platform Routes (Dashboard Shell) */}
              <Route path="/platform" element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  {/* Dynamic Dashboard Home */}
                  <Route index element={<Platform />} />
                  
                  {/* Shared Dashboard Features */}
                  <Route path="profile" element={<Profile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="jobs" element={<Jobs />} />
                  <Route path="jobs/:id" element={<JobDetail />} />
                  
                  {/* Household Specific Routes */}
                  <Route element={<HouseholdProtectedRoute />}>
                    <Route path="jobs/new" element={<CreateJob />} />
                    <Route path="workers" element={<MyWorkers />} />
                    <Route path="all-workers" element={<AllWorkers />} />
                    <Route path="contracts" element={<Contracts />} />
                  </Route>

                  {/* Worker Specific Routes */}
                  <Route element={<WorkerProtectedRoute />}>
                    <Route path="my-contracts" element={<WorkerContracts />} />
                    <Route path="academy" element={<Academy />} />
                    <Route path="academy/:courseId" element={<CoursePlayer />} />
                  </Route>

                  <Route path="employer/:id" element={<EmployerProfileView />} />
                </Route>
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
