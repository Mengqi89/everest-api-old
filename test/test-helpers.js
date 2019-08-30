const bcrypt = require('bcryptjs')

function makeAdminArray() {
    return [
        {
            'id': 1,
            'first_name': 'test1',
            'last_name': 'test1',
            'username': 'test1',
            'email': 'test1@test.net',
            'password': '!wW101010'
        },
        {
            'id': 2,
            'first_name': 'test2',
            'last_name': 'test2',
            'username': 'test2',
            'email': 'test2@test.net',
            'password': '!wW101010'
        }
    ]
}

function makeTeacherArray() {
    return [
        {
            id: 1,
            username: 'NatBowie',
            password: 'Password1!',
            first_name: 'Natasha',
            last_name: 'Bowie',
            age: 29,
            sex: 'Female',
            nationality: 'UK',
            race: 'Asian',
            native_speaker: true,
            married: 'no',
            highest_degree: 'BA',
            field_of_degree: 'English',
            school: 'Florida State University',
            certification: 'none',
            years_of_experience: 1,
            years_in_china: 1,
            years_teaching_abroad: 1,
        },
        {
            id: 2,
            username: 'Kahmed',
            password: 'Password1!',
            first_name: 'Ahmed',
            last_name: 'Kahreem',
            age: 33,
            sex: 'Male',
            nationality: 'USA',
            race: 'Other',
            native_speaker: true,
            married: 'yes',
            highest_degree: 'MA',
            field_of_degree: 'General Studies',
            school: 'University of Alabama',
            certification: 'TESL',
            years_of_experience: 2,
            years_in_china: 1,
            years_teaching_abroad: 1,
        }
    ]

}

function makeSchoolArray() {
    return [
        {
            id: 1,
            username: 'testSchool1',
            password: 'Password1!',
            school_name: 'Test School 1',
            school_type: 'Middle School',
            school_size: 1300,
            public_or_private: 'private',
            curriculum: 'AP',
            location: 'Chengdu',
            notable_facts:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in suscipit tortor, eu dignissim ante. Nulla fringilla blandit ligula sit amet laoreet. Donec sagittis nisi tortor, a malesuada lacus iaculis eu. In felis est, consectetur a lorem a, efficitur hendrerit orci. Sed nibh tellus, porta id sapien in, gravida pulvinar dui. Maecenas congue dui in ante tincidunt congue. Etiam id blandit ipsum. Cras quis libero rhoncus, gravida nisi id, venenatis sapien. Integer non nunc elit. Proin hendrerit dignissim lacus, at porttitor felis pellentesque in. Donec dictum molestie lectus fringilla egestas. Aliquam erat volutpat. Curabitur ullamcorper dolor non dui accumsan elementum. Curabitur pretium, velit ac volutpat laoreet, lacus sem tempus lectus, vel dignissim nunc leo vel arcu. Morbi quis pretium magna.',
            school_website: 'www.google.com',
            apartment_provided: true,
            housing_assistance: 'Will help teacher find housing.',
            size_of_housing: '2 Bed/2 Bath',
            // 'shared_room": true,
            // "private_room": false,
            shared_or_private_living_space: 'Shared',
            housing_notes: 'Shared living room with 1 other teacher',
            housing_on_or_off: 'Off Campus',
            time_to_get_to_class: '10 minute walk',
            distance_to_public_trans: '10 minute walk to nearest subway stop',
            school_charge_rent: false,
            school_rent_notes: 'No rent',
            school_charge_utils: false,
            school_utils_notes: 'No charge',
            furnished: true,
            furnished_notes: 'Queen-size bed, writing desk, six chairs',
            appliances_included:
                'Refrigerator, microwave, gas stove, television, air conditioner, washing machine',
            internet: 'Wired and wireless; wireless only; can be installed; no.',
            computer_included: 'Desktop',
            school_provide_health_insurance: true,
            provided_insurance_notes: 'Up to ¥1,000,000 annual coverage; no',
            medical_expeneses_paid: '¥1,000 deductible',
            disability_insurance: false,
            other_insurance: false,
            assistance_obtaining_work_visa: true,
            school_pay_work_visa: 'Yes',
            school_reimburse_costs_for_obtaining_visa_in_us: true,
            assistance_opening_chinese_bank_account: true,
            assistance_shopping_and_settling_in: true,
            organized_trips_for_teachers: true,
            other_western_teachers_at_school: 3,
            western_amenities_available_near_school_town:
                'Restaurants, shopping, bars'
        },
        {
            id: 2,
            username: 'testSchool2',
            password: 'Password1!',
            school_name: 'Test School 2',
            school_type: 'Middle School',
            school_size: 2300,
            public_or_private: 'private',
            curriculum: 'AP',
            location: 'Chengdu',
            notable_facts:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in suscipit tortor, eu dignissim ante. Nulla fringilla blandit ligula sit amet laoreet. Donec sagittis nisi tortor, a malesuada lacus iaculis eu. In felis est, consectetur a lorem a, efficitur hendrerit orci. Sed nibh tellus, porta id sapien in, gravida pulvinar dui. Maecenas congue dui in ante tincidunt congue. Etiam id blandit ipsum. Cras quis libero rhoncus, gravida nisi id, venenatis sapien. Integer non nunc elit. Proin hendrerit dignissim lacus, at porttitor felis pellentesque in. Donec dictum molestie lectus fringilla egestas. Aliquam erat volutpat. Curabitur ullamcorper dolor non dui accumsan elementum. Curabitur pretium, velit ac volutpat laoreet, lacus sem tempus lectus, vel dignissim nunc leo vel arcu. Morbi quis pretium magna.',
            school_website: 'www.google.com',
            apartment_provided: true,
            housing_assistance: 'Will help teacher find housing.',
            size_of_housing: '2 Bed/2 Bath',
            // "shared_room": true,
            // "private_room": false,
            shared_or_private_living_space: 'Shared',
            housing_notes: 'Shared living room with 1 other teacher',
            housing_on_or_off: 'Off Campus',
            time_to_get_to_class: '10 minute walk',
            distance_to_public_trans: '10 minute walk to nearest subway stop',
            school_charge_rent: false,
            school_rent_notes: 'No rent',
            school_charge_utils: false,
            school_utils_notes: 'No charge',
            furnished: true,
            furnished_notes: 'Queen-size bed, writing desk, six chairs',
            appliances_included:
                'Refrigerator, microwave, gas stove, television, air conditioner, washing machine',
            internet: 'Wired and wireless; wireless only; can be installed; no.',
            computer_included: 'Desktop',
            school_provide_health_insurance: true,
            provided_insurance_notes: 'Up to ¥1,000,000 annual coverage; no',
            medical_expeneses_paid: '¥1,000 deductible',
            disability_insurance: false,
            other_insurance: false,
            assistance_obtaining_work_visa: true,
            school_pay_work_visa: 'Yes',
            school_reimburse_costs_for_obtaining_visa_in_us: true,
            assistance_opening_chinese_bank_account: true,
            assistance_shopping_and_settling_in: true,
            organized_trips_for_teachers: true,
            other_western_teachers_at_school: 3,
            western_amenities_available_near_school_town:
                'Restaurants, shopping, bars'
        }
    ]
}

