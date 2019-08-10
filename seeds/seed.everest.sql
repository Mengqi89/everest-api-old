BEGIN;

  TRUNCATE
  everest_admins,
  everest_schools,
  everest_jobs,
  everest_teachers,
  everest_applications
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

  INSERT INTO everest_schools
    (
    username,
    password,
    school_name,
    school_type,
    school_size,
    public_or_private,
    curriculum,
    location,
    notable_facts,
    school_website,
    apartment_provided,
    housing_assistance,
    size_of_housing,
    shared_room,
    private_room,
    housing_notes,
    housing_on_or_off,
    time_to_get_to_class,
    distance_to_public_trans,
    school_charge_rent,
    school_rent_notes,
    school_charge_utils,
    school_utils_notes,
    furnished,
    furnished_notes,
    appliances_included,
    internet,
    computer_included,
    school_provide_health_insurance,
    provided_insurance_notes,
    medical_expeneses_paid,
    disability_insurance,
    other_insurance,
    assistance_obtaining_work_visa,
    school_pay_work_visa,
    school_reimburse_costs_for_obtaining_visa_in_us,
    assistance_opening_chinese_bank_account,
    assistance_shopping_and_settling_in,
    organized_trips_for_teachers,
    other_western_teachers_at_school,
    western_amenities_available_near_school_town,
    school_approved
    )
  VALUES
    (
      'testSchool1',
      '$2a$12$KiUL9KVwSLiuUjpbNzSuKe6CfuCeX5xxLssZiGD4l5YyiEWZZfkoi',
      -- Password1!
      'Test School 1',
      'Middle School',
      1200,
      true,
      'AP',
      'Chengdu',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in suscipit tortor, eu dignissim ante. Nulla fringilla blandit ligula sit amet laoreet. Donec sagittis nisi tortor, a malesuada lacus iaculis eu. In felis est, consectetur a lorem a, efficitur hendrerit orci. Sed nibh tellus, porta id sapien in, gravida pulvinar dui. Maecenas congue dui in ante tincidunt congue. Etiam id blandit ipsum. Cras quis libero rhoncus, gravida nisi id, venenatis sapien. Integer non nunc elit. Proin hendrerit dignissim lacus, at porttitor felis pellentesque in. Donec dictum molestie lectus fringilla egestas. Aliquam erat volutpat. Curabitur ullamcorper dolor non dui accumsan elementum. Curabitur pretium, velit ac volutpat laoreet, lacus sem tempus lectus, vel dignissim nunc leo vel arcu. Morbi quis pretium magna.',
      'www.google.com',
      true,
      'Will help teacher find housing.',
      '2 Bed/2 Bath',
      true,
      false,
      'Shared living room with 1 other teacher',
      'Off Campus',
      '10 minute walk',
      '10 minute walk to nearest subway stop',
      false,
      'No rent',
      false,
      'No charge',
      true,
      'Queen-size bed, writing desk, six chairs',
      'Refrigerator, microwave, gas stove, television, air conditioner, washing machine',
      'Wired and wireless; wireless only; can be installed; no.',
      'Desktop',
      true,
      'Up to ¥1,000,000 annual coverage; no',
      '¥1,000 deductible',
      false,
      false,
      true,
      'Yes',
      true,
      true,
      true,
      true,
      3,
      'Restaurants, shopping, bars',
      false
    );
    
    INSERT INTO everest_jobs
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
    total_salary,
    school_id,
    job_approved
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
    15000,
    1,
    false
    );

  INSERT INTO everest_teachers
    (
    teacher_approved,
    username,
    password,
    first_name,
    last_name,
    age,
    sex,
    nationality,
    race,
    native_speaker,
    married,
    highest_degree,
    field_of_degree,
    school,
    certification,
    years_of_experience,
    years_in_china,
    years_teaching_abroad
    )
  VALUES
    (
      false,
      'NatBowie',
      '$2a$12$bS0HJTSC64Znaz.armIYaOr1on3tSZOgMqN9JbbljwdvE96o.B.G2',
      -- 'Password1!',
      'Natasha',
      'Bowie',
      29,
      'Female',
      'UK',
      'Asain',
      'yes',
      'no',
      'BA',
      'English',
      'Florida State University',
      'none',
      '1',
      '0',
      '1'
    );

    INSERT INTO everest_applications
(
    job,
    teacher
)
VALUES
(
    1,
    1
);

  -- INSERT INTO everest_schools
  -- (
  --   schoolName,
  --   schoolType,
  --   schoolSize,
  --   publicOrPrivate,
  --   curriculum,
  --   location,
  --   notableFacts,
  --   schoolWebsite,
  --   apartmentProvided,
  --   schoolProvideHealthInsurance,
  --   disabilityInsurance,
  --   otherInsurance,
  --   assistanceObtainingWorkVisa,
  --   schoolPayWorkVisa,
  --   schoolReimburseCostsForObtainingVisaInUs,
  --   assistanceOpeningChineseBankAccount,
  --   assistanceShoppingAndSettlingIn,
  --   organizedTripsForTeachers,
  --   otherWesternTeachersAtSchool,
  --   westernAmenitiesAvailableNearSchoolTown,
  -- )
  -- VALUES
  -- (
  --   'Test School 2',
  --   'High School',
  --   500,
  --   false,
  --   'IGCSE',
  --   'Sichuan',
  --   'Maecenas pharetra libero at metus mattis blandit et eu urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean iaculis, purus in ultrices tempus, augue elit ultrices odio, eget tempus dui neque scelerisque nibh. Phasellus egestas eros congue posuere vehicula. Quisque eu urna magna. Donec eget nisl vel est lacinia malesuada. Phasellus porta dignissim nisl, id ultricies leo consequat non. Mauris in purus tortor. In ullamcorper suscipit efficitur. Donec eget libero laoreet, condimentum tellus sed, cursus tortor.',
  --   'www.facebook.com',
  --   false,
  --   false,
  --   false,
  --   false,
  --   true,
  --   'Yes',
  --   true,
  --   true,
  --   true,
  --   true,
  --   4,
  --   'Restaurants, shopping, bars'
  -- );
  COMMIT;