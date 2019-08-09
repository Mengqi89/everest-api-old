CREATE TABLE everest_applications
(
    id SERIAL PRIMARY KEY,
    job INTEGER REFERENCES everest_jobs(id),
    teacher INTEGER REFERENCES everest_teachers(id),
    application_approved BOOLEAN NOT NULL DEFAULT false 
);