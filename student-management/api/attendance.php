
<?php
require "../config/db.php";
need("admin");

$m = $_SERVER['REQUEST_METHOD'];

/* ---------- attendance summary ---------- */
if ($m === 'GET' && isset($_GET['summary'])) {
    $result = $conn->query(
        "SELECT COUNT(*) AS total_records FROM attendance"
    );

    out($result->fetch_assoc());
}

/* ---------- load attendance ---------- */
if ($m === 'GET') {
    $cid = (int)($_GET['course_id'] ?? 0);
    $d = $_GET['date'] ?? date('Y-m-d');

    $s = $conn->prepare(
        "SELECT s.id, s.roll_no, s.name,
                COALESCE(a.status, 'present') AS status
         FROM students s
         LEFT JOIN attendance a
           ON a.student_id = s.id
          AND a.course_id = ?
          AND a.date = ?
         ORDER BY s.roll_no"
    );

    $s->bind_param("is", $cid, $d);
    $s->execute();

    out($s->get_result()->fetch_all(MYSQLI_ASSOC));
}

/* ---------- save attendance ---------- */
if ($m === 'POST') {
    $b = body();
    $cid = (int)($b['course_id'] ?? 0);
    $d = $b['date'] ?? '';

    if (
        !$cid ||
        !preg_match('/^\d{4}-\d{2}-\d{2}$/', $d)
    ) {
        out(["error" => "Choose a course and a date"], 422);
    }

    $s = $conn->prepare(
        "INSERT INTO attendance
            (student_id, course_id, date, status)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)"
    );

    foreach ($b['records'] ?? [] as $r) {
        $sid = (int)($r['student_id'] ?? 0);
        $st = ($r['status'] ?? '') === 'absent'
            ? 'absent'
            : 'present';

        if (!$sid) {
            continue;
        }

        $s->bind_param("iiss", $sid, $cid, $d, $st);
        $s->execute();
    }

    out(["ok" => true]);
}