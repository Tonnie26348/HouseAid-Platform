-- HouseAid Standardized RBAC Fix
-- Sets roles to: 'worker', 'employer', 'admin'

-- 1. Ensure profiles table has the 'role' column with correct naming
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT;
  END IF;
END $$;

-- 2. Create or update the profile handling function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  raw_role TEXT;
  mapped_role TEXT;
BEGIN
  -- Get role from metadata
  raw_role := LOWER(COALESCE(NEW.raw_user_meta_data->>'role', 'worker'));
  
  -- Strict Mapping
  IF raw_role LIKE '%worker%' OR raw_role = 'domestic worker' THEN
    mapped_role := 'worker';
  ELSIF raw_role LIKE '%employer%' OR raw_role LIKE '%household%' THEN
    mapped_role := 'employer';
  ELSIF raw_role = 'admin' THEN
    mapped_role := 'admin';
  ELSE
    mapped_role := 'worker'; -- Default fallback
  END IF;

  INSERT INTO public.profiles (id, full_name, role, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'HouseAid User'),
    mapped_role,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$;

-- 3. Reset Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Clean up existing data to the new standard
UPDATE public.profiles
SET role = 'worker'
WHERE role ILIKE '%worker%' OR role IS NULL;

UPDATE public.profiles
SET role = 'employer'
WHERE role ILIKE '%employer%' OR role ILIKE '%household%';

UPDATE public.profiles
SET role = 'admin'
WHERE role = 'admin';
