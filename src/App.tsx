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

import MainLayout from "./components/shared/MainLayout";
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
      <BrowserRouter basename="/HouseAid-Platform">
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
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
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Generic Protected Routes (accessible to any authenticated user) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/platform" element={<Platform />} />
                <Route path="/platform/profile" element={<Profile />} />
                <Route path="/platform/messages" element={<Messages />} />
                <Route path="/platform/jobs/new" element={<CreateJob />} />
                <Route path="/platform/jobs" element={<Jobs />} />
                <Route path="/platform/jobs/:id" element={<JobDetail />} />
                <Route path="/platform/employer/:id" element={<EmployerProfileView />} />
              </Route>

              {/* Household Protected Routes */}
              <Route element={<HouseholdProtectedRoute />}>
                <Route path="/platform/workers" element={<MyWorkers />} />
                <Route path="/platform/contracts" element={<Contracts />} />
                <Route path="/platform/all-workers" element={<AllWorkers />} />
              </Route>

              {/* Worker Protected Routes */}
              <Route element={<WorkerProtectedRoute />}>
                <Route path="/platform/my-contracts" element={<WorkerContracts />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
