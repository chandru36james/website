const socialIcons = document.querySelector('.home__social');
const downloadButton = document.querySelector('.home__data .button');
if (socialIcons && downloadButton && !downloadButton.contains(socialIcons)) {
    downloadButton.insertAdjacentElement('afterend', socialIcons);
}

        function toggleMenu() {
            document.querySelector('.nav').classList.toggle('show');
        }

        // Toggle dropdown on click
        document.querySelector(".dropdown-toggle").addEventListener("click", function (event) {
            event.preventDefault();
            this.parentElement.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {
            let dropdown = document.querySelector(".dropdown");
            if (!dropdown.contains(event.target) && !event.target.classList.contains("dropdown-toggle")) {
                dropdown.classList.remove("active");
            }
        });

        // Manage active links
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
            slidesPerView: 1,  // Default: show 4 images at a time
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
                // When the screen width is less than 768px (tablet or mobile view)
                768: {
                    slidesPerView: 4,  // Show only 1 image at a time on mobile
                    spaceBetween: 10,  // Adjust space between slides for mobile
                },
            },
        });

        // Function to animate count up
        function countUp(element) {
            const target = +element.getAttribute('data-target');
            let count = 0;
            const speed = 25; // The speed of the animation (milliseconds per step)

            const interval = setInterval(() => {
                count += 1;
                element.textContent = `${count}+`; // Update the text content

                if (count === target) {
                    clearInterval(interval); // Stop when the target is reached
                }
            }, speed);
        }

        // Set up Intersection Observer to trigger count-up when section is in view
        const options = {
            root: null, // Using the viewport as the root
            threshold: 0.5 // Start counting when 50% of the stats section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counts = entry.target.querySelectorAll('.count');
                    counts.forEach(count => countUp(count));
                    observer.unobserve(entry.target); // Stop observing after the count-up starts
                }
            });
        }, options);

        // Start observing the stats section
        const statsSection = document.querySelector('.stats-section');
        observer.observe(statsSection);

                //preloader
               // Load preloader.html dynamically
fetch("preloader.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("preloader-container").innerHTML = data;

    // Wait for window load to hide preloader
    window.addEventListener("load", () => {
      const loader = document.getElementById("preloader");
      if (loader) {
        loader.classList.add("hide-loader");
      }
    });
  });

