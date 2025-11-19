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
            target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Initialize Owl Carousel
    $(".owl-carousel").owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        dots: false,
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
                stagePadding: 420,

            },
        },
        rtl: true,
        navText: [
            '', ''
        ],
        onChanged: function (event) {
            updateCarouselBackgrounds(event);
        },
        onInitialized: function (event) {
            updateCarouselBackgrounds(event);
        },
        onTranslated: function (event) {
            updateCarouselBackgrounds(event);
        }
    });

    // Function to update carousel item backgrounds
    function updateCarouselBackgrounds(event) {
        // Use setTimeout to ensure DOM is updated
        setTimeout(function () {
            var $carousel = $(event.target);
            if (!$carousel || $carousel.length === 0) return;

            var $items = $carousel.find('.owl-item');

            // Remove centered class from all cards first
            $items.find('.testimonial-card').removeClass('centered');

            // Check if we're on desktop (1024px+)
            var isDesktop = $(window).width() >= 1024;

            if (isDesktop) {
                // First, try to find item with 'center' class (Owl Carousel adds this)
                var $centerItem = $items.filter('.center');

                // If no center class, find the item closest to viewport center
                if ($centerItem.length === 0) {
                    var $stageOuter = $carousel.find('.owl-stage-outer');

                    if ($stageOuter.length > 0) {
                        var stageOuterWidth = $stageOuter.width();
                        var stageOuterOffset = $stageOuter.offset();

                        if (stageOuterOffset) {
                            var centerX = stageOuterOffset.left + (stageOuterWidth / 2);
                            var minDistance = Infinity;

                            // Check all items, not just active ones
                            $items.each(function () {
                                var $item = $(this);
                                var itemOffset = $item.offset();

                                if (itemOffset) {
                                    var itemWidth = $item.width();
                                    var itemCenterX = itemOffset.left + (itemWidth / 2);
                                    var distance = Math.abs(centerX - itemCenterX);

                                    if (distance < minDistance) {
                                        minDistance = distance;
                                        $centerItem = $item;
                                    }
                                }
                            });
                        }
                    }
                }

                // Apply centered class to the centered item
                if ($centerItem && $centerItem.length > 0) {
                    var $centerCard = $centerItem.find('.testimonial-card');
                    if ($centerCard.length > 0) {
                        $centerCard.addClass('centered');
                    }
                }
            }
        }, 100);
    }

    // Update backgrounds on window resize (for responsive changes)
    $(window).on('resize', function () {
        $('.owl-carousel').each(function () {
            var event = { target: this };
            updateCarouselBackgrounds(event);
        });
    });

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
                
                setTimeout(function() {
                    $desktopContainer.removeClass("exiting active");
                    $desktopContainer.find("video").attr("src", desktopVideoSrc);
                    $desktopContainer.find("video")[0].load();
                    
                    setTimeout(function() {
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
                
                setTimeout(function() {
                    $mobileContainer.removeClass("exiting active");
                    $mobileContainer.find("video").attr("src", mobileVideoSrc);
                    $mobileContainer.find("video")[0].load();
                    
                    setTimeout(function() {
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

    // Handle window resize for responsive behavior
    $(window).resize(function() {
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
});

