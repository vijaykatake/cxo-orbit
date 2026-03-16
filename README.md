# CXO Orbit Global — Events & Conference Management System

**Stack:** React | Node.js | MySQL  
**Project Folder:** `C:\Projects\COX\cxo-orbit`

---

## 🚀 Quick Start (After Extracting the ZIP)

### Step 1 — Set up the Database

1. Open **MySQL Workbench**, connect to your local server
2. Run the init script:
   ```bash
   mysql -u root -p < database/init.sql
   ```
3. Default admin credentials seeded:
   - Email: `admin@cxoorbitglobal.com`
   - Password: `Admin@1234` ← **Change this after first login!**

---

### Step 2 — Configure Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in:
```
DB_PASSWORD=your_mysql_root_password
JWT_SECRET=any_long_random_string_here
SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
```

Then install dependencies:
```bash
npm install
```

---

### Step 3 — Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

### Step 4 — Run Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# → http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
# → http://localhost:3000
```

---

## 📂 Project Structure

```
cxo-orbit/
├── backend/
│   ├── src/
│   │   ├── config/        ← DB connection
│   │   ├── controllers/   ← Route logic
│   │   ├── middleware/     ← Auth, RBAC
│   │   ├── models/         ← Sequelize models
│   │   ├── routes/         ← API endpoints
│   │   └── services/       ← Email service
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/            ← Axios instance
│   │   ├── components/     ← Header, Footer, Layout
│   │   ├── context/        ← AuthContext
│   │   └── pages/          ← public / portal / admin
│   └── tailwind.config.js
├── database/
│   └── init.sql
└── .vscode/
    ├── settings.json
    └── launch.json
```

---

## 🔗 Key URLs

| URL | Description |
|-----|------------|
| `http://localhost:3000` | Public website |
| `http://localhost:3000/admin/login` | Admin panel login |
| `http://localhost:3000/portal/login` | CXO member OTP login |
| `http://localhost:5000/api/health` | Backend health check |

---

## 📋 API Endpoints Summary

| Method | Endpoint | Access |
|--------|---------|--------|
| POST | `/api/auth/admin/login` | Public |
| POST | `/api/auth/otp/request` | Public |
| POST | `/api/auth/otp/verify` | Public |
| GET | `/api/events` | Public |
| POST | `/api/events` | Admin |
| POST | `/api/sponsors/inquiry` | Public |
| GET | `/api/sponsors` | Admin |
| POST | `/api/partners/inquiry` | Public |
| POST | `/api/admin/users/invite` | Admin |
| GET | `/api/admin/users` | Admin |
| GET | `/api/admin/email-logs` | Admin |

---

## 🎨 Brand Colors

| Name | Hex |
|------|-----|
| Royal Blue | `#0B2C4D` |
| Soft Gold | `#D4AF37` |
| Ivory White | `#F8F6F2` |
| Charcoal | `#2E2E2E` |
| Teal Accent | `#1FA6A0` |

---

*Based on CXO_Orbit_Global_SRS_v1_0.docx — v1.0 — Feb 2026*
