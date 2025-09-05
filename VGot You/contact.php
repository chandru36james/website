<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // ❌ Don’t show errors to visitors
ini_set('log_errors', 1);     // ✅ Enable logging
ini_set('error_log', __DIR__ . '/../../errors.log'); // Log errors outside public_html

// Load DB config
$db_config = require __DIR__ . '/../../config.php';

// Create DB connection
$conn = new mysqli(
    $db_config['host'],
    $db_config['username'],
    $db_config['password'],
    $db_config['dbname']
);

header("Content-Type: application/json"); // 👈 Always return JSON

if ($conn->connect_error) {
    error_log("DB Connection Failed: " . $conn->connect_error);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// ✅ Support JSON input (from React fetch)
$input = json_decode(file_get_contents("php://input"), true);
if ($input) {
    $_POST = $input;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST["phone"] ?? ''));
    $message = htmlspecialchars(trim($_POST["message"] ?? ''));

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "message" => "❌ Missing required fields"]);
        exit;
    }

    // ✅ 1. STORE in DATABASE
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        error_log("Prepare Failed: " . $conn->error);
        echo json_encode(["success" => false, "message" => "Database query failed"]);
        exit;
    }
    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    if (!$stmt->execute()) {
        error_log("DB Insert Failed: " . $stmt->error);
        echo json_encode(["success" => false, "message" => "Database insert failed"]);
        exit;
    }

    // ✅ 2. SEND EMAIL
    $to      = "info@vgotyou.com";  
    $subject = "New Message from VGot You Website";
    $email_content  = "You have received a new message:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "\nMessage:\n$message\n";

    $headers  = "From: VGot You Website <noreply@vgotyou.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["success" => true, "message" => "✅ Thank you! Your message has been sent & stored."]);
    } else {
        error_log("Mail Failed: Could not send email for $email");
        echo json_encode(["success" => false, "message" => "Message stored, but email failed"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "❌ Invalid request"]);
}

// Close DB connection
$conn->close();
