<?php
// Enable error reporting during development
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Sanitize input
    $name    = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone   = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

   /* // 2. Validate input
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        die("❌ All fields are required.");
    }
*/
    // 3. Send Email
   $to = "bloomgreendevelopers@gmail.com";  // ✅ Replace with your actual email
    $subject = "New Contact Form Message";

    $email_content = "You received a new message:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: Website Contact <noreply@yourdomain.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $mail_sent = mail($to, $subject, $email_content, $headers);

    // 4. Save to MySQL
   $conn = new mysqli("localhost", "u482445331_arctictex", "Arctic@1204", "u482445331_john");
    if ($conn->connect_error) {
        die("❌ DB connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("ssss", $name, $email, $phone, $message);
        $stmt->execute();
        $stmt->close();
    }

    $conn->close();

    // 5. Show feedback or redirect
    if ($mail_sent) {
        echo "<script>alert('✅ Message sent successfully!'); window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('⚠️ Mail failed, but message was saved.'); window.location.href = 'index.html';</script>";
    }
} else {
    echo "<script>alert('Invalid request.'); history.back();</script>";
}
?>
