document.addEventListener("DOMContentLoaded", function () {
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 950,
                easing: "ease-out-cubic",
                once: true,
                offset: 70,
                delay: 0,
                disable: "mobile"
            });

            // Refresh AOS positions after page assets load.
            window.addEventListener("load", function () {
                AOS.refresh();
            });
        }
    });

/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   NAVIGATION + HERO VIDEO SLIDER
========================================== */

(function () {
    "use strict";

    const body = document.body;

    const header = document.getElementById(
        "stacklyConsultHeader"
    );

    const menuToggle = document.getElementById(
        "stacklyConsultMenuToggle"
    );

    const menuClose = document.getElementById(
        "stacklyConsultMenuClose"
    );

    const mobileMenu = document.getElementById(
        "stacklyConsultMobileMenu"
    );

    const overlay = document.getElementById(
        "stacklyConsultOverlay"
    );

    const mobileLinks = document.querySelectorAll(
        ".stackly-consult-mobile-nav a"
    );

    const videos = Array.from(
        document.querySelectorAll(".stackly-consult-video")
    );

    const slideNumber = document.getElementById(
        "stacklyConsultSlideNumber"
    );

    const slideProgress = document.getElementById(
        "stacklyConsultSlideProgress"
    );

    let currentSlide = 0;
    let rotationTimer = null;
    let progressFrame = null;
    let slideStartedAt = 0;

    const SLIDE_DURATION = 7000;
    const TRANSITION_DURATION = 900;

    let menuIsOpen = false;

    /* ======================================
       MOBILE MENU
    ====================================== */

    function openMenu() {
        if (!mobileMenu || menuIsOpen) return;

        menuIsOpen = true;

        body.classList.add("stackly-consult-menu-active");

        menuToggle.setAttribute("aria-expanded", "true");

        mobileMenu.setAttribute("aria-hidden", "false");
        mobileMenu.inert = false;

        menuClose.focus();

        stopVideoRotation();
    }

    function closeMenu(returnFocus = true) {
        if (!mobileMenu || !menuIsOpen) return;

        menuIsOpen = false;

        body.classList.remove("stackly-consult-menu-active");

        menuToggle.setAttribute("aria-expanded", "false");

        mobileMenu.setAttribute("aria-hidden", "true");
        mobileMenu.inert = true;

        if (returnFocus) {
            menuToggle.focus();
        }

        startVideoRotation();
    }

    if (menuToggle && menuClose && mobileMenu && overlay) {
        menuToggle.addEventListener("click", openMenu);

        menuClose.addEventListener("click", function () {
            closeMenu();
        });

        overlay.addEventListener("click", function () {
            closeMenu();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && menuIsOpen) {
                closeMenu();
            }
        });

        mobileLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu(false);
            });
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 850 && menuIsOpen) {
                closeMenu(false);
            }
        });
    }

    /* ======================================
       HEADER SCROLL EFFECT
    ====================================== */

    function updateHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    /* ======================================
       VIDEO SLIDER
    ====================================== */

    function updateProgress() {
        if (progressFrame) {
            cancelAnimationFrame(progressFrame);
            progressFrame = null;
        }

        if (!slideProgress) return;

        slideProgress.style.transition = "none";
        slideProgress.style.width = "0%";

        requestAnimationFrame(function () {
            slideProgress.style.transition =
                "width " + SLIDE_DURATION + "ms linear";

            slideProgress.style.width = "100%";
        });
    }

    function stopVideoRotation() {
        if (rotationTimer) {
            clearTimeout(rotationTimer);
            rotationTimer = null;
        }

        if (progressFrame) {
            cancelAnimationFrame(progressFrame);
            progressFrame = null;
        }

        if (slideProgress) {
            slideProgress.style.transition = "none";
        }
    }

    function showSlide(index) {
        if (!videos.length) return;

        currentSlide = (index + videos.length) % videos.length;

        videos.forEach(function (video, videoIndex) {
            const isActive = videoIndex === currentSlide;

            video.classList.toggle("active", isActive);

            if (isActive) {
                video.currentTime = 0;

                const playPromise = video.play();

                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(function () {
                        /* A video may fail if its file is missing. */
                    });
                }
            } else {
                video.pause();
            }
        });

        if (slideNumber) {
            slideNumber.textContent = String(
                currentSlide + 1
            ).padStart(2, "0");
        }

        slideStartedAt = performance.now();

        updateProgress();
    }

    function startVideoRotation() {
        stopVideoRotation();

        if (
            document.hidden ||
            menuIsOpen ||
            videos.length < 2
        ) {
            return;
        }

        rotationTimer = setTimeout(function () {
            showSlide(currentSlide + 1);
            startVideoRotation();
        }, SLIDE_DURATION);
    }

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopVideoRotation();

            videos.forEach(function (video) {
                video.pause();
            });
        } else {
            const activeVideo = videos[currentSlide];

            if (activeVideo && !menuIsOpen) {
                const playPromise = activeVideo.play();

                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(function () {});
                }
            }

            startVideoRotation();
        }
    });

    if (videos.length) {
        videos.forEach(function (video) {
            video.muted = true;
            video.playsInline = true;
        });

        showSlide(0);
        startVideoRotation();
    }

    /* ======================================
       CLEANUP
    ====================================== */

    window.addEventListener("pagehide", function () {
        stopVideoRotation();

        videos.forEach(function (video) {
            video.pause();
        });
    });

})();


