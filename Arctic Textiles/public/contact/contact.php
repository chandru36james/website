<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // ❌ Don’t show errors to visitors
ini_set('log_errors', 1);     // ✅ Enable logging
ini_set('error_log', __DIR__ . '/../../logs/contact_errors.log'); // Save logs outside public_html

// Load database config securely
$db_config = require __DIR__ . '/../../config.php';

// Create DB connection
$conn = new mysqli(
    $db_config['host'],
    $db_config['username'],
    $db_config['password'],
    $db_config['dbname']
);

// Check DB connection
if ($conn->connect_error) {
    error_log("DB Connection Failed: " . $conn->connect_error);
    die("<script>alert('Database connection failed. Please try again later.'); history.back();</script>");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST["phone"] ?? ''));
    $message = htmlspecialchars(trim($_POST["message"] ?? ''));

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        error_log("Validation Failed: Missing fields. Data: " . json_encode($_POST));
        echo "<script>alert('❌ Please fill in all required fields.'); history.back();</script>";
        exit;
    }

    // ✅ 1. STORE in DATABASE
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        error_log("Prepare Failed: " . $conn->error);
        echo "<script>alert('Failed to prepare database query.'); history.back();</script>";
        exit;
    }
    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    if (!$stmt->execute()) {
        error_log("DB Insert Failed: " . $stmt->error);
        echo "<script>alert('❌ Failed to store in database.'); history.back();</script>";
        exit;
    }

    // ✅ 2. SEND EMAIL
    $to      = "info@arctictextiles.com";  
    $subject = "New Message from Arctic Textiles Website";

    $email_content  = "You have received a new message:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "\nMessage:\n$message\n";

    $headers  = "From: Arctic Website <noreply@arctictextiles.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        echo "<script>alert('✅ Thank you! Your message has been sent & stored.'); window.location.href = 'https://arctictextiles.com/';</script>";
    } else {
        error_log("Mail Failed: Could not send email for $email");
        echo "<script>alert('✅ Message stored in database, but email failed.'); history.back();</script>";
    }

    $stmt->close();

} else {
    error_log("Invalid Request: " . $_SERVER['REQUEST_METHOD']);
    echo "<script>alert('❌ Invalid request.'); history.back();</script>";
}

// Close DB connection
$conn->close();
