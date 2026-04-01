# 🏢 HRMS – Human Resource Management System

A full-stack HRMS web application built from the Excel schema, featuring 40+ modules across the complete HR lifecycle.

---

## 🗂️ Project Structure

```
hrms/
├── backend/               # Node.js + Express + Prisma
│   ├── src/
│   │   ├── config/        # Prisma client
│   │   ├── controllers/   # CRUD + Auth + Dashboard
│   │   ├── middleware/    # JWT Auth + Error handler
│   │   └── routes/        # All API routes
│   ├── .env               # Backend environment variables
│   └── package.json
├── frontend/              # React + Tailwind CSS
│   ├── src/
│   │   ├── components/    # Reusable UI (DataTable, Modal, FormField, CRUDModule, Sidebar)
│   │   ├── hooks/         # useAuth, useCRUD
│   │   ├── pages/         # Dashboard, Login, all Module pages
│   │   └── services/      # Axios API service
│   ├── .env               # Frontend environment variables
│   └── package.json
└── prisma/
    ├── schema.prisma      # Full DB schema (40+ models, all relations)
    └── seed.js            # Initial data + admin user
```

---

## ⚡ Quick Setup

### Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 14
- npm or yarn

---

### 1. Create PostgreSQL Database

```sql
CREATE DATABASE hrms_db;
```

---

### 2. Configure Environment

**Backend** – Edit `backend/.env`:
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/hrms_db?schema=public"
JWT_SECRET="your-super-secret-key"
PORT=5000
```

**Frontend** – Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 4. Generate Prisma Client & Run Migrations

```bash
cd backend

# Copy schema to prisma folder expected by Prisma CLI
# (schema.prisma is in ../prisma/ — update package.json if needed)

npx prisma generate --schema=../prisma/schema.prisma
npx prisma migrate dev --name init --schema=../prisma/schema.prisma
```

Or add this to `backend/package.json`:
```json
"prisma": {
  "schema": "../prisma/schema.prisma"
}
```

Then run:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### 5. Seed the Database

```bash
cd backend
node ../prisma/seed.js
```

This creates:
- Company, Location, Business Group, Grade
- Admin role, HR User role
- **Admin user**: `admin@hrms.com` / `Admin@123`
- **HR User**: `hruser@hrms.com` / `HRUser@123`

---

### 6. Start the Application

```bash
# Terminal 1 – Backend
cd backend
npm run dev
# → http://localhost:5000

# Terminal 2 – Frontend
cd frontend
npm start
# → http://localhost:3000
```

---

## 🧩 Modules Included

| Category | Modules |
|----------|---------|
| **Organization** | Company, Location Types, Locations, Business Groups, Business Types, Legal Entities, Operating Units, HR Organizations |
| **HR Core** | Employees (Persons), Assignments, Jobs, Positions, Grades, Grade Steps, Grade Ladders, Supervisors |
| **Payroll** | Pay Periods, Assignment Status Types, Element Types, Element Entries, Salaries, Payroll Runs, Payslips, Tax Declarations |
| **Leave & Time** | Leave Types, Leave Requests, Timecards, Work Schedules, Holiday Calendar |
| **Recruitment** | Requisitions, Job Postings, Applicants, Applications, Interviews, Offer Letters |
| **Benefits & Loans** | Benefit Plans, Benefit Enrollments, Loans |
| **Learning** | Competences, Training Programs, Training Enrollments |
| **Performance** | Appraisals, Appraisal Ratings |
| **Separation** | Separations, Exit Checklists, Final Settlements |
| **Admin** | Security Roles, Users, Audit Logs |

---

## 🔌 API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Current user |
| GET | `/dashboard` | Dashboard stats |
| GET/POST | `/:resource` | List / Create |
| GET/PUT/DELETE | `/:resource/:id` | Read / Update / Delete |

**Query params** (for list endpoints):
- `page` – page number (default: 1)
- `limit` – records per page (default: 20)

**Auth header**: `Authorization: Bearer <jwt_token>`

---

## 🔐 Authentication

- JWT-based authentication (8-hour expiry)
- Role-based access: `HR_ADMIN`, `HR_USER`
- Protected routes on both frontend and backend

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router 6, Tailwind CSS, Axios |
| Backend | Node.js, Express 4, Prisma ORM |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |

---

## 📦 Prisma Schema Highlights

- **40+ models** mapped to PostgreSQL tables
- Full **foreign key relationships** with Prisma `@relation`
- Soft delete via `activeFlag` (no hard deletes)
- Effective dating (`effectiveFrom`, `effectiveTo`) on every table
- Audit trail fields (`createdBy`, `createdAt`)

---

## 🐛 Troubleshooting

**Prisma can't find schema?**
Add to `backend/package.json`:
```json
"prisma": { "schema": "../prisma/schema.prisma" }
```

**CORS error?**
Ensure backend `.env` has:
```
CLIENT_URL=http://localhost:3000
```

**Database connection failed?**
Verify `DATABASE_URL` in `backend/.env` matches your PostgreSQL credentials.
