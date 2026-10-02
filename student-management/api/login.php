<?php
require "../config/db.php";
$b = body();
$name = trim($b['username'] ?? '');
$s = $conn->prepare("SELECT id,username,password,role FROM users WHERE username=?");
$s->bind_param("s", $name); $s->execute();
$u = $s->get_result()->fetch_assoc();
if (!$u || !password_verify($b['password'] ?? '', $u['password'])) out(["error" => "Wrong username or password"], 401);
session_regenerate_id(true);
$_SESSION['user'] = ["id" => $u['id'], "username" => $u['username'], "role" => $u['role']];
out(["role" => $u['role']]);
