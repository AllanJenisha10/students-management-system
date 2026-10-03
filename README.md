
# Student Management System

A web-based Student Management System developed using PHP, MySQL, HTML, CSS, and JavaScript. The application simplifies student record management and provides a centralized interface for accessing student profiles, course-wise attendance, and examination marks through separate Admin and Student dashboards.

## 🌐 Live Demo

**Live Application:** [Student Management System](https://studentmanagement.infinityfree.me/)

The application is hosted on InfinityFree. Login is required to access protected dashboards and student information.

## ✨ Key Features

### Authentication and Access
- Separate administrator and student login.
- Session-based authentication.
- Role-based access control for protected operations.
- Secure password verification using password hashing.

### Admin Dashboard
- Add new student records.
- View and search student information.
- Update existing student details.
- Delete student records.
- Access available academic management functions.

### Student Dashboard
- View personal profile information.
- View roll number, department, year, email, and phone.
- Check course-wise attendance records.
- View attendance totals and percentages.
- View examination marks by course and exam type.

### Application
- Database integration using MySQL.
- Structured PHP API endpoints.
- Organized HTML, CSS, JavaScript, and PHP files.
- Hosted web application accessible through a browser.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| JavaScript | Client-side interactions and API requests |
| PHP | Server-side logic and application APIs |
| MySQL | Relational database management |
| Apache | Local web server through XAMPP |
| phpMyAdmin | Database administration |
| Visual Studio Code | Development environment |
| InfinityFree | Web hosting |
| Git and GitHub | Version control and source code hosting |

## 📋 Prerequisites

Before installing the project locally, ensure that you have:

- PHP with the MySQLi extension enabled.
- MySQL or MariaDB.
- Apache or another compatible PHP web server.
- A modern web browser.
- Git for cloning the repository.

**Recommended environment:** XAMPP, which provides Apache, PHP, and MariaDB.

## 🚀 Installation and Setup

### 1. Clone the Repository

Replace the repository URL with your actual GitHub repository URL.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### 2. Configure the Local Environment

1. Install and open XAMPP.
2. Start Apache and MySQL from the XAMPP Control Panel.
3. Place the project folder inside the `htdocs` directory.

Example Windows path:

```text
C:\xampp\htdocs\student-management-system\
```

### 3. Set Up the Database

1. Open phpMyAdmin at `http://localhost/phpmyadmin/`.
2. Create the database required by the application.
3. Import the project's SQL file if one is included in the repository.
4. Configure the database connection in `config/db.php`.

Update the database host, database name, username, and password to match your local environment.

**Note:** The database schema must be created before the application can retrieve or store records. If an SQL export is not included, prepare the required tables using the existing project schema.

### 4. Run the Application

Open the following address in your browser:

```text
http://localhost/YOUR_PROJECT_FOLDER/
```

Replace `YOUR_PROJECT_FOLDER` with the actual folder name inside `htdocs`.

## 💻 Usage

### Access the Application

Open the live website:

**[https://studentmanagement.infinityfree.me/](https://studentmanagement.infinityfree.me/)**

Alternatively, run the project locally using the installation steps above.

### Example 1: Administrator Login

1. Open the application.
2. Enter the administrator's username and password.
3. Sign in to access the Admin Dashboard.
4. Use the available student management functions.
5. Sign out after completing your work.

Example account format:

```text
Username: admin
Password: Your configured administrator password
```

The credentials above are an example format. Use the actual administrator credentials configured for your application.

### Example 2: Student Login

1. Open the application.
2. Enter the student's login credentials.
3. Sign in to access the Student Dashboard.
4. View personal details, attendance percentages, and examination marks.
5. Sign out when finished.

Example based on the current development database:

```text
Username: 1
Password: The password configured for this account
```

The username is an example from the current project data. The password must match the password associated with that account.

**Security:** Never publish actual passwords or private student information in this README or in a public repository.

## 📁 Project Structure

The main application files are organized as follows:

```text
student-management-system/
├── api/
│   ├── login.php
│   ├── logout.php
│   ├── me.php
│   ├── student.php
│   ├── students.php
│   ├── courses.php
│   ├── attendance.php
│   └── ...
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       ├── admin.js
│       └── student.js
├── config/
│   └── db.php
├── index.html
├── admin.html
├── student.html
└── README.md
```

This is an illustrative structure based on the project files discussed during development. Keep only filenames and directories that actually exist in your repository.

## 🔐 Security Considerations

- Use password hashing and verification for user authentication.
- Enforce authentication and role checks on protected server-side endpoints.
- Keep production database credentials private.
- Do not commit passwords, session secrets, or private configuration files.
- Avoid uploading real student records or personal information.
- Use HTTPS and appropriate secure session settings in production.
- Validate and sanitize user input on the server.

## 🧪 Testing

Before deploying changes, verify the following:

- Administrator login and logout.
- Student login and logout.
- Access restrictions for different user roles.
- Student record creation, search, update, and deletion.
- Student profile retrieval.
- Attendance totals and percentages.
- Examination mark retrieval.
- Database connectivity and error handling.

Test these operations with sample data before using real student records.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes.
4. Test the changes locally.
5. Submit a pull request with a clear description.

Please do not include database passwords, private credentials, or real student information in contributions.

## 📄 License

No license has been specified for this project.

To make the project's reuse and distribution terms clear, add a `LICENSE` file containing the license you choose before presenting the repository as an open-source project.

## 👩‍💻 Author

**Allan Jenisha R.**

- **GitHub:** [AllanJenisha10](https://github.com/AllanJenisha10)
- **Live Application:** [Student Management System](https://studentmanagement.infinityfree.me/)

---

*Developed as a web-based project to organize student records and make academic information accessible through dedicated dashboards.*
