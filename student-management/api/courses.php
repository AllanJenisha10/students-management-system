<?php
require "../config/db.php";
need();
$m = $_SERVER['REQUEST_METHOD'];
if ($m === 'GET') out($conn->query("SELECT id,course_code,course_name FROM courses ORDER BY course_code")->fetch_all(MYSQLI_ASSOC));
need("admin");
if ($m === 'POST') {
    $b = body(); $c = trim($b['course_code'] ?? ''); $n = trim($b['course_name'] ?? '');
    if ($c === '' || $n === '') out(["error" => "Course code and name are required"], 422);
    try {
        $s = $conn->prepare("INSERT INTO courses(course_code,course_name) VALUES(?,?)");
        $s->bind_param("ss", $c, $n); $s->execute();
        out(["ok" => true], 201);
    } catch (Exception $e) { out(["error" => "That course code already exists"], 409); }
}
if ($m === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $s = $conn->prepare("DELETE FROM courses WHERE id=?");
    $s->bind_param("i", $id); $s->execute();
    out(["ok" => true]);
}
