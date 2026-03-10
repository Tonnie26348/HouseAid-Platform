-- HouseAid Admin Superuser Permissions
-- This script grants the 'admin' role full access to all platform data.

-- 1. Profiles: Admin can manage all user profiles
DROP POLICY IF EXISTS "Admins can do everything on profiles" ON public.profiles;
CREATE POLICY "Admins can do everything on profiles" ON public.profiles
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 2. Jobs: Admin can manage all job listings
DROP POLICY IF EXISTS "Admins can manage all jobs" ON public.jobs;
CREATE POLICY "Admins can manage all jobs" ON public.jobs
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 3. Applications: Admin can monitor and manage all applications
DROP POLICY IF EXISTS "Admins can manage all applications" ON public.job_applications;
CREATE POLICY "Admins can manage all applications" ON public.job_applications
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 4. Contracts: Admin can oversee all legal agreements
DROP POLICY IF EXISTS "Admins can manage all contracts" ON public.contracts;
CREATE POLICY "Admins can manage all contracts" ON public.contracts
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 5. Verification: Admin can approve/reject all worker verifications
DROP POLICY IF EXISTS "Admins can manage all verifications" ON public.verification_requests;
CREATE POLICY "Admins can manage all verifications" ON public.verification_requests
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 6. Messaging: Admin can monitor system messages (Optional/Audit)
DROP POLICY IF EXISTS "Admins can monitor all messages" ON public.messages;
CREATE POLICY "Admins can monitor all messages" ON public.messages
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 7. Academy: Admin can manage courses and enrollments
DROP POLICY IF EXISTS "Admins can manage academy" ON public.courses;
CREATE POLICY "Admins can manage academy" ON public.courses
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "Admins can manage enrollments" ON public.enrollments;
CREATE POLICY "Admins can manage enrollments" ON public.enrollments
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
