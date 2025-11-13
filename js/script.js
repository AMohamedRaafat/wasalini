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

    // Initialize Owl Carousel
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1024: {
                items: 3,
            },
        },
        rtl: true,
        navText: [
            '<i class="fas fa-chevron-right"></i>',
            '<i class="fas fa-chevron-left"></i>',
        ],
    });

    // How It Works Card Accordion
    $(".how-it-works-card").on("click", function () {
        var $clickedCard = $(this);
        var isActive = $clickedCard.hasClass("active");
        var hasVideo = $clickedCard.data("video-card") === true;

        // Remove active class from all cards
        $(".how-it-works-card").removeClass("active");

        // If the clicked card wasn't active, make it active (toggle behavior)
        if (!isActive) {
            $clickedCard.addClass("active");
        }

        // Show/hide video based on which card is active
        if (!isActive && hasVideo) {
            $(".video-container").addClass("active");
        } else {
            $(".video-container").removeClass("active");
        }
    });

    // Initialize video visibility on page load
    if ($(".how-it-works-card.active").data("video-card") === true) {
        $(".video-container").addClass("active");
    }
});

