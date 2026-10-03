<?php
require "../config/db.php";

header("Content-Type: application/json; charset=UTF-8");

// Only logged-in students can access this API.
need("student");

$uid = (int) $_SESSION["user"]["id"];

// Get the profile belonging to the logged-in account.
$stmt = $conn->prepare("
    SELECT id, roll_no, name, email, phone, department, year
    FROM students
    WHERE user_id = ?
    LIMIT 1
");

$stmt->bind_param("i", $uid);
$stmt->execute();

$profile = $stmt->get_result()->fetch_assoc();

if (!$profile) {
    out(["error" => "No student profile found"], 404);
    exit;
}

$studentId = (int) $profile["id"];

// Get attendance summary for each course.
$stmt = $conn->prepare("
    SELECT
        c.course_code,
        c.course_name,
        SUM(
            CASE
                WHEN LOWER(a.status) = 'present' THEN 1
                ELSE 0
            END
        ) AS present,
        COUNT(*) AS total
    FROM attendance a
    INNER JOIN courses c ON c.id = a.course_id
    WHERE a.student_id = ?
    GROUP BY c.id, c.course_code, c.course_name
    ORDER BY c.course_code
");

$stmt->bind_param("i", $studentId);
$stmt->execute();

$attendance = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

// Get marks belonging only to this student.
$stmt = $conn->prepare("
    SELECT
        c.course_code,
        c.course_name,
        m.exam_type,
        m.score
    FROM marks m
    INNER JOIN courses c ON c.id = m.course_id
    WHERE m.student_id = ?
    ORDER BY c.course_code, m.id DESC
");

$stmt->bind_param("i", $studentId);
$stmt->execute();

$marks = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

// Return all student data.
out([
    "profile" => $profile,
    "attendance" => $attendance,
    "marks" => $marks
]);