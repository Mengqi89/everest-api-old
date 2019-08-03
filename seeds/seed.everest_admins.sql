BEGIN;

TRUNCATE
everest_admins
RESTART IDENTITY CASCADE;

INSERT INTO everest_admins 
(
    first_name,
    last_name,
    username,
    email,
    password
)
VALUES
(
    'Dunder',
    'Mifflin',
    'dunder',
    'wmq516@gmail.com',
    '!Aa101010'
);

COMMIT;