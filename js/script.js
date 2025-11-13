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
                items: 1,
            },
            1024: {
                items: 1,
                stagePadding: 200,

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

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll(".scroll-animate").forEach(el => {
        observer.observe(el);
    });

    // Registration Modal Functionality
    const signupBtn = $("#signup-btn");
    const registrationOverlay = $("#registration-overlay");
    const registrationModal = $("#registration-modal");
    const closeRegistration = $("#close-registration");
    const registrationForm = $("#registration-form");
    const phoneInput = $("#phone-number");
    const phoneError = $("#phone-error");
    const citySelect = $("#city");
    const cityError = $("#city-error");

    const successOverlay = $("#success-overlay");
    const successModal = $("#success-modal");
    const closeSuccess = $("#close-success");

    // Open registration modal
    signupBtn.on("click", function () {
        registrationOverlay.addClass("active");
        $("body").css("overflow", "hidden");
    });

    // Close registration modal
    closeRegistration.on("click", function () {
        registrationOverlay.removeClass("active");
        $("body").css("overflow", "auto");
        registrationForm[0].reset();
        phoneError.text("");
        cityError.text("");
    });

    // Close registration modal when clicking overlay
    registrationOverlay.on("click", function (e) {
        if ($(e.target).is(registrationOverlay)) {
            registrationOverlay.removeClass("active");
            $("body").css("overflow", "auto");
            registrationForm[0].reset();
            phoneError.text("");
            cityError.text("");
        }
    });

    // Close success modal
    closeSuccess.on("click", function () {
        successOverlay.removeClass("active");
        $("body").css("overflow", "auto");
    });

    // Close success modal when clicking overlay
    successOverlay.on("click", function (e) {
        if ($(e.target).is(successOverlay)) {
            successOverlay.removeClass("active");
            $("body").css("overflow", "auto");
        }
    });

    // Phone number validation - only allow numbers, no formatting, with real-time validation
    phoneInput.on("input", function () {
        let value = $(this).val();
        // Remove any non-digit characters
        value = value.replace(/\D/g, "");

        // Limit to 9 digits
        if (value.length > 9) {
            value = value.substring(0, 9);
        }
        // Set value without any formatting/spaces - plain text
        $(this).val(value);

        // Real-time validation
        if (value.length === 0) {
            phoneError.text("");
        } else if (value.length > 0 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        } else if (value.length > 0 && value.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
        } else if (value.length === 9 && value[0] === "5") {
            phoneError.text("");
        }
    });

    // Phone number validation on blur (additional check)
    phoneInput.on("blur", function () {
        let value = $(this).val().replace(/\s/g, "");
        if (value.length > 0 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        } else if (value.length > 0 && value.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
        } else if (value.length === 9 && value[0] === "5") {
            phoneError.text("");
        } else if (value.length === 9 && value[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
        }
    });

    // Form submission
    registrationForm.on("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        let phoneValue = phoneInput.val().replace(/\s/g, "");
        let cityValue = citySelect.val();

        // Validate phone number
        if (phoneValue.length === 0) {
            phoneError.text("يرجى إدخال رقم الهاتف");
            isValid = false;
        } else if (phoneValue[0] !== "5") {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
            isValid = false;
        } else if (phoneValue.length < 9) {
            phoneError.text("رقم الهاتف يجب أن يكون 9 أرقام");
            isValid = false;
        } else if (phoneValue.length === 9 && phoneValue[0] === "5") {
            phoneError.text("");
        } else {
            phoneError.text("رقم الهاتف السعودي يجب أن يبدأ بـ 5");
            isValid = false;
        }

        // City is optional, no validation needed

        if (isValid) {
            // Close registration modal
            registrationOverlay.removeClass("active");

            // Small delay for smooth transition
            setTimeout(function () {
                // Open success modal
                successOverlay.addClass("active");
            }, 300);
        }
    });
});

