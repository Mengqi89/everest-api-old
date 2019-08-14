CREATE TABLE everest_applications
(
    application_id SERIAL PRIMARY KEY,
    job INTEGER REFERENCES everest_jobs(job_id),
    teacher INTEGER REFERENCES everest_teachers(teacher_id),
    application_approved BOOLEAN NOT NULL DEFAULT false,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP DEFAULT now() NOT NULL
);