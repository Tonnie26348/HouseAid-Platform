CREATE TABLE workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id),
  full_name TEXT,
  skills TEXT[],
  experience INTEGER,
  hourly_rate INTEGER,
  availability TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID REFERENCES auth.users(id),
  worker_id UUID REFERENCES workers(id),
  start_date DATE,
  end_date DATE,
  status TEXT,
  hourly_rate INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);
