CREATE TABLE everest_jobs (
    id SERIAL PRIMARY KEY,
    job_title TEXT NOT NULL,
    course TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    textbook_used TEXT,
    number_of_courses_to_teach INTEGER,
    number_of_sections INTEGER,
    max_class_size INTEGER,
    total_hours_of_class_per_week INTEGER,
    extra_duties_required TEXT,
    hours_of_extra_duties_per_week INTEGER,
    minimum_degree_required TEXT,
    preferred_degree TEXT,
    minimum_experience_required INTEGER,
    preferred_experience_level INTEGER,
    native_english_speaker BOOLEAN,
    other_qualification TEXT,
    base_pay_per_month INTEGER,
    bonuses BOOLEAN,
    plane_ticket_provided_to_china BOOLEAN,
    plane_ticket_provided_from_china BOOLEAN,
    plane_ticket_reimbursment BOOLEAN,
    paid_time_off BOOLEAN,
    sick_days INTEGER,
    personal_days INTEGER,
    time_off_for_holidays BOOLEAN,
    total_salary INTEGER NOT NUll
);