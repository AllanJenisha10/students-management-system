try {
    $conn->begin_transaction();

    $h = password_hash($f['roll_no'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare(
        "INSERT INTO users (username, password, role)
         VALUES (?, ?, 'student')"
    );
    $stmt->bind_param("ss", $f['roll_no'], $h);
    $stmt->execute();

    $uid = $conn->insert_id;

    $stmt = $conn->prepare(
        "INSERT INTO students
        (user_id, roll_no, name, email, phone, department, year)
        VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param(
        "issssss",
        $uid,
        $f['roll_no'],
        $f['name'],
        $f['email'],
        $f['phone'],
        $f['department'],
        $f['year']
    );
    $stmt->execute();

    $conn->commit();

    out(["message" => "Student added successfully"]);

} catch (Throwable $e) {
    if ($conn->errno === 0) {
        // The transaction may already have been rolled back.
    } else {
        $conn->rollback();
    }

    error_log("Add student error: " . $e->getMessage());
    http_response_code(500);
    out(["error" => "Unable to add student. Check the server error log."]);
}