/* ============================================
   CORPORATE CONSULTANCY - TEAM CAROUSEL
   One Card Per Click + Infinite Loop
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    // Initialize AOS animations
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            once: true,
            offset: 65,
            easing: "ease-out-cubic",
            anchorPlacement: "top-bottom"
        });
    }

    const carousel = document.querySelector(".consult-team-carousel");

    if (!carousel) return;

    const viewport = carousel.querySelector(".consult-team-viewport");
    const track = carousel.querySelector(".consult-team-track");
    const prevButton = carousel.querySelector(".team-prev");
    const nextButton = carousel.querySelector(".team-next");

    if (!viewport || !track || !prevButton || !nextButton) return;

    let isAnimating = false;

    // Calculate one card width plus the gap
    function getStepSize() {
        const firstCard = track.querySelector(".consult-team-card");

        if (!firstCard) return 0;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap) || 0;

        return cardWidth + gap;
    }

    function setButtonsDisabled(disabled) {
        prevButton.disabled = disabled;
        nextButton.disabled = disabled;
    }

    // Move forward by exactly one card
    function moveNext() {
        if (isAnimating || track.children.length < 2) return;

        const step = getStepSize();

        if (!step) return;

        isAnimating = true;
        setButtonsDisabled(true);

        track.style.transition = "transform 0.45s ease";
        track.style.transform = `translateX(-${step}px)`;

        track.addEventListener("transitionend", function handleNext(event) {

            if (event.target !== track || event.propertyName !== "transform") {
                return;
            }

            track.removeEventListener("transitionend", handleNext);

            // Place the first card at the end
            track.appendChild(track.firstElementChild);

            // Reset the position without a visible jump
            track.style.transition = "none";
            track.style.transform = "translateX(0)";

            // Force browser layout before enabling the next movement
            track.offsetHeight;

            isAnimating = false;
            setButtonsDisabled(false);

        });
    }

    // Move backward by exactly one card
    function movePrevious() {
        if (isAnimating || track.children.length < 2) return;

        const step = getStepSize();

        if (!step) return;

        isAnimating = true;
        setButtonsDisabled(true);

        // Put the last card at the beginning
        track.style.transition = "none";
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transform = `translateX(-${step}px)`;

        // Apply the starting position before animating
        track.offsetHeight;

        requestAnimationFrame(function () {

            track.style.transition = "transform 0.45s ease";
            track.style.transform = "translateX(0)";

            track.addEventListener("transitionend", function handlePrevious(event) {

                if (
                    event.target !== track ||
                    event.propertyName !== "transform"
                ) {
                    return;
                }

                track.removeEventListener("transitionend", handlePrevious);

                track.style.transition = "none";
                track.style.transform = "translateX(0)";

                track.offsetHeight;

                isAnimating = false;
                setButtonsDisabled(false);

            });

        });
    }

    // Arrow click events
    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", movePrevious);

    // Keep carousel positioning correct after resizing
    let resizeFrame;

    window.addEventListener("resize", function () {
        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(function () {
            if (!isAnimating) {
                track.style.transition = "none";
                track.style.transform = "translateX(0)";
            }
        });
    });

    // Profile popup elements
    const modal = document.getElementById("consultTeamModal");
    const modalName = document.getElementById("consultTeamModalName");
    const modalRole = document.getElementById("consultTeamModalRole");
    const closeButton = modal
        ? modal.querySelector(".consult-team-modal-close")
        : null;

    let previousFocus = null;

    // Event delegation supports cards after carousel movement
    track.addEventListener("click", function (event) {
        const plusButton = event.target.closest(".consult-team-plus");

        if (!plusButton || !modal) return;

        previousFocus = plusButton;

        modalName.textContent = plusButton.dataset.name || "Team Member";
        modalRole.textContent = plusButton.dataset.role || "Consultant";

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (closeButton) closeButton.focus();
    });

    function closeModal() {
        if (!modal) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (previousFocus) previousFocus.focus();
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    // Close by clicking the backdrop
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Close popup using Escape
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }
    });

});



/* ============================================
   CORPORATE CONSULTANCY - PRICING INTERACTIONS
   AOS + PLAN SELECTION MODAL + 404 REDIRECT
============================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       INITIALIZE AOS ANIMATIONS
    ========================================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 60,
            easing: "ease-out-cubic",
            anchorPlacement: "top-bottom"
        });
    }

    /* =========================================
       SELECT ELEMENTS
    ========================================= */

    const pricingSection = document.querySelector(
        ".consult-pricing"
    );

    const modal = document.getElementById(
        "consultPricingModal"
    );

    if (!pricingSection || !modal) {
        return;
    }

    const planButtons = pricingSection.querySelectorAll(
        ".consult-price-button"
    );

    const closeButton = modal.querySelector(
        ".consult-pricing-modal-close"
    );

    const selectedPlan = document.getElementById(
        "consultSelectedPlan"
    );

    const selectedPrice = document.getElementById(
        "consultSelectedPrice"
    );

    const contactLink = document.getElementById(
        "consultPricingContact"
    );

    let previousFocus = null;

    /* =========================================
       OPEN PRICING MODAL
    ========================================= */

    planButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const planName = button.dataset.plan;
            const planPrice = button.dataset.price;

            if (!planName || !planPrice) {
                console.warn(
                    "Please add data-plan and data-price to the plan button."
                );
                return;
            }

            previousFocus = button;

            // Display selected plan details
            if (selectedPlan) {
                selectedPlan.textContent = planName;
            }

            if (selectedPrice) {
                selectedPrice.textContent = planPrice;
            }

            // Always navigate to 404.html
            // when CONTACT OUR TEAM is clicked.
            if (contactLink) {
                contactLink.href = "404.html";
                contactLink.dataset.plan = planName;
                contactLink.dataset.price = planPrice;
            }

            // Show modal
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

            if (closeButton) {
                closeButton.focus();
            }

        });

    });

    /* =========================================
       CLOSE PRICING MODAL
    ========================================= */

    function closePricingModal() {

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }

    }

    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closePricingModal
        );

    }

    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE THE BOX
    ========================================= */

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closePricingModal();
        }

    });

    /* =========================================
       CLOSE WITH ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closePricingModal();
        }

    });

    /* =========================================
       CONTACT OUR TEAM - REDIRECT TO 404.HTML
    ========================================= */

    if (contactLink) {

        contactLink.href = "404.html";

        contactLink.addEventListener("click", function (event) {

            // Prevent any other click handler from changing
            // the destination to #contact.
            event.preventDefault();

            // Close modal and restore page scrolling.
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");

            document.body.style.overflow = "";

            // Navigate to the 404 page.
            window.location.href = "404.html";

        });

    }

});


