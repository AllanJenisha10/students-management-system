<?php
require "../config/db.php";
need("admin");
$m = $_SERVER['REQUEST_METHOD'];

if ($m === 'GET') {
    $q = '%' . ($_GET['q'] ?? '') . '%';
    $s = $conn->prepare("SELECT id,roll_no,name,email,phone,department,year FROM students WHERE name LIKE ? OR roll_no LIKE ? ORDER BY roll_no");
    $s->bind_param("ss", $q, $q); $s->execute();
    out($s->get_result()->fetch_all(MYSQLI_ASSOC));
}

if ($m === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $s = $conn->prepare("DELETE FROM users WHERE id=(SELECT user_id FROM students WHERE id=?)");
    $s->bind_param("i", $id); $s->execute();
    out(["ok" => true]);
}

$f = array_map('trim', array_merge(["id" => 0, "roll_no" => "", "name" => "", "email" => "", "phone" => "", "department" => "", "year" => "1"], array_map('strval', body())));
if ($f['roll_no'] === '' || $f['name'] === '') out(["error" => "Roll number and name are required"], 422);
if ($f['email'] !== '' && !filter_var($f['email'], FILTER_VALIDATE_EMAIL)) out(["error" => "Enter a valid email"], 422);

if ($m === 'POST') {
    $conn->begin_transaction();
    try {
        $h = password_hash($f['roll_no'], PASSWORD_DEFAULT);   // first password = roll number
        $s = $conn->prepare("INSERT INTO users(username,password,role) VALUES(?,?,'student')");
        $s->bind_param("ss", $f['roll_no'], $h); $s->execute();
        $uid = $conn->insert_id;
        $s = $conn->prepare("INSERT INTO students(user_id,roll_no,name,email,phone,department,year) VALUES(?,?,?,?,?,?,?)");
        $s->bind_param("issssss", $uid, $f['roll_no'], $f['name'], $f['email'], $f['phone'], $f['department'], $f['year']);
        $s->execute();
        $conn->commit();
        out(["ok" => true], 201);
    } catch (Exception $e) {
        $conn->rollback();
        out(["error" => "That roll number already exists"], 409);
    }
}

if ($m === 'PUT') {
    $s = $conn->prepare("UPDATE students SET name=?,email=?,phone=?,department=?,year=? WHERE id=?");
    $s->bind_param("sssssi", $f['name'], $f['email'], $f['phone'], $f['department'], $f['year'], $f['id']);
    $s->execute();
    out(["ok" => true]);
}
