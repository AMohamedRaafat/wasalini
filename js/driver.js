$(document).ready(function () {
    // Drawer Toggle
    $("#drawer-toggle").on("click", function () {
        $("#drawer").addClass("active");
        $("#drawer-overlay").addClass("active");
        $("body").css("overflow", "hidden");
    });

    $("#drawer-close, #drawer-overlay").on("click", function () {
        $("#drawer").removeClass("active");
        $("#drawer-overlay").removeClass("active");
        $("body").css("overflow", "auto");
    });

    // Close drawer when clicking on links
    $(".drawer-link").on("click", function () {
        $("#drawer").removeClass("active");
        $("#drawer-overlay").removeClass("active");
        $("body").css("overflow", "auto");
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        var target = $(this.getAttribute("href"));
        if (target.length) {
            $("html, body").animate(
                {
                    scrollTop: target.offset().top - 80,
                },
                800
            );
        }
    });

    // Initialize Features Carousel
    if ($(".features-carousel").length > 0) {
        $(".features-carousel").owlCarousel({
            loop: true,
            margin: 24,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplaySpeed: 800,
            autoplayHoverPause: true,
            touchDrag: true,
            mouseDrag: true,
            pullDrag: true,
            rtl: true,
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 0,
                    nav: false,
                    dots: true,
                },
                768: {
                    items: 1,
                    stagePadding: 80,
                    nav: false,
                    dots: true,
                },
                1024: {
                    items: 3,
                    stagePadding: 0,
                    nav: true,
                    dots: false,
                },
            },
            navText: [
                '<i class="fas fa-chevron-right"></i>',
                '<i class="fas fa-chevron-left"></i>',
            ],
        });
    }

    // Initialize Testimonials Carousel
    if ($(".testimonials-carousel").length > 0) {
        $(".testimonials-carousel").owlCarousel({
            loop: true,
            margin: 24,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplaySpeed: 800,
            autoplayHoverPause: true,
            touchDrag: true,
            mouseDrag: true,
            pullDrag: true,
            rtl: true,
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 0,
                    nav: false,
                    dots: true,
                },
                768: {
                    items: 1,
                    stagePadding: 80,
                    nav: false,
                    dots: true,
                },
                1024: {
                    items: 3,
                    stagePadding: 0,
                    nav: true,
                    dots: false,
                },
            },
            navText: [
                '<i class="fas fa-chevron-right"></i>',
                '<i class="fas fa-chevron-left"></i>',
            ],
        });
    }

    // How It Works Accordion Logic
    $(".how-it-works-card").on("click", function () {
        const $card = $(this);
        const isActive = $card.hasClass("active");
        const hasVideo = $card.data("video-card") === true;

        // Remove active class from all cards
        $(".how-it-works-card").removeClass("active");

        // Toggle active class on clicked card
        if (!isActive) {
            $card.addClass("active");
        }

        // Handle video display
        if (hasVideo) {
            // Mobile video
            $(".video-container.shadow-none").removeClass("active");
            if (!isActive) {
                $(".video-container.shadow-none").addClass("active");
            }
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll(".scroll-animate").forEach(el => {
        observer.observe(el);
    });

    // Footer WhatsApp Link - Get phone number dynamically
    const footerWhatsAppLink = document.getElementById("footer-whatsapp-link");
    const footerPhoneNumber = document.querySelector(".footer-phone-number");

    if (footerWhatsAppLink && footerPhoneNumber) {
        footerWhatsAppLink.addEventListener("click", function (e) {
            e.preventDefault();
            const phoneNumber = footerPhoneNumber.textContent.trim().replace(/\s+/g, "");
            // Add country code 966 for Saudi Arabia if not present
            const fullNumber = phoneNumber.startsWith("966") ? phoneNumber : "966" + phoneNumber;
            const whatsappUrl = `https://wa.me/${fullNumber}`;
            window.open(whatsappUrl, "_blank");
        });
    }
});

