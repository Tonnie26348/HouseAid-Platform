-- HouseAid Master Admin Setup
-- Creates or updates an admin account with email admin@houseaid.com and password 123456

-- 1. Ensure pgcrypto extension is enabled for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Define the Admin Email and Password
DO $$
DECLARE
  admin_email TEXT := 'adminhouseaid@gmail.com';
  admin_password TEXT := '123456';
  admin_id UUID;
BEGIN
  -- Check if user exists in auth.users
  SELECT id INTO admin_id FROM auth.users WHERE email = admin_email;

  IF admin_id IS NULL THEN
    -- Create new user if not exists
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"HouseAid Admin","role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO admin_id;
  ELSE
    -- Update existing user password and metadata
    UPDATE auth.users
    SET 
      encrypted_password = crypt(admin_password, gen_salt('bf')),
      raw_user_meta_data = '{"full_name":"HouseAid Admin","role":"admin"}',
      updated_at = now()
    WHERE id = admin_id;
  END IF;

  -- 3. Ensure the profile exists and has the 'admin' role
  INSERT INTO public.profiles (id, full_name, role, updated_at)
  VALUES (admin_id, 'HouseAid Admin', 'admin', now())
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin', full_name = 'HouseAid Admin', updated_at = now();

  RAISE NOTICE 'Admin user set up successfully with email %', admin_email;
END $$;
