
<div align="center">

# 🎓 Student Management System

### A Web-Based Application for Student Records & Academic Management

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=2563EB&center=true&vCenter=true&width=650&lines=Student+Management+System;PHP+%7C+MySQL+%7C+JavaScript;Student+Records+%26+Academic+Tracking)](https://git.io/typing-svg)

<br>

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studentmanagement.infinityfree.me/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github)](https://github.com/AllanJenisha10/students-management-system)

<br>

![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Hosting](https://img.shields.io/badge/Hosting-InfinityFree-00A67D?style=flat-square)

**Organizing student profiles, attendance, and examination marks through a centralized web application.**

[🌐 Live Application](https://studentmanagement.infinityfree.me/) · [💻 Source Code](https://github.com/AllanJenisha10/students-management-system)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [How to Use](#-how-to-use)
- [Security](#-security)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 📖 Overview

The **Student Management System** is a web-based application developed to simplify the organization and management of student academic information.

The application provides separate dashboards for administrators and students. Administrators can manage student records, while students can access their personal details, course-wise attendance, and examination marks.

Built with PHP, MySQL, HTML, CSS, and JavaScript, the system connects a browser-based interface with a database-driven backend.

### 🎯 Project Objectives

- Digitize student record management.
- Organize academic information in a centralized system.
- Provide separate access for administrators and students.
- Make attendance and examination information easier to access.
- Practice full-stack web development and database integration.

---

## 🌐 Live Demo

<div align="center">

### Explore the Application

[![Open Live Application](https://img.shields.io/badge/🚀_OPEN_LIVE_APPLICATION-Visit_Website-2563EB?style=for-the-badge)](https://studentmanagement.infinityfree.me/)

**Website:** https://studentmanagement.infinityfree.me/

**Hosting Platform:** InfinityFree

</div>

Login may be required to access protected dashboards and student information. Use only the credentials configured for your application.

---

## ✨ Key Features

### 👨‍💼 Administrator Dashboard

- Add new student records.
- View student information.
- Search for student records.
- Update existing student details.
- Delete student records.
- Access the available academic management functions.

### 🎓 Student Dashboard

- View personal profile information.
- Access roll number, department, year, email, and phone where available.
- View course-wise attendance records.
- Check attendance totals and percentages.
- View examination marks by course and exam type.

### 🔐 Authentication and Access Control

- Separate administrator and student login.
- Session-based authentication.
- Role-based access restrictions for protected operations.
- Password verification using password hashing, where implemented by the application.

### 🗄️ Database and Backend

- MySQL database integration.
- PHP backend processing.
- API endpoints for application data.
- Organized frontend and backend files.
- Browser-based access to the deployed application.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structures web pages |
| CSS3 | Styles the user interface |
| JavaScript | Handles client-side interactions and API requests |
| PHP | Provides backend logic and APIs |
| MySQL / MariaDB | Stores and manages application data |
| Apache | Runs the application locally |
| XAMPP | Local development environment |
| phpMyAdmin | Database administration |
| Git | Version control |
| GitHub | Source code hosting |
| InfinityFree | Web hosting |

---

## 📂 Project Structure

The main application is organized into frontend, backend, database, and configuration components.

```text
student-management/
│
├── api/
│   ├── attendance.php
│   ├── logout.php
│   ├── my_record.php
│   ├── student.php
│   └── students.php
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── admin.js
│       ├── app.js
│       └── student.js
│
├── config/
│   └── db.php
│
├── database/
│   └── schema.sql
│
├── index.php
├── admin.html
└── README.md
```

*This is a representative structure. Update the file list to match the actual contents of your repository. Private configuration files must not be committed to public source control.*

---

## 💻 Installation and Setup

Follow these instructions to run the application in a local development environment.

### Prerequisites

Install or prepare the following:

- XAMPP or a compatible PHP environment.
- PHP with the MySQLi extension enabled.
- MySQL or MariaDB.
- A modern web browser.
- Git (optional).

### Step 1: Clone the Repository

Open PowerShell, Command Prompt, or a terminal.

```bash
git clone https://github.com/AllanJenisha10/students-management-system.git
cd students-management-system
```

If the application is inside a nested `student-management/` directory, enter that directory before continuing.

### Step 2: Configure XAMPP

1. Install and open XAMPP.
2. Start **Apache**.
3. Start **MySQL**.
4. Place the application folder inside the XAMPP `htdocs` directory.

Example:

```text
C:\xampp\htdocs\student-management\
```

### Step 3: Create the Database

1. Open phpMyAdmin at `http://localhost/phpmyadmin/`.
2. Create the database required by the application.
3. Import `database/schema.sql` if it contains the required database tables.
4. Configure the local database connection using your local settings.

Update the database host, database name, username, and password according to your local environment.

> Never publish production database credentials or private passwords in this repository.

### Step 4: Run the Application

Open your browser and visit the local project URL.

```text
http://localhost/student-management/
```

Adjust the URL according to the actual folder name and application entry point.

---

## 📘 How to Use

### Administrator Login

1. Open the application.
2. Enter the configured administrator username and password.
3. Sign in to access the Admin Dashboard.
4. Use the available functions to manage student records.
5. Log out when you finish.

### Student Login

1. Open the application.
2. Enter the assigned student login credentials.
3. Sign in to access the Student Dashboard.
4. Review your profile information.
5. Check attendance records and examination marks.
6. Log out when you finish.

### Demo Login Usernames

The following sample accounts are intended for testing. Passwords are intentionally not published in this public README.

| Account Type | Name | Username | Password that I Used |
|---|---|---|---|
| Administrator | Admin | `admin` | 'jeni10' |
| Student | Jeni | `1` | 'jeni' |
| Student | Sam | `2` | 'sam' |
| Student | Ben | `3` | '3' |
| Student | Jeba | `4` | '4' |

Use the demo passwords shared privately by the project owner, and confirm that each account is configured in the database before testing.

**Security note:** Do not publish working passwords, production database credentials, or real student records in a public repository. If these are publicly accessible demo accounts, use non-sensitive sample data and change any default passwords before using the application with real information.

---

## 🔒 Security Considerations

Security should be maintained throughout development and deployment.

- Store passwords using secure password hashing.
- Verify authentication on the server.
- Apply role checks to protected backend endpoints.
- Validate user input on the server.
- Use prepared SQL statements to help prevent SQL injection.
- Keep production database credentials out of GitHub.
- Avoid uploading real student information.
- Configure secure session settings and HTTPS for production.
- Return appropriate error messages without exposing sensitive system details.

These are security practices to verify in the implementation; listing them here does not by itself confirm that every measure is enabled.

---

## 🧪 Testing Checklist

Use the following checklist when testing the application.

- [ ] Administrator login and logout
- [ ] Student login and logout
- [ ] Access restrictions for different roles
- [ ] Student record creation
- [ ] Student record search
- [ ] Student record updates
- [ ] Student record deletion
- [ ] Student profile retrieval
- [ ] Attendance totals and percentages
- [ ] Examination mark retrieval
- [ ] Database connection and error handling
- [ ] Live deployment accessibility

Test with sample accounts and data before using real student information.

---

## 🚀 Future Enhancements

The following features could be considered for future versions.

- 📊 Interactive charts for academic performance.
- 📱 Improved responsive design for mobile devices.
- 🔔 Notifications for attendance and academic updates.
- 📄 Downloadable attendance and marks reports.
- 🔎 Advanced search, filtering, and pagination.
- ✨ Smooth animations and dashboard transitions.
- 🌙 Optional dark mode.
- 📈 Academic performance analytics.

These are potential improvements and are not necessarily part of the current implementation.

---

## 🤝 Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application locally.
5. Submit a pull request describing your changes.

Do not include private credentials or real student information in contributions.

---

## 📄 License

No license has been specified for this project.

If you intend to distribute the source code under an open-source license, add an appropriate `LICENSE` file to the repository.

---

## 👩‍💻 Author

<div align="center">

### Allan Jenisha R.

**Information Science and Engineering**

[![GitHub Profile](https://img.shields.io/badge/GitHub-AllanJenisha10-181717?style=for-the-badge&logo=github)](https://github.com/AllanJenisha10)

[![Live Project](https://img.shields.io/badge/Live_Project-Student_Management_System-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studentmanagement.infinityfree.me/)

</div>

---

<div align="center">

**Built with 💙 using PHP, MySQL, HTML, CSS, and JavaScript**

*Simplifying student record management through a web-based application.*

</div>
