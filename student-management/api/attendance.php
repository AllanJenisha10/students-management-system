<?php
require "../config/db.php";
need("admin");
$m = $_SERVER['REQUEST_METHOD'];

if ($m === 'GET') {   // every student with their status for one course and date
    $cid = (int)($_GET['course_id'] ?? 0); $d = $_GET['date'] ?? date('Y-m-d');
    $s = $conn->prepare("SELECT s.id, s.roll_no, s.name, COALESCE(a.status,'present') status
                         FROM students s LEFT JOIN attendance a ON a.student_id=s.id AND a.course_id=? AND a.date=?
                         ORDER BY s.roll_no");
    $s->bind_param("is", $cid, $d); $s->execute();
    out($s->get_result()->fetch_all(MYSQLI_ASSOC));
}

if ($m === 'POST') {
    $b = body(); $cid = (int)($b['course_id'] ?? 0); $d = $b['date'] ?? '';
    if (!$cid || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $d)) out(["error" => "Choose a course and a date"], 422);
    $s = $conn->prepare("INSERT INTO attendance(student_id,course_id,date,status) VALUES(?,?,?,?)
                         ON DUPLICATE KEY UPDATE status=VALUES(status)");
    foreach ($b['records'] ?? [] as $r) {
        $sid = (int)$r['student_id']; $st = $r['status'] === 'absent' ? 'absent' : 'present';
        $s->bind_param("iiss", $sid, $cid, $d, $st); $s->execute();
    }
    out(["ok" => true]);
}
