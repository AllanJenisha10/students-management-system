
<?php
$conn = new mysqli("127.0.0.1", "root", "", "college_db", 3306);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");

    if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "Please enter a valid name and email address.";
    } else {
        $stmt = $conn->prepare(
            "INSERT INTO students (name, email) VALUES (?, ?)"
        );

        if ($stmt) {
            $stmt->bind_param("ss", $name, $email);

            if ($stmt->execute()) {
                $message = "Student registered successfully!";
            } else {
                $message = "Error saving student: " . $stmt->error;
            }

            $stmt->close();
        } else {
            $message = "Query error: " . $conn->error;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Registration</title>
</head>
<body>

    <h2>Student Registration Form</h2>

    <p>
        <?php echo htmlspecialchars($message, ENT_QUOTES, "UTF-8"); ?>
    </p>

    <form method="POST" action="">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br><br>

        <button type="submit">Register</button>
    </form>

</body>
</html>

<?php
$conn->close();
?>