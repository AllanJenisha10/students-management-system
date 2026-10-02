<?php
// Everything a logged-in student sees: own profile, attendance per course, marks.
require "../config/db.php";
need("student");
$uid = $_SESSION['user']['id'];
$s = $conn->prepare("SELECT id,roll_no,name,email,phone,department,year FROM students WHERE user_id=?");
$s->bind_param("i", $uid); $s->execute();
$p = $s->get_result()->fetch_assoc();
if (!$p) out(["error" => "No student profile found"], 404);

$s = $conn->prepare("SELECT c.course_code, c.course_name, SUM(a.status='present') present, COUNT(*) total
                     FROM attendance a JOIN courses c ON c.id=a.course_id WHERE a.student_id=? GROUP BY c.id");
$s->bind_param("i", $p['id']); $s->execute();
$att = $s->get_result()->fetch_all(MYSQLI_ASSOC);

$s = $conn->prepare("SELECT c.course_code, c.course_name, m.exam_type, m.score
                     FROM marks m JOIN courses c ON c.id=m.course_id WHERE m.student_id=? ORDER BY c.course_code");
$s->bind_param("i", $p['id']); $s->execute();
out(["profile" => $p, "attendance" => $att, "marks" => $s->get_result()->fetch_all(MYSQLI_ASSOC)]);
