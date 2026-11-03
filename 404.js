/* ==========================================
   STACKLY CONSULTANCY - 404 PAGE JAVASCRIPT
   Go Back + Copyright Year + Animations
   Interactive Effects + Accessibility
========================================== */

(function () {
    "use strict";

    /* ==========================================
       ELEMENT REFERENCES
    ========================================== */

    const goBackButton = document.getElementById(
        "stacklyConsult404GoBack"
    );

    const yearElement = document.getElementById(
        "stacklyConsult404Year"
    );

    const errorPage = document.querySelector(
        ".stackly-consult-404"
    );

    const pageContent = document.querySelector(
        ".stackly-consult-404-content"
    );

    const visual = document.querySelector(
        ".stackly-consult-404-visual"
    );

    const homeButton = document.querySelector(
        ".stackly-consult-404-home"
    );

    /* ==========================================
       DYNAMIC COPYRIGHT YEAR
    ========================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* ==========================================
       GO BACK BUTTON
    ========================================== */

    if (goBackButton) {
        goBackButton.addEventListener("click", function () {
            /*
             * Navigate back only when a previous
             * page exists in the browser history.
             */

            if (window.history.length > 1) {
                window.history.back();
            } else {
                /*
                 * Fallback when the visitor opens
                 * the 404 page directly.
                 */

                window.location.href = "index.html";
            }
        });
    }

    /* ==========================================
       ENTRANCE ANIMATIONS
    ========================================== */

    function initializeEntranceAnimations() {
        if (!errorPage) return;

        const animatedElements = [
            ".stackly-consult-404-header",
            ".stackly-consult-404-copy",
            ".stackly-consult-404-visual",
            ".stackly-consult-404-footer"
        ];

        animatedElements.forEach(function (selector, index) {
            const element = errorPage.querySelector(selector);

            if (!element) return;

            element.style.opacity = "0";
            element.style.animation =
                "stacklyConsult404JSFadeUp 0.8s ease forwards";

            element.style.animationDelay =
                (index * 0.16) + "s";
        });
    }

    /* ==========================================
       ADD ANIMATION STYLES
    ========================================== */

    function addAnimationStyles() {
        if (document.getElementById("stacklyConsult404JSStyles")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "stacklyConsult404JSStyles";

        style.textContent = `
            @keyframes stacklyConsult404JSFadeUp {
                from {
                    opacity: 0;
                    transform: translateY(24px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes stacklyConsult404JSFloat {
                0%, 100% {
                    transform: translateY(0);
                }

                50% {
                    transform: translateY(-9px);
                }
            }

            @keyframes stacklyConsult404JSPulse {
                0%, 100% {
                    opacity: 0.65;
                    transform: scale(1);
                }

                50% {
                    opacity: 1;
                    transform: scale(1.08);
                }
            }

            .stackly-consult-404-btn {
                -webkit-tap-highlight-color: transparent;
            }

            @media (prefers-reduced-motion: reduce) {
                .stackly-consult-404 *,
                .stackly-consult-404 *::before,
                .stackly-consult-404 *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    scroll-behavior: auto !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /* ==========================================
       FLOATING VISUAL EFFECTS
    ========================================== */

    function initializeFloatingEffects() {
        if (!visual) return;

        const floatingCards = visual.querySelectorAll(
            ".stackly-consult-404-floating-card"
        );

        floatingCards.forEach(function (card, index) {
            card.style.animation =
                "stacklyConsult404JSFloat 4s ease-in-out infinite";

            card.style.animationDelay =
                (index * 0.7) + "s";
        });

        const decorations = visual.querySelectorAll(
            ".stackly-consult-404-decoration"
        );

        decorations.forEach(function (decoration, index) {
            decoration.style.animation =
                "stacklyConsult404JSPulse 3s ease-in-out infinite";

            decoration.style.animationDelay =
                (index * 0.45) + "s";
        });
    }

    /* ==========================================
       BUTTON CLICK FEEDBACK
    ========================================== */

    function initializeButtonFeedback() {
        const buttons = document.querySelectorAll(
            ".stackly-consult-404-btn"
        );

        buttons.forEach(function (button) {
            button.addEventListener("pointerdown", function () {
                button.classList.add(
                    "stackly-consult-404-btn-pressed"
                );
            });

            ["pointerup", "pointercancel", "pointerleave"].forEach(
                function (eventName) {
                    button.addEventListener(eventName, function () {
                        button.classList.remove(
                            "stackly-consult-404-btn-pressed"
                        );
                    });
                }
            );
        });
    }

    /* ==========================================
       KEYBOARD ACCESSIBILITY
    ========================================== */

    function initializeKeyboardAccessibility() {
        if (!goBackButton) return;

        goBackButton.setAttribute(
            "aria-label",
            "Go back to the previous page"
        );

        if (homeButton) {
            homeButton.setAttribute(
                "aria-label",
                "Return to the Stackly Consultancy home page"
            );
        }
    }

    /* ==========================================
       INITIALIZE 404 PAGE
    ========================================== */

    function initialize404Page() {
        addAnimationStyles();
        initializeEntranceAnimations();
        initializeFloatingEffects();
        initializeButtonFeedback();
        initializeKeyboardAccessibility();

        if (pageContent) {
            pageContent.setAttribute(
                "aria-label",
                "Page not found information"
            );
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize404Page
        );
    } else {
        initialize404Page();
    }

})();