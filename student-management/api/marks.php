<?php
require "../config/db.php";
need("admin");
$m = $_SERVER['REQUEST_METHOD'];

if ($m === 'GET') {
    out($conn->query("SELECT m.id, s.roll_no, s.name, c.course_code, m.exam_type, m.score
                      FROM marks m JOIN students s ON s.id=m.student_id JOIN courses c ON c.id=m.course_id
                      ORDER BY m.id DESC LIMIT 200")->fetch_all(MYSQLI_ASSOC));
}
if ($m === 'POST') {
    $b = body(); $sid = (int)($b['student_id'] ?? 0); $cid = (int)($b['course_id'] ?? 0);
    $t = trim($b['exam_type'] ?? ''); $sc = $b['score'] ?? '';
    if (!$sid || !$cid || $t === '' || !is_numeric($sc) || $sc < 0 || $sc > 100) out(["error" => "Pick a student, course, exam type and a score from 0 to 100"], 422);
    $s = $conn->prepare("INSERT INTO marks(student_id,course_id,exam_type,score) VALUES(?,?,?,?)");
    $s->bind_param("iisd", $sid, $cid, $t, $sc); $s->execute();
    out(["ok" => true], 201);
}
if ($m === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $s = $conn->prepare("DELETE FROM marks WHERE id=?");
    $s->bind_param("i", $id); $s->execute();
    out(["ok" => true]);
}
