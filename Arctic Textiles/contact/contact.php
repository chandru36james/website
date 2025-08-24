<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<?php
// Database config
$host = "localhost";
$username = "u760482133_info_arctictex";
$password = "Arctic@1204";
$dbname   = "u760482133_arct_contact";

// Create DB connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check DB connection
if ($conn->connect_error) {
    die("<script>alert('Database connection failed.'); history.back();</script>");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST["phone"] ?? ''));
    $message = htmlspecialchars(trim($_POST["message"] ?? ''));

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        echo "<script>alert('❌ Please fill in all required fields.'); history.back();</script>";
        exit;
    }

    // ✅ 1. STORE in DATABASE
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        echo "<script>alert('Failed to prepare database query.'); history.back();</script>";
        exit;
    }
    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    if (!$stmt->execute()) {
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
        echo "<script>alert('✅ Message stored in database, but email failed.'); history.back();</script>";
    }

    $stmt->close();

} else {
    echo "<script>alert('❌ Invalid request.'); history.back();</script>";
}

// Close DB connection
$conn->close();
?>
