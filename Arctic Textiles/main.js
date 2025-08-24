const socialIcons = document.querySelector('.home__social');
const downloadButton = document.querySelector('.home__data .button');
if (socialIcons && downloadButton && !downloadButton.contains(socialIcons)) {
    downloadButton.insertAdjacentElement('afterend', socialIcons);
}

function toggleMenu() {
    document.querySelector('.nav').classList.toggle('show');
}

// ========== Dropdown + outside click fix ==========
document.addEventListener("click", function (event) {
    const toggle = event.target.closest(".dropdown-toggle");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (toggle) {
        event.preventDefault();
        const dd = toggle.parentElement;
        // close all other dropdowns
        dropdowns.forEach(d => { if (d !== dd) d.classList.remove("active"); });
        dd.classList.toggle("active");
    } else {
        // clicked outside → close all dropdowns
        dropdowns.forEach(d => d.classList.remove("active"));
    }

    // close mobile menu if clicked outside nav and toggle
    const nav = document.querySelector(".nav");
    if (nav && nav.classList.contains("show") &&
        !event.target.closest(".nav") &&
        !event.target.closest(".menu-toggle")) {
        nav.classList.remove("show");
    }
});

// ========== Manage active links ==========
document.querySelectorAll('.nav a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav a').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        document.querySelector('.nav').classList.remove('show');
    });
});

// Highlight active footer link
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.footer-link').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

// Trigger heading animation on page load
window.onload = function() {
    document.querySelector('.animated-heading').classList.add('show-heading');
    // Trigger info section animation on scroll
    const infoSections = document.querySelectorAll('.info-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    infoSections.forEach(section => {
        observer.observe(section);
    });
};

var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    slidesPerView: 1,  // Default
    spaceBetween: 20,  // Space between slides
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 4,  
            spaceBetween: 10,
        },
    },
});

// Function to animate count up
function countUp(element) {
    const target = +element.getAttribute('data-target');
    let count = 0;
    const speed = 25;

    const interval = setInterval(() => {
        count += 1;
        element.textContent = `${count}+`;
        if (count === target) {
            clearInterval(interval);
        }
    }, speed);
}

// Intersection Observer for stats
const options = {
    root: null,
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counts = entry.target.querySelectorAll('.count');
            counts.forEach(count => countUp(count));
            observer.unobserve(entry.target);
        }
    });
}, options);

const statsSection = document.querySelector('.stats-section');
observer.observe(statsSection);

// Preloader
fetch("preloader.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("preloader-container").innerHTML = data;
    window.addEventListener("load", () => {
      const loader = document.getElementById("preloader");
      if (loader) {
        loader.classList.add("hide-loader");
      }
    });
  });
