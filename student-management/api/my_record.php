
<?php
require "../config/db.php";

header("Content-Type: application/json; charset=UTF-8");

// Require an authenticated student session.
if (
    empty($_SESSION["user"]) ||
    ($_SESSION["user"]["role"] ?? "") !== "student"
) {
    out(["error" => "Student login required"], 403);
    exit;
}

$userId = (int) $_SESSION["user"]["id"];

// Find the student record linked to this login.
$stmt = $conn->prepare(
    "SELECT s.id, s.roll_no, s.name, s.email,
            s.department, s.year
     FROM users u
     INNER JOIN students s ON s.id = u.student_id
     WHERE u.id = ? AND u.role = 'student'
     LIMIT 1"
);

$stmt->bind_param("i", $userId);
$stmt->execute();

$student = $stmt->get_result()->fetch_assoc();

if (!$student) {
    out(["error" => "No student record is linked to this account"], 404);
    exit;
}

$studentId = (int) $student["id"];

// Fetch only this student's attendance.
$stmt = $conn->prepare(
    "SELECT a.date, a.status, c.course_code, c.course_name
     FROM attendance a
     INNER JOIN courses c ON c.id = a.course_id
     WHERE a.student_id = ?
     ORDER BY a.date DESC"
);

$stmt->bind_param("i", $studentId);
$stmt->execute();

$attendance = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

// Fetch only this student's marks.
$stmt = $conn->prepare(
    "SELECT m.exam_type, m.score,
            c.course_code, c.course_name
     FROM marks m
     INNER JOIN courses c ON c.id = m.course_id
     WHERE m.student_id = ?
     ORDER BY m.id DESC"
);

$stmt->bind_param("i", $studentId);
$stmt->execute();

$marks = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

out([
    "student" => $student,
    "attendance" => $attendance,
    "marks" => $marks
]);