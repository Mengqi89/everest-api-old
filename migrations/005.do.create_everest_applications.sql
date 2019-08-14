CREATE TABLE everest_applications
(
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES everest_jobs(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES everest_teachers(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES everest_schools(id) ON DELETE CASCADE,
    application_approved BOOLEAN NOT NULL DEFAULT false,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP DEFAULT now() NOT NULL
);