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

    // Close drawer when clicking on the language switcher inside drawer
    $(".drawer .drawer-lang-switcher a").on("click", function () {
        $("#drawer").removeClass("active");
        $("#drawer-overlay").removeClass("active");
        $("body").css("overflow", "auto");
        // allow the link to navigate normally
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

    // How It Works Card Accordion with Dynamic Video Switching
    $(".how-it-works-card").on("click", function () {
        const $clickedCard = $(this);
        const isActive = $clickedCard.hasClass("active");
        const hasVideo = $clickedCard.data("video-card") === true;
        const videoSrc = $clickedCard.data("video");
        const mobileVideoSrc = $clickedCard.data("mobile-video");

        if (isActive) {
            // Card was active - deactivate it and hide videos
            $clickedCard.removeClass("active");
            hideAllVideos();
        } else {
            // Card was not active - activate it and show videos
            // Remove active class from all other cards first
            $(".how-it-works-card").removeClass("active");
            $clickedCard.addClass("active");

            // Handle video switching if card has video
            if (hasVideo) {
                handleVideoSwitching($clickedCard, videoSrc, mobileVideoSrc);
            }
        }
    });

    // Handle video switching for both desktop and mobile
    function handleVideoSwitching($item, desktopVideoSrc, mobileVideoSrc) {
        const $desktopContainer = $("#main-video-container");
        const isDesktop = window.innerWidth >= 768;
        const cardId = $item.attr('id');
        const $mobileContainer = $(`.mobile-video-container[data-video-for="${cardId}"]`);

        if (isDesktop) {
            // Desktop video handling
            if ($desktopContainer.hasClass("active")) {
                // Add exit animation
                $desktopContainer.addClass("exiting");

                setTimeout(function () {
                    $desktopContainer.removeClass("exiting active");
                    $desktopContainer.find("video").attr("src", desktopVideoSrc);
                    $desktopContainer.find("video")[0].load();

                    setTimeout(function () {
                        $desktopContainer.addClass("active");
                    }, 100);
                }, 500);
            } else {
                // First time loading - hide all mobile videos and show desktop
                $(".mobile-video-container").removeClass("active");
                $desktopContainer.find("video").attr("src", desktopVideoSrc);
                $desktopContainer.addClass("active");
            }
        } else {
            // Mobile video handling - show only the video for this specific card
            // Hide all other mobile videos first
            $(".mobile-video-container").removeClass("active");

            if ($mobileContainer.hasClass("active")) {
                // Add exit animation
                $mobileContainer.addClass("exiting");

                setTimeout(function () {
                    $mobileContainer.removeClass("exiting active");
                    $mobileContainer.find("video").attr("src", mobileVideoSrc);
                    $mobileContainer.find("video")[0].load();

                    setTimeout(function () {
                        $mobileContainer.addClass("active");
                    }, 100);
                }, 500);
            } else {
                // First time loading - hide desktop and show this mobile video
                $desktopContainer.removeClass("active");
                $mobileContainer.find("video").attr("src", mobileVideoSrc);
                $mobileContainer.addClass("active");
            }
        }
    }

    // Hide all videos
    function hideAllVideos() {
        $("#main-video-container").removeClass("active");
        $(".mobile-video-container").removeClass("active");
    }

    // Handle window resize for responsive behavior
    $(window).resize(function () {
        const width = window.innerWidth;
        const $desktopContainer = $("#main-video-container");
        const $mobileContainer = $(".mobile-video-container");
        const activeItem = $(".how-it-works-card.active");

        if (width >= 768 && activeItem.length) {
            // Switch to desktop view
            const desktopVideoSrc = activeItem.data("video");
            if (desktopVideoSrc) {
                // Hide mobile video
                $mobileContainer.removeClass("active");
                // Show desktop video with proper source
                $desktopContainer.find("video").attr("src", desktopVideoSrc);
                $desktopContainer.addClass("active");
            }
        } else if (width < 768 && activeItem.length) {
            // Switch to mobile view
            const mobileVideoSrc = activeItem.data("mobile-video");
            if (mobileVideoSrc) {
                // Hide desktop video
                $desktopContainer.removeClass("active");
                // Show mobile video with proper source
                $mobileContainer.find("video").attr("src", mobileVideoSrc);
                $mobileContainer.addClass("active");
            }
        }
    });

    // Initialize video visibility on page load
    const $initialActiveCard = $(".how-it-works-card.active");
    if ($initialActiveCard.length && $initialActiveCard.data("video-card") === true) {
        const desktopVideoSrc = $initialActiveCard.data("video");
        const mobileVideoSrc = $initialActiveCard.data("mobile-video");
        const isDesktop = window.innerWidth >= 768;

        if (isDesktop) {
            // Show desktop video
            $("#main-video-container").find("video").attr("src", desktopVideoSrc);
            $("#main-video-container").addClass("active");
        } else {
            // Show mobile video
            const cardId = $initialActiveCard.attr('id');
            const $mobileContainer = $(`.mobile-video-container[data-video-for="${cardId}"]`);
            $mobileContainer.find("video").attr("src", mobileVideoSrc);
            $mobileContainer.addClass("active");
        }
    }

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

