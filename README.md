# CAMP — Campus Administration & Management Platform

CAMP (Campus Administration & Management Platform) is a modern, scalable, full-stack college web platform. It unifies public institutional web pages, role-based user management, interactive student/faculty dashboards, real-time notice publication, and automated online fee collection into a single, cohesive system.

---

## 🚀 Key Features

* **Public Web Portal:** SSR/SSG-optimized landing pages showcasing academic programs, departments, events, and admissions.
* **Role-Based Authentication & Access Control (RBAC):** Secure access levels for Students, Faculty, and System Administrators using JWT and encrypted passwords.
* **Interactive Dashboards:**
  * **Students:** View grades, track attendance, check timetable, and view transaction history.
  * **Faculty:** Mark attendance, upload marks, publish course materials, and manage student rosters.
* **Notice & Announcement System:** Real-time bulletin board supporting PDF attachments, tags, department-specific filters, and search.
* **Secure Payment Gateway:** Seamless online fee payment (tuition, hostel, exams) integrated with automated invoice generation and webhooks for transaction tracking.
* **Centralized Admin Panel:** Manage users, update site content, manage fee structures, and view administrative audit logs.

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** Next.js / React.js, Tailwind CSS
* **Backend:** Node.js (Express) / Python (Django/FastAPI)
* **Database:** PostgreSQL (Relational Data), Redis (Caching & Sessions)
* **Storage:** AWS S3 / Cloudinary (Document & Media Storage)
* **Payment Integration:** Razorpay / Stripe SDKs with Webhook processing

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
* Node.js (v18+ recommended)
* PostgreSQL
* Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/CAMP.git](https://github.com/your-username/CAMP.git)
   cd CAMP
