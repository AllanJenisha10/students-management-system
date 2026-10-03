<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load db.php from the same folder as this index.php file
require_once __DIR__ . "/db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = trim($_POST["username"] ?? "");
    $password = $_POST["password"] ?? "";
    $roll_no = trim($_POST["roll_no"] ?? "");
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");

    if (
        $username === "" ||
        $password === "" ||
        $roll_no === "" ||
        $name === "" ||
        !filter_var($email, FILTER_VALIDATE_EMAIL)
    ) {
        $message = "Please fill all fields correctly.";
    } else {

        try {

            $check = $conn->prepare(
                "SELECT id FROM users WHERE username = ?"
            );

            $check->bind_param("s", $username);
            $check->execute();
            $check->store_result();

            if ($check->num_rows > 0) {

                $message = "Username already exists.";

            } else {

                $conn->begin_transaction();

                $hashedPassword = password_hash(
                    $password,
                    PASSWORD_DEFAULT
                );

                $userStmt = $conn->prepare(
                    "INSERT INTO users (username, password, role)
                     VALUES (?, ?, 'student')"
                );

                $userStmt->bind_param(
                    "ss",
                    $username,
                    $hashedPassword
                );

                $userStmt->execute();

                $user_id = $conn->insert_id;

                $studentStmt = $conn->prepare(
                    "INSERT INTO students
                    (user_id, roll_no, name, email)
                    VALUES (?, ?, ?, ?)"
                );

                $studentStmt->bind_param(
                    "isss",
                    $user_id,
                    $roll_no,
                    $name,
                    $email
                );

                $studentStmt->execute();

                $conn->commit();

                $message = "Student registered successfully!";

                $studentStmt->close();
                $userStmt->close();
            }

            $check->close();

        } catch (Exception $e) {

            try {
                $conn->rollback();
            } catch (Exception $ignore) {
            }

            $message = "Error: " . $e->getMessage();
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Student Management System</title>

</head>

<body>

    <h1>Student Management System</h1>

    <h2>Student Registration</h2>

    <?php if ($message !== ""): ?>

        <p>
            <?php
            echo htmlspecialchars(
                $message,
                ENT_QUOTES,
                "UTF-8"
            );
            ?>
        </p>

    <?php endif; ?>

    <form method="POST" action="">

        <label for="username">Username:</label>

        <input
            type="text"
            id="username"
            name="username"
            required
        >

        <br><br>

        <label for="password">Password:</label>

        <input
            type="password"
            id="password"
            name="password"
            required
        >

        <br><br>

        <label for="roll_no">Roll Number:</label>

        <input
            type="text"
            id="roll_no"
            name="roll_no"
            required
        >

        <br><br>

        <label for="name">Name:</label>

        <input
            type="text"
            id="name"
            name="name"
            required
        >

        <br><br>

        <label for="email">Email:</label>

        <input
            type="email"
            id="email"
            name="email"
            required
        >

        <br><br>

        <button type="submit">
            Register Student
        </button>

    </form>

</body>

</html>