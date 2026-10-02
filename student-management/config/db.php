<?php
// Shared setup: session, JSON headers, DB connection and helper functions.
session_start();
header('Content-Type: application/json');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli("localhost", "root", "", "student_db");
    $conn->set_charset("utf8mb4");
} catch (Exception $e) {
    http_response_code(500);
    die(json_encode(["error" => "Database connection failed. Is MySQL running and student_db imported?"]));
}

function out($data, $code = 200) { http_response_code($code); echo json_encode($data); exit; }
function body() { return json_decode(file_get_contents("php://input"), true) ?? []; }
function need($role = null) {
    if (empty($_SESSION['user'])) out(["error" => "Please log in"], 401);
    if ($role && $_SESSION['user']['role'] !== $role) out(["error" => "Not allowed"], 403);
}
