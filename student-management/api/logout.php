<?php
require "../config/db.php";
session_destroy();
out(["ok" => true]);
