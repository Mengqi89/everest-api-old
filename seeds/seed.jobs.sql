BEGIN;

  TRUNCATE
  jobs
  RESTART IDENTITY CASCADE;


  INSERT INTO jobs
  (
    job_title,
    course,
    grade_level,
    textbook_used,
    number_of_courses_to_teach,
    number_of_sections,
    max_class_size,
    total_hours_of_class_per_week,
    extra_duties_required,
    hours_of_extra_duties_per_week,
    minimum_degree_required,
    preferred_degree,
    minimum_experience_required,
    preferred_experience_level,
    native_english_speaker,
    other_qualification,
    base_pay_per_month,
    bonuses,
    plane_ticket_provided_to_china,
    plane_ticket_provided_from_china,
    plane_ticket_reimbursment,
    paid_time_off,
    sick_days,
    personal_days,
    time_off_for_holidays,
    total_salary
  )
  VALUES
  (
    'English Instructor',
    'Honors English',
    '11th grade',
    NULL,
    2,
    6,
    25,
    20,
    'office hours',
    5,
    'BA',
    'MA',
    1,
    3,
    true,
    'preferred experience teaching abroad',
    10000,
    true,
    true,
    true,
    false,
    false,
    10,
    5,
    false,
    15000
  );

 
  COMMIT;
