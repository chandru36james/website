// ✅ AOS initialization (optional if you add AOS again)
// swiper function

  $(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:1,
        itemsDesktop:[1000,1],
        itemsDesktopSmall:[990,1],
        itemsTablet:[768,1],
        itemsMobile:[650,1],
        pagination:true,
        navigation:false,
        autoPlay:2000
    });
});



// ✅ ScrollReveal Animations
ScrollReveal().reveal(".section-title", { distance: "50px", origin: "top", duration: 1000 });
ScrollReveal().reveal(".section-subtitle", { distance: "50px", origin: "bottom", duration: 1000, delay: 200 });
ScrollReveal().reveal(".project-item", { interval: 100, origin: "bottom", distance: "30px", duration: 800 });
ScrollReveal().reveal(".choose__card", { interval: 100, origin: "bottom", distance: "30px", duration: 800 });
ScrollReveal().reveal(".testimonial__card", { interval: 200, origin: "bottom", distance: "40px", duration: 900 });

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.querySelector("nav.nav");
  const menuIcon = menuBtn.querySelector("i");

  if (menuBtn && nav && menuIcon) {
    // Toggle menu open/close on menu button click
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from bubbling up to document
      nav.classList.toggle("open");
      menuIcon.className = nav.classList.contains("open") ? "ri-close-line" : "ri-menu-line";
    });

    // Close menu when clicking any nav link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuIcon.className = "ri-menu-line";
      });
    });

    // Prevent clicks inside nav from closing menu
    nav.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close menu if clicking anywhere else on the document
    document.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuIcon.className = "ri-menu-line";
      }
    });
  }



  // Target the modal background (not the form)
  const modalBg = document.querySelector(".modal-bg");
  const form = modalBg.querySelector("form");
  const closeBtn = document.getElementById("closeModal");

  // Buttons that open the modal
  const openButtons = document.querySelectorAll("#getQuoteBtn, #openModal");
  openButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      modalBg.classList.add("active");
    });
  });

  // Close modal with close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modalBg.classList.remove("active");
    });
  }

  // Close modal by clicking outside the modal content
  window.addEventListener("click", e => {
    if (e.target === modalBg) {
      modalBg.classList.remove("active");
    }
  });

  /*// Handle form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you! Your quote request has been submitted.");
      modalBg.classList.remove("active");
      form.reset();
    });
  }*/

  // ✅ Smooth Scroll for internal nav links
  document.querySelectorAll(".scroll-link").forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }

        nav?.classList.remove("open");
        menuIcon?.setAttribute("class", "ri-menu-line");
      }
    });
  });

  

  // ✅ Counter Animation for Stats Section
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".count").forEach(countUp);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  function countUp(element) {
    const target = +element.getAttribute("data-target");
    let count = 0;
    const speed = 50;
    const interval = setInterval(() => {
      count += 1;
      element.textContent = `${count}+`;
      if (count === target) clearInterval(interval);
    }, speed);
  }
});


