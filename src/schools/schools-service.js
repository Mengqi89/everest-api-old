const SchoolsService = {
  getAllSchools(knex) {
    return knex.select('*').from('everest_schools')
  },

  insertSchool(knex, newSchool) {
    return knex
      .insert(newSchool)
      .into('everest_schools')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('everest_schools')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteSchool(knex, id) {
    return knex('everest_schools')
      .where({ id })
      .delete()
  },

  updateSchool(knex, id, newSchoolFields) {
    return knex('everest_schools')
      .where({ id })
      .update(newSchoolFields)
  },

  serializeSchool(school) {
    return {
      username: school.username,
      password: school.password,
      school_name: school.school_name,
      school_type: school.school_type,
      school_size: school.school_size,
      public_or_private: school.public_or_private,
      curriculum: school.curriculum,
      location: school.location,
      notable_facts: school.notable_facts,
      school_website: school.school_website,
      housingInformation: {
        apartment_provided: school.apartment_provided,
        housing_assistance: school.housing_assistance,
        size_of_housing: school.size_of_housing,
        shared_room: school.shared_room,
        private_room: school.private_room,
        housing_notes: school.housing_notes,
        housing_on_or_off: school.housing_on_or_off,
        time_to_get_to_class: school.time_to_get_to_class,
        distance_to_public_trans: school.distance_to_public_trans,
        school_charge_rent: school.school_charge_rent,
        school_rent_notes: school.school_rent_notes,
        schoolChargeUtils: school.schoolChargeUtils,
        school_charge_utils: school.school_charge_utils,
        school_utils_notes: school.school_utils_notes,
        furnished: school.furnished,
        furnished_notes: school.furnished_notes,
        appliances_included: school.appliances_included,
        internet: school.internet,
        computer_included: school.computer_included
      },
      insuranceInformation: {
        school_provide_health_insurance: school.school_provide_health_insurance,
        provided_insurance_notes: school.provided_insurance_notes,
        medical_expeneses_paid: school.medical_expeneses_paid,
        disability_insurance: school.disability_insurance,
        other_insurance: school.other_insurance
      },
      visaInformation: {
        assistance_obtaining_work_visa: school.assistance_obtaining_work_visa,
        school_pay_work_visa: school.school_pay_work_visa,
        school_reimburse_costs_for_obtaining_visa_in_us: school.school_reimburse_costs_for_obtaining_visa_in_us
      },
      otherServices: {
        assistance_opening_chinese_bank_account: school.assistance_opening_chinese_bank_account,
        assistance_shopping_and_settling_in: school.assistance_shopping_and_settling_in,
        organized_trips_for_teachers: school.organized_trips_for_teachers
      },
      lifestyleInformation: {
        other_western_teachers_at_school: school.other_western_teachers_at_school,
        western_amenities_available_near_school_town: school.western_amenities_available_near_school_town
      }
    }
  }
}

module.exports = SchoolsService