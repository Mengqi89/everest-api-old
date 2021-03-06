CREATE TABLE everest_teachers
(
    id SERIAL PRIMARY KEY,
    teacher_approved BOOLEAN NOT NULL DEFAULT false,
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
    years_of_experience INTEGER,
    years_in_china INTEGER,
    years_teaching_abroad INTEGER
);