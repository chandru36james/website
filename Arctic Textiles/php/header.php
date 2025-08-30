<?php 
// includes/header.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $pageTitle ?? "Arctic Textiles" ?></title>
  <link rel="stylesheet" href="/style.css?v=1.0">
  <link rel="icon" href="/assets/logo/favicon.png" type="image/png">
</head>
<body>

<header class="header">
  <div class="logo">
      <img src="/assets/logo/footer logo.png" alt="Company Logo">
      <a href="/" class="logo-text" style="text-decoration: none;">Arctic Textiles</a>
  </div>

  <div class="menu-icon" onclick="toggleMenu()">
      <span class="material-symbols-sharp">menu</span>
  </div>

  <nav class="nav">
      <a href="/" class="<?= ($activePage == 'home') ? 'active' : '' ?>">Home</a>
      <a href="/about-us.php" class="<?= ($activePage == 'about') ? 'active' : '' ?>">About Us</a>
      
      <div class="dropdown">
        <a href="#" class="dropdown-toggle">Category <i class="ri-arrow-down-s-line"></i></a>
        <div class="dropdown-content">
          <a href="/home-textiles.php">Home Textiles</a>
          <a href="/baby-products.php">Baby Products</a>
          <a href="/moms-care.php">Moms Care</a>
          <a href="/yoga.php">Yoga</a>
          <a href="/leather-products.php">Leather Products</a>
        </div>
      </div>

      <a href="/service.php" class="<?= ($activePage == 'service') ? 'active' : '' ?>">Service</a>
      <a href="/contact.php" class="<?= ($activePage == 'contact') ? 'active' : '' ?>">Contact Us</a>
  </nav>
</header>
