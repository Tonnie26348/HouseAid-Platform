-- HouseAid Admin Cleanup Script
-- This script removes the admin user and all administrative bypass policies.

-- 1. Delete the admin user and profile
DO $$
DECLARE
  target_email TEXT := 'adminhouseaid@gmail.com';
  admin_id UUID;
BEGIN
  SELECT id INTO admin_id FROM auth.users WHERE email = target_email;
  
  IF admin_id IS NOT NULL THEN
    -- Profiles will be deleted automatically due to CASCADE if configured, 
    -- but we do it manually to be safe.
    DELETE FROM public.profiles WHERE id = admin_id;
    DELETE FROM auth.users WHERE id = admin_id;
  END IF;
END $$;

-- 2. Drop all Admin Superuser Policies
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can manage all applications" ON public.job_applications;
DROP POLICY IF EXISTS "Admins can manage all contracts" ON public.contracts;
DROP POLICY IF EXISTS "Admins can manage all verifications" ON public.verification_requests;
DROP POLICY IF EXISTS "Admins can monitor all messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can manage academy courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage enrollments" ON public.enrollments;

-- 3. Restore standard RLS (Ensure tables are still protected)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
