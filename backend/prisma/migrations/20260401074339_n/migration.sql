-- CreateTable
CREATE TABLE "companies" (
    "company_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "primary_currency" TEXT NOT NULL DEFAULT 'INR',
    "country" TEXT NOT NULL,
    "registration_no" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "location_types" (
    "location_type_id" TEXT NOT NULL,
    "location_type_name" TEXT NOT NULL,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_types_pkey" PRIMARY KEY ("location_type_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "location_type_id" TEXT NOT NULL,
    "location_name" TEXT NOT NULL,
    "address1" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "business_groups" (
    "bg_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_location_id" TEXT NOT NULL,
    "bg_name" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_groups_pkey" PRIMARY KEY ("bg_id")
);

-- CreateTable
CREATE TABLE "business_types" (
    "business_type_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "business_type_name" TEXT NOT NULL,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_types_pkey" PRIMARY KEY ("business_type_id")
);

-- CreateTable
CREATE TABLE "legal_entities" (
    "le_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "business_type_id" TEXT NOT NULL,
    "le_name" TEXT NOT NULL,
    "tax_registration_no" TEXT,
    "functional_currency" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "legal_entities_pkey" PRIMARY KEY ("le_id")
);

-- CreateTable
CREATE TABLE "operating_units" (
    "ou_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "le_id" TEXT NOT NULL,
    "business_type_id" TEXT NOT NULL,
    "ou_name" TEXT NOT NULL,
    "ou_short_code" TEXT,
    "location_id" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operating_units_pkey" PRIMARY KEY ("ou_id")
);

-- CreateTable
CREATE TABLE "inv_organizations" (
    "inv_org_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "le_id" TEXT NOT NULL,
    "business_type_id" TEXT NOT NULL,
    "inv_org_name" TEXT NOT NULL,
    "inv_org_code" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "org_type" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inv_organizations_pkey" PRIMARY KEY ("inv_org_id")
);

-- CreateTable
CREATE TABLE "hr_organizations" (
    "org_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "le_id" TEXT NOT NULL,
    "business_type_id" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "org_code" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "org_type" TEXT,
    "parent_org_id" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hr_organizations_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "grades" (
    "grade_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "grade_code" TEXT NOT NULL,
    "grade_name" TEXT NOT NULL,
    "min_salary" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "max_salary" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("grade_id")
);

-- CreateTable
CREATE TABLE "grade_steps" (
    "grade_step_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "grade_id" TEXT NOT NULL,
    "step_number" INTEGER NOT NULL,
    "step_name" TEXT NOT NULL,
    "step_amount" DECIMAL(65,30) NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grade_steps_pkey" PRIMARY KEY ("grade_step_id")
);

-- CreateTable
CREATE TABLE "grade_ladders" (
    "ladder_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "ladder_name" TEXT NOT NULL,
    "from_grade_id" TEXT NOT NULL,
    "to_grade_id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "min_years_in_grade" INTEGER NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grade_ladders_pkey" PRIMARY KEY ("ladder_id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "job_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "job_code" TEXT NOT NULL,
    "job_name" TEXT NOT NULL,
    "job_family" TEXT,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "positions" (
    "position_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "grade_id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "position_name" TEXT NOT NULL,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "persons" (
    "person_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_type" TEXT NOT NULL DEFAULT 'EMP',
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "gender" TEXT,
    "nationality" TEXT,
    "national_id" TEXT,
    "email" TEXT NOT NULL,
    "hire_date" TIMESTAMP(3),
    "address_type" TEXT,
    "address_line1" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "phone_type" TEXT,
    "phone_number" TEXT,
    "phone_preference" TEXT,
    "emergency_name" TEXT,
    "emergency_relationship" TEXT,
    "emergency_phone" TEXT,
    "emergency_address" TEXT,
    "emergency_priority" INTEGER,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "person_documents" (
    "document_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_number" TEXT,
    "issuing_authority" TEXT,
    "issue_date" TIMESTAMP(3),
    "expiry_date" TIMESTAMP(3),
    "verified_flag" BOOLEAN NOT NULL DEFAULT false,
    "qualification_type" TEXT,
    "degree_name" TEXT,
    "institution" TEXT,
    "year_of_passing" INTEGER,
    "grade_pct" DECIMAL(65,30),
    "company_name" TEXT,
    "designation" TEXT,
    "from_date" TIMESTAMP(3),
    "to_date" TIMESTAMP(3),
    "reason_for_leaving" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "payroll_periods" (
    "pay_period_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "payroll_name" TEXT NOT NULL,
    "payroll_code" TEXT NOT NULL,
    "period_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Open',
    "period_type" TEXT NOT NULL DEFAULT 'Monthly',
    "payment_method" TEXT NOT NULL DEFAULT 'Bank Transfer',
    "currency_code" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payroll_periods_pkey" PRIMARY KEY ("pay_period_id")
);

-- CreateTable
CREATE TABLE "assignment_status_types" (
    "status_type_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "status_code" TEXT NOT NULL,
    "status_name" TEXT NOT NULL,
    "user_status" TEXT,
    "system_status" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assignment_status_types_pkey" PRIMARY KEY ("status_type_id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "assignment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "position_id" TEXT,
    "job_id" TEXT,
    "grade_id" TEXT,
    "payroll_id" TEXT,
    "assignment_status_type_id" TEXT NOT NULL,
    "assignment_type" TEXT NOT NULL DEFAULT 'PRIMARY',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "supervisors" (
    "supervisor_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "supervisor_person_id" TEXT NOT NULL,
    "supervisor_assignment_id" TEXT NOT NULL,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supervisors_pkey" PRIMARY KEY ("supervisor_id")
);

-- CreateTable
CREATE TABLE "element_types" (
    "element_type_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "element_code" TEXT NOT NULL,
    "element_name" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "processing_priority" INTEGER NOT NULL DEFAULT 10,
    "recurring_flag" BOOLEAN NOT NULL DEFAULT true,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "element_types_pkey" PRIMARY KEY ("element_type_id")
);

-- CreateTable
CREATE TABLE "element_links" (
    "element_link_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "element_type_id" TEXT NOT NULL,
    "org_id" TEXT,
    "grade_id" TEXT,
    "position_id" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "element_links_pkey" PRIMARY KEY ("element_link_id")
);

-- CreateTable
CREATE TABLE "element_entries" (
    "entry_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "element_type_id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "element_entries_pkey" PRIMARY KEY ("entry_id")
);

-- CreateTable
CREATE TABLE "salaries" (
    "salary_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "basic_amount" DECIMAL(65,30) NOT NULL,
    "annual_gross" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "approval_status" TEXT NOT NULL DEFAULT 'Pending',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "salaries_pkey" PRIMARY KEY ("salary_id")
);

-- CreateTable
CREATE TABLE "payroll_runs" (
    "payroll_run_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "pay_period_id" TEXT NOT NULL,
    "run_date" TIMESTAMP(3) NOT NULL,
    "run_status" TEXT NOT NULL DEFAULT 'Pending',
    "total_employees" INTEGER NOT NULL DEFAULT 0,
    "total_gross" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_deductions" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_net" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payroll_runs_pkey" PRIMARY KEY ("payroll_run_id")
);

-- CreateTable
CREATE TABLE "run_results" (
    "run_result_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "payroll_run_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "element_type_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "run_results_pkey" PRIMARY KEY ("run_result_id")
);

-- CreateTable
CREATE TABLE "absence_types" (
    "absence_type_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "absence_code" TEXT NOT NULL,
    "absence_name" TEXT NOT NULL,
    "entitlement_per_year" INTEGER NOT NULL DEFAULT 0,
    "carry_forward_flag" BOOLEAN NOT NULL DEFAULT false,
    "max_carry_days" INTEGER NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "absence_types_pkey" PRIMARY KEY ("absence_type_id")
);

-- CreateTable
CREATE TABLE "absences" (
    "absence_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "absence_type_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "days" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "approved_by_person_id" TEXT,
    "entitlement" INTEGER NOT NULL DEFAULT 0,
    "used" INTEGER NOT NULL DEFAULT 0,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "absences_pkey" PRIMARY KEY ("absence_id")
);

-- CreateTable
CREATE TABLE "benefit_plans" (
    "plan_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "plan_code" TEXT NOT NULL,
    "plan_name" TEXT NOT NULL,
    "plan_type" TEXT NOT NULL,
    "coverage" TEXT,
    "employer_contribution_pct" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "benefit_plans_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "benefit_enrollments" (
    "enrollment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "enrollment_status" TEXT NOT NULL DEFAULT 'Enrolled',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "benefit_enrollments_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "security_roles" (
    "role_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role_code" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "security_profiles" (
    "profile_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "profile_code" TEXT NOT NULL,
    "profile_name" TEXT NOT NULL,
    "rls_rule_description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "security_profile_accesses" (
    "profile_access_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "business_type_id" TEXT,
    "org_id" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_profile_accesses_pkey" PRIMARY KEY ("profile_access_id")
);

-- CreateTable
CREATE TABLE "security_profile_persons" (
    "sp_person_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_profile_persons_pkey" PRIMARY KEY ("sp_person_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "person_id" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "audit_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "table_name" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "person_history" (
    "history_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "change_type" TEXT NOT NULL,
    "field_changed" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_date" TIMESTAMP(3) NOT NULL,
    "changed_by" TEXT NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_history_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "notification_type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Unread',
    "sent_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "cost_centers" (
    "cost_center_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "cost_center_code" TEXT NOT NULL,
    "cost_center_name" TEXT NOT NULL,
    "gl_account" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cost_centers_pkey" PRIMARY KEY ("cost_center_id")
);

-- CreateTable
CREATE TABLE "competences" (
    "competence_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "competence_code" TEXT NOT NULL,
    "competence_name" TEXT NOT NULL,
    "competence_type" TEXT NOT NULL,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competences_pkey" PRIMARY KEY ("competence_id")
);

-- CreateTable
CREATE TABLE "person_competences" (
    "person_comp_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "competence_id" TEXT NOT NULL,
    "proficiency_level" TEXT NOT NULL,
    "certified_flag" BOOLEAN NOT NULL DEFAULT false,
    "certification_date" TIMESTAMP(3),
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_competences_pkey" PRIMARY KEY ("person_comp_id")
);

-- CreateTable
CREATE TABLE "pay_balances" (
    "balance_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "element_type_id" TEXT NOT NULL,
    "balance_dimension" TEXT NOT NULL,
    "balance_amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pay_balances_pkey" PRIMARY KEY ("balance_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "payroll_run_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "net_amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "payment_method" TEXT NOT NULL DEFAULT 'Bank Transfer',
    "payment_status" TEXT NOT NULL DEFAULT 'Pending',
    "payment_date" TIMESTAMP(3) NOT NULL,
    "transaction_ref" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payslips" (
    "payslip_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "payroll_run_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "period_name" TEXT NOT NULL,
    "gross_amount" DECIMAL(65,30) NOT NULL,
    "total_deductions" DECIMAL(65,30) NOT NULL,
    "net_amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payslips_pkey" PRIMARY KEY ("payslip_id")
);

-- CreateTable
CREATE TABLE "tax_declarations" (
    "declaration_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "financial_year" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "declared_amount" DECIMAL(65,30) NOT NULL,
    "approved_amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "proof_submitted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tax_declarations_pkey" PRIMARY KEY ("declaration_id")
);

-- CreateTable
CREATE TABLE "loans" (
    "loan_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "loan_type" TEXT NOT NULL,
    "loan_amount" DECIMAL(65,30) NOT NULL,
    "interest_rate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "emi_amount" DECIMAL(65,30) NOT NULL,
    "tenure_months" INTEGER NOT NULL,
    "disbursement_date" TIMESTAMP(3) NOT NULL,
    "outstanding_balance" DECIMAL(65,30) NOT NULL,
    "loan_status" TEXT NOT NULL DEFAULT 'Active',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("loan_id")
);

-- CreateTable
CREATE TABLE "loan_repayments" (
    "repayment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "pay_period_id" TEXT NOT NULL,
    "emi_amount" DECIMAL(65,30) NOT NULL,
    "principal" DECIMAL(65,30) NOT NULL,
    "interest" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "outstanding_after" DECIMAL(65,30) NOT NULL,
    "repayment_status" TEXT NOT NULL DEFAULT 'Scheduled',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loan_repayments_pkey" PRIMARY KEY ("repayment_id")
);

-- CreateTable
CREATE TABLE "holiday_calendars" (
    "holiday_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "holiday_date" TIMESTAMP(3) NOT NULL,
    "holiday_name" TEXT NOT NULL,
    "holiday_type" TEXT NOT NULL,
    "applicable_to" TEXT NOT NULL DEFAULT 'All',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "holiday_calendars_pkey" PRIMARY KEY ("holiday_id")
);

-- CreateTable
CREATE TABLE "work_schedules" (
    "schedule_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "schedule_code" TEXT NOT NULL,
    "schedule_name" TEXT NOT NULL,
    "shift_start" TEXT NOT NULL,
    "shift_end" TEXT NOT NULL,
    "break_minutes" INTEGER NOT NULL DEFAULT 60,
    "working_hours" DECIMAL(65,30) NOT NULL,
    "applicable_days" TEXT NOT NULL,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_schedules_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "timecards" (
    "timecard_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "work_date" TIMESTAMP(3) NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "clock_in" TEXT,
    "clock_out" TEXT,
    "hours_worked" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "attendance_status" TEXT NOT NULL DEFAULT 'Present',
    "ot_hours" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "ot_rate_multiplier" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "ot_amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "approval_status" TEXT NOT NULL DEFAULT 'Pending',
    "approved_by" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timecards_pkey" PRIMARY KEY ("timecard_id")
);

-- CreateTable
CREATE TABLE "requisitions" (
    "requisition_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "requested_by_person_id" TEXT NOT NULL,
    "vacancy_count" INTEGER NOT NULL DEFAULT 1,
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "requisition_status" TEXT NOT NULL DEFAULT 'Open',
    "raised_date" TIMESTAMP(3) NOT NULL,
    "target_close_date" TIMESTAMP(3) NOT NULL,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requisitions_pkey" PRIMARY KEY ("requisition_id")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "job_posting_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "requisition_id" TEXT NOT NULL,
    "posting_title" TEXT NOT NULL,
    "posting_description" TEXT,
    "qualification_required" TEXT,
    "experience_years_min" INTEGER NOT NULL DEFAULT 0,
    "experience_years_max" INTEGER NOT NULL DEFAULT 0,
    "salary_range_min" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "salary_range_max" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "posting_channel" TEXT,
    "posting_date" TIMESTAMP(3) NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "posting_status" TEXT NOT NULL DEFAULT 'Active',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("job_posting_id")
);

-- CreateTable
CREATE TABLE "applicants" (
    "applicant_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "source" TEXT,
    "current_company" TEXT,
    "current_designation" TEXT,
    "expected_salary" DECIMAL(65,30),
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applicants_pkey" PRIMARY KEY ("applicant_id")
);

-- CreateTable
CREATE TABLE "applications" (
    "application_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "requisition_id" TEXT NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL,
    "application_status" TEXT NOT NULL DEFAULT 'Received',
    "screening_score" INTEGER,
    "shortlisted_flag" BOOLEAN NOT NULL DEFAULT false,
    "offered_flag" BOOLEAN NOT NULL DEFAULT false,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "interview_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "interview_round" INTEGER NOT NULL,
    "interview_date" TIMESTAMP(3) NOT NULL,
    "interviewer_person_id" TEXT NOT NULL,
    "interview_mode" TEXT NOT NULL,
    "interview_status" TEXT NOT NULL DEFAULT 'Scheduled',
    "rating" INTEGER,
    "feedback" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("interview_id")
);

-- CreateTable
CREATE TABLE "offer_letters" (
    "offer_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "requisition_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "proposed_grade_id" TEXT NOT NULL,
    "offered_salary" DECIMAL(65,30) NOT NULL,
    "joining_bonus" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "offer_date" TIMESTAMP(3) NOT NULL,
    "offer_expiry_date" TIMESTAMP(3) NOT NULL,
    "offer_status" TEXT NOT NULL DEFAULT 'Pending',
    "rejection_reason" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offer_letters_pkey" PRIMARY KEY ("offer_id")
);

-- CreateTable
CREATE TABLE "hired_persons" (
    "hire_record_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "offer_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "grade_id" TEXT NOT NULL,
    "date_of_joining" TIMESTAMP(3) NOT NULL,
    "probation_end_date" TIMESTAMP(3) NOT NULL,
    "employment_type" TEXT NOT NULL DEFAULT 'Permanent',
    "hired_salary" DECIMAL(65,30) NOT NULL,
    "hire_status" TEXT NOT NULL DEFAULT 'Joined',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hired_persons_pkey" PRIMARY KEY ("hire_record_id")
);

-- CreateTable
CREATE TABLE "training_programs" (
    "program_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "program_code" TEXT NOT NULL,
    "program_name" TEXT NOT NULL,
    "provider" TEXT,
    "duration_hours" INTEGER NOT NULL DEFAULT 0,
    "cost_per_person" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "delivery_mode" TEXT NOT NULL DEFAULT 'Classroom',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_programs_pkey" PRIMARY KEY ("program_id")
);

-- CreateTable
CREATE TABLE "training_enrollments" (
    "enrollment_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL,
    "completion_date" TIMESTAMP(3),
    "completion_status" TEXT NOT NULL DEFAULT 'Enrolled',
    "score" INTEGER,
    "certificate_issued" BOOLEAN NOT NULL DEFAULT false,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_enrollments_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "appraisals" (
    "appraisal_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "review_period" TEXT NOT NULL,
    "reviewer_person_id" TEXT NOT NULL,
    "overall_rating" INTEGER,
    "recommendation" TEXT,
    "appraisal_status" TEXT NOT NULL DEFAULT 'Draft',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appraisals_pkey" PRIMARY KEY ("appraisal_id")
);

-- CreateTable
CREATE TABLE "appraisal_ratings" (
    "rating_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "appraisal_id" TEXT NOT NULL,
    "kra_name" TEXT NOT NULL,
    "kra_weightage" INTEGER NOT NULL,
    "self_rating" INTEGER,
    "manager_rating" INTEGER,
    "final_rating" INTEGER,
    "comments" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appraisal_ratings_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "separations" (
    "separation_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "separation_type" TEXT NOT NULL,
    "reason" TEXT,
    "resignation_date" TIMESTAMP(3),
    "notice_period_days" INTEGER NOT NULL DEFAULT 30,
    "last_working_date" TIMESTAMP(3),
    "separation_status" TEXT NOT NULL DEFAULT 'Initiated',
    "approved_by_person_id" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "separations_pkey" PRIMARY KEY ("separation_id")
);

-- CreateTable
CREATE TABLE "exit_checklists" (
    "checklist_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "separation_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "checklist_item" TEXT NOT NULL,
    "department" TEXT,
    "assigned_to" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "completion_date" TIMESTAMP(3),
    "remarks" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exit_checklists_pkey" PRIMARY KEY ("checklist_id")
);

-- CreateTable
CREATE TABLE "final_settlements" (
    "settlement_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "bg_id" TEXT NOT NULL,
    "separation_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "pending_salary" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "leave_encashment_days" INTEGER NOT NULL DEFAULT 0,
    "leave_encashment_amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "gratuity_amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bonus_due" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_earnings" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "recovery_loan" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "recovery_other" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_deductions" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "net_settlement" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "settlement_status" TEXT NOT NULL DEFAULT 'Pending',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3) NOT NULL DEFAULT '2099-12-31'::date,
    "created_by" TEXT NOT NULL DEFAULT 'SYSTEM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "final_settlements_pkey" PRIMARY KEY ("settlement_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_location_type_id_fkey" FOREIGN KEY ("location_type_id") REFERENCES "location_types"("location_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_groups" ADD CONSTRAINT "business_groups_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_groups" ADD CONSTRAINT "business_groups_bg_location_id_fkey" FOREIGN KEY ("bg_location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_types" ADD CONSTRAINT "business_types_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("business_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_units" ADD CONSTRAINT "operating_units_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_units" ADD CONSTRAINT "operating_units_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_units" ADD CONSTRAINT "operating_units_le_id_fkey" FOREIGN KEY ("le_id") REFERENCES "legal_entities"("le_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_units" ADD CONSTRAINT "operating_units_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("business_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_units" ADD CONSTRAINT "operating_units_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv_organizations" ADD CONSTRAINT "inv_organizations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv_organizations" ADD CONSTRAINT "inv_organizations_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv_organizations" ADD CONSTRAINT "inv_organizations_le_id_fkey" FOREIGN KEY ("le_id") REFERENCES "legal_entities"("le_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv_organizations" ADD CONSTRAINT "inv_organizations_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("business_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inv_organizations" ADD CONSTRAINT "inv_organizations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_organizations" ADD CONSTRAINT "hr_organizations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_organizations" ADD CONSTRAINT "hr_organizations_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_organizations" ADD CONSTRAINT "hr_organizations_le_id_fkey" FOREIGN KEY ("le_id") REFERENCES "legal_entities"("le_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_organizations" ADD CONSTRAINT "hr_organizations_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("business_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_organizations" ADD CONSTRAINT "hr_organizations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_organizations" ADD CONSTRAINT "hr_organizations_parent_org_id_fkey" FOREIGN KEY ("parent_org_id") REFERENCES "hr_organizations"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_steps" ADD CONSTRAINT "grade_steps_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_steps" ADD CONSTRAINT "grade_steps_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_ladders" ADD CONSTRAINT "grade_ladders_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_ladders" ADD CONSTRAINT "grade_ladders_from_grade_id_fkey" FOREIGN KEY ("from_grade_id") REFERENCES "grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_ladders" ADD CONSTRAINT "grade_ladders_to_grade_id_fkey" FOREIGN KEY ("to_grade_id") REFERENCES "grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "hr_organizations"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_documents" ADD CONSTRAINT "person_documents_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_periods" ADD CONSTRAINT "payroll_periods_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_periods" ADD CONSTRAINT "payroll_periods_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_status_types" ADD CONSTRAINT "assignment_status_types_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "hr_organizations"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("grade_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_payroll_id_fkey" FOREIGN KEY ("payroll_id") REFERENCES "payroll_periods"("pay_period_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assignment_status_type_id_fkey" FOREIGN KEY ("assignment_status_type_id") REFERENCES "assignment_status_types"("status_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_supervisor_person_id_fkey" FOREIGN KEY ("supervisor_person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_supervisor_assignment_id_fkey" FOREIGN KEY ("supervisor_assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_types" ADD CONSTRAINT "element_types_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_types" ADD CONSTRAINT "element_types_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_links" ADD CONSTRAINT "element_links_element_type_id_fkey" FOREIGN KEY ("element_type_id") REFERENCES "element_types"("element_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_links" ADD CONSTRAINT "element_links_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "hr_organizations"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_links" ADD CONSTRAINT "element_links_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("grade_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_links" ADD CONSTRAINT "element_links_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_entries" ADD CONSTRAINT "element_entries_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element_entries" ADD CONSTRAINT "element_entries_element_type_id_fkey" FOREIGN KEY ("element_type_id") REFERENCES "element_types"("element_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salaries" ADD CONSTRAINT "salaries_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_pay_period_id_fkey" FOREIGN KEY ("pay_period_id") REFERENCES "payroll_periods"("pay_period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_results" ADD CONSTRAINT "run_results_payroll_run_id_fkey" FOREIGN KEY ("payroll_run_id") REFERENCES "payroll_runs"("payroll_run_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_results" ADD CONSTRAINT "run_results_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_results" ADD CONSTRAINT "run_results_element_type_id_fkey" FOREIGN KEY ("element_type_id") REFERENCES "element_types"("element_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absence_types" ADD CONSTRAINT "absence_types_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absence_types" ADD CONSTRAINT "absence_types_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absences" ADD CONSTRAINT "absences_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absences" ADD CONSTRAINT "absences_absence_type_id_fkey" FOREIGN KEY ("absence_type_id") REFERENCES "absence_types"("absence_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_plans" ADD CONSTRAINT "benefit_plans_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_plans" ADD CONSTRAINT "benefit_plans_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_enrollments" ADD CONSTRAINT "benefit_enrollments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_enrollments" ADD CONSTRAINT "benefit_enrollments_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "benefit_plans"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit_enrollments" ADD CONSTRAINT "benefit_enrollments_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_roles" ADD CONSTRAINT "security_roles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_profiles" ADD CONSTRAINT "security_profiles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_profile_accesses" ADD CONSTRAINT "security_profile_accesses_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "security_profiles"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_profile_persons" ADD CONSTRAINT "security_profile_persons_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "security_profiles"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_profile_persons" ADD CONSTRAINT "security_profile_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "security_roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_history" ADD CONSTRAINT "person_history_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_history" ADD CONSTRAINT "person_history_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "hr_organizations"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competences" ADD CONSTRAINT "competences_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competences" ADD CONSTRAINT "competences_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_competences" ADD CONSTRAINT "person_competences_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_competences" ADD CONSTRAINT "person_competences_competence_id_fkey" FOREIGN KEY ("competence_id") REFERENCES "competences"("competence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_balances" ADD CONSTRAINT "pay_balances_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_balances" ADD CONSTRAINT "pay_balances_element_type_id_fkey" FOREIGN KEY ("element_type_id") REFERENCES "element_types"("element_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_payroll_run_id_fkey" FOREIGN KEY ("payroll_run_id") REFERENCES "payroll_runs"("payroll_run_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_payroll_run_id_fkey" FOREIGN KEY ("payroll_run_id") REFERENCES "payroll_runs"("payroll_run_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslips" ADD CONSTRAINT "payslips_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_declarations" ADD CONSTRAINT "tax_declarations_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_declarations" ADD CONSTRAINT "tax_declarations_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_repayments" ADD CONSTRAINT "loan_repayments_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("loan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_repayments" ADD CONSTRAINT "loan_repayments_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_repayments" ADD CONSTRAINT "loan_repayments_pay_period_id_fkey" FOREIGN KEY ("pay_period_id") REFERENCES "payroll_periods"("pay_period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday_calendars" ADD CONSTRAINT "holiday_calendars_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday_calendars" ADD CONSTRAINT "holiday_calendars_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday_calendars" ADD CONSTRAINT "holiday_calendars_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_schedules" ADD CONSTRAINT "work_schedules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_schedules" ADD CONSTRAINT "work_schedules_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timecards" ADD CONSTRAINT "timecards_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timecards" ADD CONSTRAINT "timecards_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "work_schedules"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisitions" ADD CONSTRAINT "requisitions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisitions" ADD CONSTRAINT "requisitions_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisitions" ADD CONSTRAINT "requisitions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisitions" ADD CONSTRAINT "requisitions_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "hr_organizations"("org_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_requisition_id_fkey" FOREIGN KEY ("requisition_id") REFERENCES "requisitions"("requisition_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicants"("applicant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_requisition_id_fkey" FOREIGN KEY ("requisition_id") REFERENCES "requisitions"("requisition_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicants"("applicant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_requisition_id_fkey" FOREIGN KEY ("requisition_id") REFERENCES "requisitions"("requisition_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_letters" ADD CONSTRAINT "offer_letters_proposed_grade_id_fkey" FOREIGN KEY ("proposed_grade_id") REFERENCES "grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hired_persons" ADD CONSTRAINT "hired_persons_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicants"("applicant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hired_persons" ADD CONSTRAINT "hired_persons_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hired_persons" ADD CONSTRAINT "hired_persons_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer_letters"("offer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hired_persons" ADD CONSTRAINT "hired_persons_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hired_persons" ADD CONSTRAINT "hired_persons_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hired_persons" ADD CONSTRAINT "hired_persons_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "requisitions"("requisition_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_programs" ADD CONSTRAINT "training_programs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_programs" ADD CONSTRAINT "training_programs_bg_id_fkey" FOREIGN KEY ("bg_id") REFERENCES "business_groups"("bg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_enrollments" ADD CONSTRAINT "training_enrollments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_enrollments" ADD CONSTRAINT "training_enrollments_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "training_programs"("program_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appraisals" ADD CONSTRAINT "appraisals_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appraisals" ADD CONSTRAINT "appraisals_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appraisal_ratings" ADD CONSTRAINT "appraisal_ratings_appraisal_id_fkey" FOREIGN KEY ("appraisal_id") REFERENCES "appraisals"("appraisal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "separations" ADD CONSTRAINT "separations_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "separations" ADD CONSTRAINT "separations_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exit_checklists" ADD CONSTRAINT "exit_checklists_separation_id_fkey" FOREIGN KEY ("separation_id") REFERENCES "separations"("separation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_settlements" ADD CONSTRAINT "final_settlements_separation_id_fkey" FOREIGN KEY ("separation_id") REFERENCES "separations"("separation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_settlements" ADD CONSTRAINT "final_settlements_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("assignment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