document.addEventListener("DOMContentLoaded", function () {
  // Initialize different scroll animations.
  AOS.init({
    duration: 750,
    easing: "ease-out-cubic",
    once: true,
    offset: 60
  });

  const slider = document.querySelector("#business-blog");
  const track = slider.querySelector(".blog-track");
  const viewport = slider.querySelector(".blog-viewport");
  const prevButton = slider.querySelector(".blog-arrow.prev");
  const nextButton = slider.querySelector(".blog-arrow.next");

  const cards = Array.from(track.querySelectorAll(".blog-card"));

  let currentIndex = 0;

  // Display the number of cards appropriate to the screen width.
  function getVisibleCards() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  // Calculate the exact distance to move the track.
  function getStepSize() {
    if (!cards.length) return 0;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap) || 0;

    return cardWidth + gap;
  }

  // Update the slider position and arrow states.
  function updateSlider() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    currentIndex = Math.min(currentIndex, maxIndex);
    currentIndex = Math.max(currentIndex, 0);

    track.style.transform =
      `translateX(-${currentIndex * getStepSize()}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
  }

  // Move forward one card at a time.
  nextButton.addEventListener("click", function () {
    const maxIndex = Math.max(0, cards.length - getVisibleCards());

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  // Move backward one card at a time.
  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Recalculate after resizing or rotating a device.
  window.addEventListener("resize", updateSlider);

  updateSlider();
});




/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   FOOTER + NEWSLETTER VALIDATION
========================================== */

(function () {
    "use strict";

    /* ==========================================
       CURRENT YEAR
    ========================================== */

    const yearElement = document.getElementById(
        "stacklyConsultFooterYear"
    );

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ==========================================
       NEWSLETTER FORM VALIDATION
       SUCCESS / ERROR MESSAGE
    ========================================== */

    const newsletterForm = document.getElementById(
        "stacklyConsultNewsletterForm"
    );

    const newsletterEmail = document.getElementById(
        "stacklyConsultNewsletterEmail"
    );

    const newsletterMessage = document.getElementById(
        "stacklyConsultNewsletterMessage"
    );

    if (
        newsletterForm &&
        newsletterEmail &&
        newsletterMessage
    ) {
        let messageTimer = null;
        let hideTimer = null;

        /*
         * Display feedback below the newsletter form.
         */

        function showNewsletterMessage(text, type) {
            clearTimeout(messageTimer);
            clearTimeout(hideTimer);

            newsletterMessage.textContent = text;

            newsletterMessage.className =
                "stackly-consult-newsletter-message " + type;

            // Reveal the message after updating its content.
            requestAnimationFrame(function () {
                newsletterMessage.classList.add("show");
            });

            // Automatically hide the message after 4 seconds.
            messageTimer = setTimeout(function () {
                newsletterMessage.classList.remove("show");

                hideTimer = setTimeout(function () {
                    newsletterMessage.textContent = "";

                    newsletterMessage.className =
                        "stackly-consult-newsletter-message";
                }, 350);

            }, 4000);
        }


        /*
         * Validate the email and handle submission.
         */

        newsletterForm.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                const email = newsletterEmail.value.trim();

                // Remove any previous message and timers.
                clearTimeout(messageTimer);
                clearTimeout(hideTimer);

                newsletterMessage.className =
                    "stackly-consult-newsletter-message";

                newsletterMessage.textContent = "";

                /*
                 * EMPTY EMAIL VALIDATION
                 */

                if (email === "") {
                    showNewsletterMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    newsletterEmail.focus();
                    return;
                }

                /*
                 * EMAIL FORMAT VALIDATION
                 */

                const emailPattern =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

                if (
                    !emailPattern.test(email) ||
                    !newsletterEmail.checkValidity()
                ) {
                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    newsletterEmail.focus();
                    return;
                }

                /*
                 * SUCCESS MESSAGE
                 */

                showNewsletterMessage(
                    "Thank you! You have successfully subscribed.",
                    "success"
                );

                // Clear the input without reloading the page.
                newsletterForm.reset();
            }
        );
    }


    /* ==========================================
       FOOTER BACK-TO-TOP BUTTON
    ========================================== */

    const backToTop = document.querySelector(
        ".stackly-consult-footer-back-top"
    );

    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            const homeSection = document.querySelector("#home");

            if (homeSection) {
                homeSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

})();



/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   ACTIVE NAVIGATION LINK HIGHLIGHT
   DESKTOP + MOBILE
========================================== */

(function () {
    "use strict";

    const desktopLinks = document.querySelectorAll(
        ".stackly-consult-desktop-nav .stackly-consult-nav-link"
    );

    const mobileLinks = document.querySelectorAll(
        ".stackly-consult-mobile-nav a"
    );

    /*
     * Normalize the current page filename.
     */

    function getCurrentPage() {
        let pathname = window.location.pathname;
        let currentPage = pathname.split("/").pop();

        if (!currentPage || currentPage === "") {
            currentPage = "index.html";
        }

        return currentPage.toLowerCase();
    }

    /*
     * Highlight the matching desktop and mobile links.
     */

    function setActiveNavigation() {
        const currentPage = getCurrentPage();

        function updateLinks(links) {
            links.forEach(function (link) {
                const href = link.getAttribute("href");

                if (!href || href.startsWith("#")) {
                    return;
                }

                const linkPage = href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0]
                    .toLowerCase();

                const isActive = linkPage === currentPage;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        updateLinks(desktopLinks);
        updateLinks(mobileLinks);
    }

    /*
     * Initialize active navigation.
     */

    setActiveNavigation();

})();



/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   CONTACT FORM + CUSTOM DROPDOWNS
   Validation + Success Message + Reset
========================================== */

(function () {

    "use strict";

    const contactForm = document.getElementById(
        "stacklyConsultContactForm"
    );

    if (!contactForm) return;


    /* ==========================================
       ELEMENT REFERENCES
    ========================================== */

    const statusMessage = document.getElementById(
        "stacklyConsultContactStatus"
    );

    const nameField = document.getElementById(
        "stacklyConsultName"
    );

    const emailField = document.getElementById(
        "stacklyConsultEmail"
    );

    const phoneField = document.getElementById(
        "stacklyConsultPhone"
    );

    const companyField = document.getElementById(
        "stacklyConsultCompany"
    );

    const messageField = document.getElementById(
        "stacklyConsultMessage"
    );

    const submitButton = contactForm.querySelector(
        ".stackly-consult-contact-submit"
    );

    const submitButtonText = submitButton.querySelector("span");

    const customSelects = contactForm.querySelectorAll(
        "[data-custom-select]"
    );

    let statusTimer = null;


    /* ==========================================
       SHOW STATUS MESSAGE
    ========================================== */

    function showStatus(message, type = "error") {

        clearTimeout(statusTimer);

        statusMessage.textContent = message;

        statusMessage.className =
            "stackly-consult-contact-form-status " + type;

        statusMessage.style.display = "block";

        statusMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        statusTimer = setTimeout(function () {

            statusMessage.textContent = "";

            statusMessage.className =
                "stackly-consult-contact-form-status";

        }, type === "success" ? 5000 : 4500);

    }


    /* ==========================================
       CLEAR STATUS MESSAGE
    ========================================== */

    function clearStatus() {

        clearTimeout(statusTimer);

        statusMessage.textContent = "";

        statusMessage.className =
            "stackly-consult-contact-form-status";

    }


    /* ==========================================
       CUSTOM DROPDOWN FUNCTIONS
    ========================================== */

    function closeAllDropdowns(exceptSelect = null) {

        customSelects.forEach(function (select) {

            if (select === exceptSelect) return;

            const trigger = select.querySelector(
                ".stackly-consult-select-trigger"
            );

            const optionsContainer = select.querySelector(
                ".stackly-consult-select-options"
            );

            select.classList.remove("active");

            trigger.setAttribute("aria-expanded", "false");

            optionsContainer.hidden = true;

        });

    }


    /* ==========================================
       INITIALIZE CUSTOM DROPDOWNS
    ========================================== */

    customSelects.forEach(function (select) {

        const trigger = select.querySelector(
            ".stackly-consult-select-trigger"
        );

        const valueDisplay = select.querySelector(
            ".stackly-consult-select-value"
        );

        const optionsContainer = select.querySelector(
            ".stackly-consult-select-options"
        );

        const hiddenInput = select.querySelector(
            'input[type="hidden"]'
        );

        const options = Array.from(
            optionsContainer.querySelectorAll('[role="option"]')
        );

        const defaultText = valueDisplay.textContent.trim();


        /* OPEN DROPDOWN */

        trigger.addEventListener("click", function () {

            const isOpen = select.classList.contains("active");

            closeAllDropdowns();

            if (!isOpen) {

                select.classList.add("active");

                trigger.setAttribute("aria-expanded", "true");

                optionsContainer.hidden = false;

            }

        });


        /* SELECT OPTION */

        options.forEach(function (option) {

            option.setAttribute("aria-selected", "false");

            option.addEventListener("click", function () {

                const selectedValue = this.dataset.value;

                valueDisplay.textContent = selectedValue;

                hiddenInput.value = selectedValue;

                select.classList.add("selected");

                options.forEach(function (item) {

                    item.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });

                this.setAttribute("aria-selected", "true");

                closeAllDropdowns();

                clearFieldError(hiddenInput);

                clearStatus();

            });

        });


        /* KEYBOARD NAVIGATION */

        trigger.addEventListener("keydown", function (event) {

            if (
                event.key === "ArrowDown" ||
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                closeAllDropdowns();

                select.classList.add("active");

                trigger.setAttribute("aria-expanded", "true");

                optionsContainer.hidden = false;

                const selectedIndex = options.findIndex(
                    option =>
                        option.getAttribute("aria-selected") === "true"
                );

                let nextIndex;

                if (event.key === "ArrowDown") {

                    nextIndex = selectedIndex < 0
                        ? 0
                        : Math.min(selectedIndex + 1, options.length - 1);

                } else {

                    nextIndex = selectedIndex < 0
                        ? options.length - 1
                        : Math.max(selectedIndex - 1, 0);

                }

                options[nextIndex].focus();

            }

        });


        /* KEYBOARD CONTROL INSIDE DROPDOWN */

        options.forEach(function (option, index) {

            option.addEventListener("keydown", function (event) {

                if (event.key === "ArrowDown") {

                    event.preventDefault();

                    options[
                        Math.min(index + 1, options.length - 1)
                    ].focus();

                }

                if (event.key === "ArrowUp") {

                    event.preventDefault();

                    if (index === 0) {

                        trigger.focus();

                    } else {

                        options[index - 1].focus();

                    }

                }

                if (event.key === "Escape") {

                    closeAllDropdowns();

                    trigger.focus();

                }

                if (event.key === "Tab") {

                    closeAllDropdowns();

                }

            });

        });

    });


    /* ==========================================
       CLOSE DROPDOWNS ON OUTSIDE CLICK
    ========================================== */

    document.addEventListener("click", function (event) {

        if (!event.target.closest("[data-custom-select]")) {

            closeAllDropdowns();

        }

    });


    /* ==========================================
       RESET CUSTOM DROPDOWNS
    ========================================== */

    function resetCustomDropdowns() {

        customSelects.forEach(function (select) {

            const valueDisplay = select.querySelector(
                ".stackly-consult-select-value"
            );

            const hiddenInput = select.querySelector(
                'input[type="hidden"]'
            );

            const options = select.querySelectorAll(
                '[role="option"]'
            );

            const defaultText =
                select.dataset.defaultText ||
                valueDisplay.textContent.trim();

            valueDisplay.textContent = defaultText;

            hiddenInput.value = "";

            select.classList.remove("selected", "has-error");

            options.forEach(function (option) {

                option.setAttribute(
                    "aria-selected",
                    "false"
                );

            });

        });

        closeAllDropdowns();

    }


    /* ==========================================
       ERROR HANDLING
    ========================================== */

    function showFieldError(field, message) {

        const fieldContainer = field.closest(
            ".stackly-consult-contact-field"
        );

        if (!fieldContainer) return;

        const errorElement = fieldContainer.querySelector(
            ".stackly-consult-contact-error"
        );

        fieldContainer.classList.add("has-error");

        if (errorElement) {

            errorElement.textContent = message;

        }

    }


    function clearFieldError(field) {

        const fieldContainer = field.closest(
            ".stackly-consult-contact-field"
        );

        if (!fieldContainer) return;

        fieldContainer.classList.remove("has-error");

        const errorElement = fieldContainer.querySelector(
            ".stackly-consult-contact-error"
        );

        if (errorElement) {

            errorElement.textContent = "";

        }

    }


    /* ==========================================
       VALIDATE NAME
       ALPHABETS ONLY
    ========================================== */

    function validateName() {

        const name = nameField.value.trim();

        const namePattern =
            /^[\p{L}][\p{L}\s.'-]*$/u;

        const letterCount =
            (name.match(/\p{L}/gu) || []).length;

        if (!name) {

            showFieldError(
                nameField,
                "Please enter your full name."
            );

            return false;

        }

        if (letterCount < 2 || !namePattern.test(name)) {

            showFieldError(
                nameField,
                "Please enter a valid name using alphabets only."
            );

            return false;

        }

        clearFieldError(nameField);

        return true;

    }


    /* ==========================================
       VALIDATE EMAIL
    ========================================== */

    function validateEmail() {

        const email = emailField.value.trim();

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {

            showFieldError(
                emailField,
                "Please enter your email address."
            );

            return false;

        }

        if (!emailPattern.test(email)) {

            showFieldError(
                emailField,
                "Please enter a valid email address."
            );

            return false;

        }

        clearFieldError(emailField);

        return true;

    }


    /* ==========================================
       VALIDATE PHONE NUMBER
       EXACTLY 10 DIGITS
    ========================================== */

    function validatePhone() {

        const phone = phoneField.value.trim();

        let digits = phone.replace(/\D/g, "");

        if (!phone) {

            showFieldError(
                phoneField,
                "Please enter your phone number."
            );

            return false;

        }

        // Allow Indian country code +91.

        if (digits.length === 12 && digits.startsWith("91")) {

            digits = digits.slice(2);

        }

        // Allow an optional leading zero.

        if (digits.length === 11 && digits.startsWith("0")) {

            digits = digits.slice(1);

        }

        if (!/^[0-9]{10}$/.test(digits)) {

            showFieldError(
                phoneField,
                "Phone number must contain exactly 10 digits."
            );

            return false;

        }

        // Normalize the submitted value to 10 digits.

        phoneField.value = digits;

        clearFieldError(phoneField);

        return true;

    }


    /* ==========================================
       VALIDATE SERVICE DROPDOWN
    ========================================== */

    function validateService() {

        const serviceField = contactForm.querySelector(
            'input[name="service"]'
        );

        if (!serviceField.value.trim()) {

            showFieldError(
                serviceField,
                "Please select a service."
            );

            return false;

        }

        clearFieldError(serviceField);

        return true;

    }


    /* ==========================================
       VALIDATE MESSAGE
    ========================================== */

    function validateMessage() {

        const message = messageField.value.trim();

        if (!message) {

            showFieldError(
                messageField,
                "Please enter your project details."
            );

            return false;

        }

        if (message.length < 10) {

            showFieldError(
                messageField,
                "Please enter at least 10 characters."
            );

            return false;

        }

        clearFieldError(messageField);

        return true;

    }


    /* ==========================================
       LIVE VALIDATION
       CLEAR ERRORS WHILE TYPING
    ========================================== */

    nameField.addEventListener("input", function () {

        clearFieldError(nameField);

        clearStatus();

    });

    emailField.addEventListener("input", function () {

        clearFieldError(emailField);

        clearStatus();

    });

    phoneField.addEventListener("input", function () {

        // Keep only digits and common phone formatting symbols.

        this.value = this.value.replace(/[^0-9+\s()-]/g, "");

        clearFieldError(phoneField);

        clearStatus();

    });

    companyField.addEventListener("input", function () {

        clearStatus();

    });

    messageField.addEventListener("input", function () {

        clearFieldError(messageField);

        clearStatus();

    });


    /* ==========================================
       FORM SUBMISSION
    ========================================== */

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearStatus();

        closeAllDropdowns();

        let isValid = true;


        // Validate all required fields.

        const validations = [
            validateName(),
            validateEmail(),
            validatePhone(),
            validateService(),
            validateMessage()
        ];

        if (validations.includes(false)) {

            isValid = false;

        }


        /* ======================================
           DISPLAY VALIDATION ERRORS
        ====================================== */

        if (!isValid) {

            const firstError = contactForm.querySelector(
                ".stackly-consult-contact-field.has-error"
            );

            if (firstError) {

                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                const focusElement = firstError.querySelector(
                    "input:not([type='hidden']), textarea, .stackly-consult-select-trigger"
                );

                if (focusElement) {

                    setTimeout(function () {

                        focusElement.focus({
                            preventScroll: true
                        });

                    }, 350);

                }

            }

            showStatus(
                "Please complete all required fields correctly.",
                "error"
            );

            return;

        }


        /* ======================================
           SUCCESS MESSAGE
        ====================================== */

        const originalButtonText =
            submitButtonText.textContent;

        submitButton.disabled = true;

        submitButtonText.textContent = "Processing...";

        submitButton.classList.add("is-loading");


        // Front-end demonstration only.
        // Connect a backend or form service to receive enquiries.

        setTimeout(function () {

            submitButton.disabled = false;

            submitButtonText.textContent = originalButtonText;

            submitButton.classList.remove("is-loading");


            // Clear form fields.

            contactForm.reset();


            // Reset custom dropdown selections.

            resetCustomDropdowns();


            // Clear any previous field errors.

            contactForm.querySelectorAll(
                ".stackly-consult-contact-field"
            ).forEach(function (field) {

                field.classList.remove("has-error");

                const error = field.querySelector(
                    ".stackly-consult-contact-error"
                );

                if (error) {

                    error.textContent = "";

                }

            });


            // Display success message.

            showStatus(
                "Thank you! Your enquiry has been submitted successfully. We'll be in touch soon.",
                "success"
            );


        }, 700);

    });


    /* ==========================================
       PREVENT MULTIPLE FORM SUBMISSIONS
    ========================================== */

    contactForm.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" &&
            event.target.tagName !== "TEXTAREA" &&
            event.target.tagName !== "BUTTON"
        ) {

            event.preventDefault();

        }

    });


})();



/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   FAQ ACCORDION FUNCTIONALITY
========================================== */

(function () {
    "use strict";

    const faqSection = document.querySelector(
        ".stackly-consult-faq-section"
    );

    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll(
        ".stackly-consult-faq-item"
    );

    faqItems.forEach((item) => {

        const button = item.querySelector(
            ".stackly-consult-faq-question"
        );

        const answer = item.querySelector(
            ".stackly-consult-faq-answer"
        );

        const icon = item.querySelector(
            ".stackly-consult-faq-icon i"
        );

        if (!button || !answer) return;

        // Initialise accordion state from the HTML.
        const isInitiallyOpen =
            item.classList.contains("active") &&
            button.getAttribute("aria-expanded") === "true";

        answer.hidden = !isInitiallyOpen;
        button.setAttribute(
            "aria-expanded",
            String(isInitiallyOpen)
        );

        if (icon) {
            icon.classList.toggle("fa-plus", !isInitiallyOpen);
            icon.classList.toggle("fa-minus", isInitiallyOpen);
        }

        button.addEventListener("click", function () {

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            // Close every FAQ item first.
            faqItems.forEach((otherItem) => {

                const otherButton = otherItem.querySelector(
                    ".stackly-consult-faq-question"
                );

                const otherAnswer = otherItem.querySelector(
                    ".stackly-consult-faq-answer"
                );

                const otherIcon = otherItem.querySelector(
                    ".stackly-consult-faq-icon i"
                );

                otherItem.classList.remove("active");

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.hidden = true;
                }

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }
            });

            // Open the clicked item if it was previously closed.
            if (!isOpen) {

                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");
                answer.hidden = false;

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }

            }

        });

    });

})();



/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   PROFESSIONAL WEBSITE LOADER
   Smooth + Faster Loading Animation
========================================== */

(function () {

    "use strict";

    const loader = document.getElementById("stacklyConsultLoader");
    const progressBar = document.getElementById("stacklyConsultLoaderBar");
    const percentage = document.getElementById("stacklyConsultLoaderPercent");

    if (!loader || !progressBar || !percentage) return;

    let progress = 0;
    let animationFrame;
    let lastTime = 0;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function updateProgress(value) {

        progress = Math.min(value, 100);

        progressBar.style.width = progress + "%";
        percentage.textContent = Math.floor(progress) + "%";

    }

    function animateProgress(timestamp) {

        if (!lastTime) lastTime = timestamp;

        const delta = timestamp - lastTime;
        lastTime = timestamp;

        if (progress < 95) {

            // Faster and smoother progress movement
            const speed = progress < 60 ? 0.055 : 0.025;

            updateProgress(
                progress + Math.min(delta * speed, 2.5)
            );

        }

        animationFrame = requestAnimationFrame(animateProgress);

    }

    function finishLoader() {

        cancelAnimationFrame(animationFrame);

        updateProgress(100);

        setTimeout(function () {

            loader.classList.add("loader-hidden");

            document.body.classList.remove(
                "stackly-consult-loading"
            );

            setTimeout(function () {

                loader.remove();

            }, reducedMotion ? 0 : 650);

        }, reducedMotion ? 0 : 200);

    }

    // Start loader
    document.body.classList.add("stackly-consult-loading");

    if (reducedMotion) {
        updateProgress(100);
    } else {
        animationFrame = requestAnimationFrame(animateProgress);
    }

    // Wait until all page resources are loaded
    if (document.readyState === "complete") {

        finishLoader();

    } else {

        window.addEventListener(
            "load",
            finishLoader,
            { once: true }
        );

    }

})();
