UPDATE public.courses SET modules = '[
  {
    "id": 1,
    "title": "Professionalism in Kenyan Childcare",
    "content": "Welcome. This module focuses on the cultural and professional standards expected in Kenyan households.",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    "id": 2,
    "title": "Home Safety and Response",
    "content": "A deep dive into common hazards in Nairobi estates and how to secure them effectively.",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
]'::jsonb, 
quiz_data = '{
  "questions": [
    {
      "question": "What is the primary goal of the Elite Nanny program?",
      "options": ["Just cleaning", "Safety and Professionalism", "Watching TV", "Running errands"],
      "correct": 1
    }
  ]
}'::jsonb 
WHERE title = 'Elite Nanny Certification';
