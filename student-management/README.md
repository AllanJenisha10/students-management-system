# Student Management System

A role-based web app for managing students, courses, attendance and marks.
Stack: HTML, CSS, JavaScript (fetch), PHP (mysqli, prepared statements), MySQL. Tools: XAMPP, VS Code, Postman, GitHub.

## Features
- Admin and student login (PHP sessions, `password_hash` / `password_verify`)
- Admin: add, edit, delete and search students; manage courses; take attendance; record marks
- Student: view own profile, attendance percentage per course (red under 75%) and marks

## Run it on XAMPP
1. Copy this folder to `C:\xampp\htdocs\student-management`.
2. Start **Apache** and **MySQL** in the XAMPP Control Panel.
3. Open `http://localhost/phpmyadmin`, go to **Import**, and import `database/schema.sql`.
4. Open `http://localhost/student-management/setup.php` once. It creates the admin account and sample courses. Then delete `setup.php`.
5. Open `http://localhost/student-management/` and sign in as `admin` / `admin123`.
6. Add a student. Their first username and password are both their roll number.

If your MySQL root user has a password, change it in `config/db.php`.

## API endpoints (test in Postman)
Log in first with `POST /api/login.php` and keep the session cookie (Postman does this automatically). Send JSON bodies.

| Endpoint | Methods | Who |
|---|---|---|
| `api/login.php` | POST `{username, password}` | anyone |
| `api/logout.php`, `api/me.php` | GET | logged in |
| `api/students.php` | GET `?q=`, POST, PUT, DELETE `?id=` | admin |
| `api/courses.php` | GET, POST, DELETE `?id=` | GET any user, rest admin |
| `api/attendance.php` | GET `?course_id=&date=`, POST `{course_id, date, records[]}` | admin |
| `api/marks.php` | GET, POST, DELETE `?id=` | admin |
| `api/student.php` | GET | student |

## Security notes
- All queries use prepared statements; output is escaped in the browser
- Passwords are hashed; session ID is regenerated at login
- Every API checks the user's role on the server, not just in the page

## Folder structure
```
student-management/
├── index.html, admin.html, student.html
├── assets/ (css/style.css, js/app.js, admin.js, student.js)
├── api/ (login, logout, me, students, courses, attendance, marks, student)
├── config/db.php
├── database/schema.sql
├── setup.php
└── README.md
```
