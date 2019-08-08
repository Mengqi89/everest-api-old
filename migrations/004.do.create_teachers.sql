CREATE TABLE everest_teachers
(
    id SERIAL PRIMARY KEY,
    approved BOOLEAN NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    sex TEXT NOT NULL,
    nationality TEXT NOT NULL,
    race TEXT NOT NULL,
    native_speaker BOOLEAN NOT NULL,
    married TEXT NOT NULL,
    highest_degree TEXT NOT NULL,
    field_of_degree TEXT NOT NULL,
    school TEXT NOT NULL,
    certification TEXT NOT NULL,
    years_of_experience TEXT NOT NULL,
    years_in_china TEXT NOT NULL,
    years_teaching_abroad TEXT NOT NULL
);