function makeNewSchool() {
    return {
        username: 'newschool',
        password: 'Password1!',
        school_type: 'Private',
        school_name: 'New School'
    }
}

function makeJobArray() {
    return [
        {
            id: 1,
            job_title: 'English Instructor',
            course: 'Honors English',
            grade_level: '11th grade',
            textbook_used: null,
            number_of_courses_to_teach: 2,
            number_of_sections: 6,
            max_class_size: 25,
            total_hours_of_class_per_week: 20,
            extra_duties_required: 'office hours',
            hours_of_extra_duties_per_week: 5,
            minimum_degree_required: 'BA',
            preferred_degree: 'MA',
            minimum_experience_required: 1,
            preferred_experience_level: 3,
            native_english_speaker: true,
            other_qualification: 'preferred experience teaching abroad',
            base_pay_per_month: 10000,
            bonuses: true,
            plane_ticket_provided_to_china: true,
            plane_ticket_provided_from_china: true,
            plane_ticket_reimbursment: false,
            paid_time_off: false,
            sick_days: 10,
            personal_days: 5,
            time_off_for_holidays: false,
            total_salary: 15000,
            job_school_id: 1,
            job_approved: true
        },
        {
            id: 2,
            job_title: 'English Instructor',
            course: 'Honors English',
            grade_level: '11th grade',
            textbook_used: null,
            number_of_courses_to_teach: 2,
            number_of_sections: 6,
            max_class_size: 25,
            total_hours_of_class_per_week: 20,
            extra_duties_required: 'office hours',
            hours_of_extra_duties_per_week: 5,
            minimum_degree_required: 'BA',
            preferred_degree: 'MA',
            minimum_experience_required: 1,
            preferred_experience_level: 3,
            native_english_speaker: true,
            other_qualification: 'preferred experience teaching abroad',
            base_pay_per_month: 10000,
            bonuses: true,
            plane_ticket_provided_to_china: true,
            plane_ticket_provided_from_china: true,
            plane_ticket_reimbursment: false,
            paid_time_off: false,
            sick_days: 10,
            personal_days: 5,
            time_off_for_holidays: false,
            total_salary: 15000,
            job_school_id: 2,
            job_approved: true
        }
    ]
}

function makeApplicationArray() {
    return [
        {
            id: 1,
            job_id: 1,
            teacher_id: 1,
            school_id: 1,
            application_approved: false
        },
        {
            id: 2,
            job_id: 2,
            teacher_id: 2,
            school_id: 2,
            application_approved: true
        }
    ]
}

function seedAdminUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db
        .into('everest_admins')
        .insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(`SELECT setval('everest_admins_id_seq', ?)`, [
                users[users.length - 1].id
            ])
        )
}

function seedTeacherUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db
        .into('everest_teachers')
        .insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(`SELECT setval('everest_teachers_id_seq', ?)`, [
                users[users.length - 1].id
            ])
        )
}

function seedSchoolUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db
        .into('everest_schools')
        .insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(`SELECT setval('everest_schools_id_seq', ?)`, [
                users[users.length - 1].id
            ])
        )
}

module.exports = {
    makeAdminArray,
    seedAdminUsers,
    makeTeacherArray,
    seedTeacherUsers,
    makeSchoolArray,
    seedSchoolUsers,
    makeJobArray,
    makeNewSchool,
    makeApplicationArray
}