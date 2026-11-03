
/* ==========================================================
   STACKLY CORPORATE CONSULTANCY
   LOGIN / SIGNUP JAVASCRIPT
   Password Minimum: 6 Characters
   Form Validation + Custom Dropdown
   Role-Based Login + Local Storage
========================================================== */

(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /* ==========================================
           01. ELEMENTS
        ========================================== */

        const loginTab = document.getElementById(
            "stacklyConsultLoginTab"
        );

        const signupTab = document.getElementById(
            "stacklyConsultSignupTab"
        );

        const loginForm = document.getElementById(
            "stacklyConsultLoginForm"
        );

        const signupForm = document.getElementById(
            "stacklyConsultSignupForm"
        );

        const authTitle = document.getElementById(
            "stacklyConsultAuthTitle"
        );

        const authSubtitle = document.getElementById(
            "stacklyConsultAuthSubtitle"
        );

        const loginStatus = document.getElementById(
            "stacklyConsultLoginStatus"
        );

        const signupStatus = document.getElementById(
            "stacklyConsultSignupStatus"
        );

        const loginEmail = document.getElementById(
            "stacklyConsultLoginEmail"
        );

        const loginPassword = document.getElementById(
            "stacklyConsultLoginPassword"
        );

        const signupName = document.getElementById(
            "stacklyConsultSignupName"
        );

        const signupEmail = document.getElementById(
            "stacklyConsultSignupEmail"
        );

        const signupPhone = document.getElementById(
            "stacklyConsultSignupPhone"
        );

        const signupPassword = document.getElementById(
            "stacklyConsultSignupPassword"
        );

        const confirmPassword = document.getElementById(
            "stacklyConsultConfirmPassword"
        );

        const rememberMe = document.getElementById(
            "stacklyConsultRemember"
        );

        const termsCheckbox = document.getElementById(
            "stacklyConsultTerms"
        );

        const yearElement = document.getElementById(
            "stacklyConsultAuthYear"
        );


        /* ==========================================
           02. LOCAL STORAGE KEYS
        ========================================== */

        const EMAIL_KEY = "loginEmail";
        const ROLE_KEY = "loginRole";
        const LOGIN_KEY = "stacklyConsultLoggedIn";
        const REMEMBER_KEY = "stacklyConsultRememberEmail";


        /* ==========================================
           03. CURRENT YEAR
        ========================================== */

        if (yearElement) {

            yearElement.textContent =
                new Date().getFullYear();

        }


        /* ==========================================
           04. STATUS MESSAGE
        ========================================== */

        function showStatus(element, message, type) {

            if (!element) return;

            element.textContent = message;

            element.className =
                "stackly-consult-auth-status show " + type;

        }


        function clearStatus(element) {

            if (!element) return;

            element.textContent = "";

            element.className =
                "stackly-consult-auth-status";

        }


        function clearAllStatuses() {

            clearStatus(loginStatus);
            clearStatus(signupStatus);

        }


        /* ==========================================
           05. VALIDATION HELPERS
        ========================================== */

        function isValidEmail(email) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
                email.trim()
            );

        }


        // Accepts 6, 7, 8 or more characters.
        function isValidPassword(password) {

            return password.length >= 6;

        }


        function isValidName(name) {

            return /^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u.test(
                name.trim()
            ) && name.trim().length >= 2;

        }


        function showFieldError(input, message) {

            if (!input) return;

            input.classList.add("invalid");

            input.setAttribute("aria-invalid", "true");

            const field = input.closest(
                ".stackly-consult-auth-field"
            );

            if (!field) return;

            let error = field.querySelector(
                ".stackly-consult-auth-error"
            );

            if (!error) {

                error = document.createElement("span");

                error.className =
                    "stackly-consult-auth-error";

                field.appendChild(error);

            }

            error.textContent = message;

        }


        function clearFieldError(input) {

            if (!input) return;

            input.classList.remove("invalid");

            input.removeAttribute("aria-invalid");

            const field = input.closest(
                ".stackly-consult-auth-field"
            );

            if (!field) return;

            const error = field.querySelector(
                ".stackly-consult-auth-error"
            );

            if (error) {
                error.remove();
            }

        }


        function clearFormErrors(form) {

            if (!form) return;

            form.querySelectorAll(
                ".stackly-consult-auth-error"
            ).forEach(error => error.remove());

            form.querySelectorAll(
                ".invalid"
            ).forEach(element => {

                element.classList.remove("invalid");

                element.removeAttribute("aria-invalid");

            });

        }


        function getSelectedRole(form) {

            if (!form) return "";

            const roleInput = form.querySelector(
                '[data-auth-dropdown] input[type="hidden"]'
            );

            return roleInput
                ? roleInput.value.trim().toLowerCase()
                : "";

        }


        /* ==========================================
           06. LOGIN / SIGNUP TAB SWITCHING
        ========================================== */

        function switchAuth(type) {

            const isLogin = type === "login";

            if (loginForm) {
                loginForm.classList.toggle("active", isLogin);
            }

            if (signupForm) {
                signupForm.classList.toggle("active", !isLogin);
            }

            if (loginTab) {

                loginTab.classList.toggle("active", isLogin);

                loginTab.setAttribute(
                    "aria-selected",
                    String(isLogin)
                );

            }

            if (signupTab) {

                signupTab.classList.toggle("active", !isLogin);

                signupTab.setAttribute(
                    "aria-selected",
                    String(!isLogin)
                );

            }

            if (authTitle) {

                authTitle.textContent = isLogin
                    ? "Welcome Back!"
                    : "Create Your Account";

            }

            if (authSubtitle) {

                authSubtitle.textContent = isLogin
                    ? "Sign in to continue to your account."
                    : "Join Stackly and start your business journey.";

            }

            clearAllStatuses();

            clearFormErrors(loginForm);

            clearFormErrors(signupForm);

            closeAllDropdowns();

        }


        if (loginTab) {

            loginTab.addEventListener("click", function (event) {

                event.preventDefault();

                switchAuth("login");

            });

        }


        if (signupTab) {

            signupTab.addEventListener("click", function (event) {

                event.preventDefault();

                switchAuth("signup");

            });

        }


        document.querySelectorAll(
            "[data-switch-auth]"
        ).forEach(button => {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                switchAuth(button.dataset.switchAuth);

            });

        });


        /* ==========================================
           07. PASSWORD SHOW / HIDE
        ========================================== */

        document.querySelectorAll(
            "[data-password-toggle]"
        ).forEach(button => {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                const inputId =
                    button.dataset.passwordToggle;

                const passwordInput =
                    document.getElementById(inputId);

                const icon = button.querySelector("i");

                if (!passwordInput) return;

                const showPassword =
                    passwordInput.type === "password";

                passwordInput.type =
                    showPassword ? "text" : "password";

                button.setAttribute(
                    "aria-label",
                    showPassword
                        ? "Hide password"
                        : "Show password"
                );

                button.setAttribute(
                    "aria-pressed",
                    String(showPassword)
                );

                if (icon) {

                    icon.classList.toggle(
                        "fa-eye",
                        !showPassword
                    );

                    icon.classList.toggle(
                        "fa-eye-slash",
                        showPassword
                    );

                }

            });

        });


        /* ==========================================
           08. CUSTOM ROLE DROPDOWN
        ========================================== */

        const dropdowns = document.querySelectorAll(
            "[data-auth-dropdown]"
        );


        function closeAllDropdowns(except = null) {

            dropdowns.forEach(dropdown => {

                if (dropdown === except) return;

                dropdown.classList.remove("open");

                const trigger = dropdown.querySelector(
                    ".stackly-consult-auth-dropdown-trigger"
                );

                if (trigger) {

                    trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

        }


        function openDropdown(dropdown, focusOption = false) {

            if (!dropdown) return;

            closeAllDropdowns(dropdown);

            const trigger = dropdown.querySelector(
                ".stackly-consult-auth-dropdown-trigger"
            );

            const options = dropdown.querySelectorAll(
                "[data-role-value]"
            );

            dropdown.classList.add("open");

            if (trigger) {

                trigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

            if (focusOption && options.length) {

                options[0].focus();

            }

        }


        dropdowns.forEach(dropdown => {

            const trigger = dropdown.querySelector(
                ".stackly-consult-auth-dropdown-trigger"
            );

            const hiddenInput = dropdown.querySelector(
                'input[type="hidden"]'
            );

            const label = dropdown.querySelector(
                "[data-role-label]"
            );

            const options = Array.from(
                dropdown.querySelectorAll("[data-role-value]")
            );


            if (!trigger || !hiddenInput || !label || !options.length) {

                console.warn(
                    "Check the custom role dropdown HTML:",
                    dropdown
                );

                return;

            }


            /* INITIALIZE */

            hiddenInput.value = "";

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );


            /* OPEN / CLOSE */

            trigger.addEventListener("click", function (event) {

                event.preventDefault();

                event.stopPropagation();

                const isOpen =
                    dropdown.classList.contains("open");

                if (isOpen) {

                    closeAllDropdowns();

                } else {

                    openDropdown(dropdown);

                }

            });


            /* ROLE SELECTION */

            options.forEach((option, index) => {

                option.addEventListener("click", function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    const role = (
                        option.dataset.roleValue || ""
                    ).trim().toLowerCase();

                    if (
                        role !== "admin" &&
                        role !== "client"
                    ) {
                        return;
                    }

                    hiddenInput.value = role;

                    label.textContent =
                        option.textContent.trim();

                    options.forEach(item => {

                        const selected = item === option;

                        item.classList.toggle(
                            "selected",
                            selected
                        );

                        item.setAttribute(
                            "aria-selected",
                            String(selected)
                        );

                    });

                    dropdown.classList.remove("invalid");

                    const parentForm = dropdown.closest("form");

                    if (parentForm === loginForm) {
                        clearStatus(loginStatus);
                    }

                    if (parentForm === signupForm) {
                        clearStatus(signupStatus);
                    }

                    closeAllDropdowns();

                    trigger.focus();

                });


                /* KEYBOARD NAVIGATION */

                option.addEventListener("keydown", function (event) {

                    if (event.key === "ArrowDown") {

                        event.preventDefault();

                        options[
                            (index + 1) % options.length
                        ].focus();

                    }

                    if (event.key === "ArrowUp") {

                        event.preventDefault();

                        options[
                            (index - 1 + options.length) %
                            options.length
                        ].focus();

                    }

                    if (event.key === "Escape") {

                        event.preventDefault();

                        closeAllDropdowns();

                        trigger.focus();

                    }

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        option.click();

                    }

                });

            });


            /* KEYBOARD OPEN */

            trigger.addEventListener("keydown", function (event) {

                if (
                    event.key === "ArrowDown" ||
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openDropdown(dropdown, true);

                }

                if (event.key === "Escape") {

                    closeAllDropdowns();

                }

            });


            /* CLOSE WHEN FOCUS LEAVES */

            dropdown.addEventListener("focusout", function () {

                setTimeout(function () {

                    if (
                        !dropdown.contains(document.activeElement)
                    ) {

                        closeAllDropdowns();

                    }

                }, 0);

            });

        });


        /* CLOSE OUTSIDE CLICK */

        document.addEventListener("click", function (event) {

            if (!event.target.closest("[data-auth-dropdown]")) {

                closeAllDropdowns();

            }

        });


        /* ==========================================
           09. LIVE VALIDATION
        ========================================== */

        document.querySelectorAll(
            ".stackly-consult-auth-input"
        ).forEach(input => {

            input.addEventListener("input", function () {

                clearFieldError(input);

                if (input.closest("#stacklyConsultLoginForm")) {
                    clearStatus(loginStatus);
                }

                if (input.closest("#stacklyConsultSignupForm")) {
                    clearStatus(signupStatus);
                }

            });

        });


        /* ==========================================
           10. PHONE INPUT
           MAXIMUM 10 DIGITS
        ========================================== */

        if (signupPhone) {

            signupPhone.setAttribute("maxlength", "10");

            signupPhone.setAttribute("inputmode", "numeric");

            signupPhone.addEventListener("input", function () {

                this.value = this.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                clearFieldError(this);

            });

        }


        /* ==========================================
           11. REMEMBER EMAIL
        ========================================== */

        if (loginEmail) {

            const savedEmail =
                localStorage.getItem(REMEMBER_KEY);

            if (savedEmail) {

                loginEmail.value = savedEmail;

                if (rememberMe) {
                    rememberMe.checked = true;
                }

            }

        }


        /* ==========================================
           12. LOGIN FORM VALIDATION
           PASSWORD: 6 OR MORE CHARACTERS
        ========================================== */

        if (loginForm) {

            loginForm.addEventListener("submit", function (event) {

                event.preventDefault();

                clearStatus(loginStatus);

                clearFormErrors(loginForm);

                closeAllDropdowns();


                const email = loginEmail
                    ? loginEmail.value.trim().toLowerCase()
                    : "";

                const password = loginPassword
                    ? loginPassword.value
                    : "";

                const role = getSelectedRole(loginForm);

                let isValid = true;

                let firstInvalid = null;


                /* EMAIL REQUIRED */

                if (!email) {

                    showFieldError(
                        loginEmail,
                        "Please enter your email address."
                    );

                    showStatus(
                        loginStatus,
                        "Please enter your email address.",
                        "error"
                    );

                    firstInvalid = loginEmail;

                    isValid = false;

                }

                /* EMAIL FORMAT */

                else if (!isValidEmail(email)) {

                    showFieldError(
                        loginEmail,
                        "Please enter a valid email address."
                    );

                    showStatus(
                        loginStatus,
                        "Please enter a valid email address.",
                        "error"
                    );

                    firstInvalid = loginEmail;

                    isValid = false;

                }


                /* PASSWORD REQUIRED */

                if (!password) {

                    showFieldError(
                        loginPassword,
                        "Please enter your password."
                    );

                    showStatus(
                        loginStatus,
                        "Please enter your password.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = loginPassword;
                    }

                    isValid = false;

                }

                /* PASSWORD MINIMUM 6 */

                else if (!isValidPassword(password)) {

                    showFieldError(
                        loginPassword,
                        "Password must contain at least 6 characters."
                    );

                    showStatus(
                        loginStatus,
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = loginPassword;
                    }

                    isValid = false;

                }


                /* ROLE REQUIRED */

                if (!role) {

                    const roleDropdown = loginForm.querySelector(
                        "[data-auth-dropdown]"
                    );

                    if (roleDropdown) {

                        roleDropdown.classList.add("invalid");

                        showStatus(
                            loginStatus,
                            "Please select your login role: Admin or Client.",
                            "error"
                        );

                        if (!firstInvalid) {

                            firstInvalid = roleDropdown.querySelector(
                                ".stackly-consult-auth-dropdown-trigger"
                            );

                        }

                    }

                    isValid = false;

                }


                /* STOP IF INVALID */

                if (!isValid) {

                    if (firstInvalid) {
                        firstInvalid.focus();
                    }

                    return;

                }


                /* ROLE-BASED REDIRECT */

                let destination = "";

                if (role === "admin") {

                    destination = "admin.html";

                } else if (role === "client") {

                    destination = "client.html";

                }


                if (!destination) {

                    showStatus(
                        loginStatus,
                        "Please select a valid login role.",
                        "error"
                    );

                    return;

                }


                /* SAVE LOGIN INFORMATION */

                localStorage.setItem(
                    "loginEmail",
                    email
                );

                localStorage.setItem(
                    "loginRole",
                    role
                );

                localStorage.setItem(
                    "stacklyConsultLoggedIn",
                    "true"
                );


                /* REMEMBER ME */

                if (rememberMe && rememberMe.checked) {

                    localStorage.setItem(
                        REMEMBER_KEY,
                        email
                    );

                } else {

                    localStorage.removeItem(
                        REMEMBER_KEY
                    );

                }


                /* SUCCESS MESSAGE */

                showStatus(
                    loginStatus,
                    "Login successful! Redirecting...",
                    "success"
                );


                /* DISABLE BUTTON */

                const submitButton = loginForm.querySelector(
                    'button[type="submit"]'
                );

                if (submitButton) {

                    submitButton.disabled = true;

                }


                /* DIRECT REDIRECTION */

                window.location.assign(destination);

            });

        }


        /* ==========================================
           13. SIGNUP FORM VALIDATION
           PASSWORD: 6 OR MORE CHARACTERS
           AFTER SIGNUP: MOVE TO LOGIN FORM
        ========================================== */

        if (signupForm) {

            signupForm.addEventListener("submit", function (event) {

                event.preventDefault();

                clearStatus(signupStatus);

                clearFormErrors(signupForm);

                closeAllDropdowns();


                const name = signupName
                    ? signupName.value.trim()
                    : "";

                const email = signupEmail
                    ? signupEmail.value.trim().toLowerCase()
                    : "";

                const phone = signupPhone
                    ? signupPhone.value.trim()
                    : "";

                const password = signupPassword
                    ? signupPassword.value
                    : "";

                const confirm = confirmPassword
                    ? confirmPassword.value
                    : "";

                const role = getSelectedRole(signupForm);

                let isValid = true;

                let firstInvalid = null;


                /* NAME */

                if (!name) {

                    showFieldError(
                        signupName,
                        "Please enter your full name."
                    );

                    showStatus(
                        signupStatus,
                        "Please enter your full name.",
                        "error"
                    );

                    firstInvalid = signupName;

                    isValid = false;

                } else if (!isValidName(name)) {

                    showFieldError(
                        signupName,
                        "Please enter a valid name."
                    );

                    showStatus(
                        signupStatus,
                        "Please enter a valid full name.",
                        "error"
                    );

                    firstInvalid = signupName;

                    isValid = false;

                }


                /* EMAIL */

                if (!email) {

                    showFieldError(
                        signupEmail,
                        "Please enter your email address."
                    );

                    showStatus(
                        signupStatus,
                        "Please enter your email address.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = signupEmail;
                    }

                    isValid = false;

                } else if (!isValidEmail(email)) {

                    showFieldError(
                        signupEmail,
                        "Please enter a valid email address."
                    );

                    showStatus(
                        signupStatus,
                        "Please enter a valid email address.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = signupEmail;
                    }

                    isValid = false;

                }


                /* PHONE */

                if (!phone) {

                    showFieldError(
                        signupPhone,
                        "Please enter your phone number."
                    );

                    showStatus(
                        signupStatus,
                        "Please enter your phone number.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = signupPhone;
                    }

                    isValid = false;

                } else if (!/^[0-9]{10}$/.test(phone)) {

                    showFieldError(
                        signupPhone,
                        "Phone number must contain exactly 10 digits."
                    );

                    showStatus(
                        signupStatus,
                        "Please enter a valid 10-digit phone number.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = signupPhone;
                    }

                    isValid = false;

                }


                /* ROLE */

                if (!role) {

                    const roleDropdown = signupForm.querySelector(
                        "[data-auth-dropdown]"
                    );

                    if (roleDropdown) {

                        roleDropdown.classList.add("invalid");

                        showStatus(
                            signupStatus,
                            "Please select Admin or Client.",
                            "error"
                        );

                        if (!firstInvalid) {

                            firstInvalid = roleDropdown.querySelector(
                                ".stackly-consult-auth-dropdown-trigger"
                            );

                        }

                    }

                    isValid = false;

                }


                /* PASSWORD REQUIRED */

                if (!password) {

                    showFieldError(
                        signupPassword,
                        "Please create a password."
                    );

                    showStatus(
                        signupStatus,
                        "Please create a password.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = signupPassword;
                    }

                    isValid = false;

                }

                /* PASSWORD MINIMUM 6 */

                else if (!isValidPassword(password)) {

                    showFieldError(
                        signupPassword,
                        "Password must contain at least 6 characters."
                    );

                    showStatus(
                        signupStatus,
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = signupPassword;
                    }

                    isValid = false;

                }


                /* CONFIRM PASSWORD */

                if (!confirm) {

                    showFieldError(
                        confirmPassword,
                        "Please confirm your password."
                    );

                    showStatus(
                        signupStatus,
                        "Please confirm your password.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = confirmPassword;
                    }

                    isValid = false;

                } else if (password !== confirm) {

                    showFieldError(
                        confirmPassword,
                        "Passwords do not match."
                    );

                    showStatus(
                        signupStatus,
                        "Passwords do not match.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = confirmPassword;
                    }

                    isValid = false;

                }


                /* TERMS */

                if (termsCheckbox && !termsCheckbox.checked) {

                    showStatus(
                        signupStatus,
                        "Please accept the Terms & Conditions and Privacy Policy.",
                        "error"
                    );

                    if (!firstInvalid) {
                        firstInvalid = termsCheckbox;
                    }

                    isValid = false;

                }


                /* STOP IF INVALID */

                if (!isValid) {

                    if (firstInvalid) {
                        firstInvalid.focus();
                    }

                    return;

                }


                /* MOVE TO LOGIN FORM */

                if (loginEmail) {

                    loginEmail.value = email;

                }

                if (loginPassword) {

                    loginPassword.value = "";

                }


                /* SELECT REGISTERED ROLE IN LOGIN */

                const loginRoleDropdown = loginForm
                    ? loginForm.querySelector("[data-auth-dropdown]")
                    : null;

                if (loginRoleDropdown) {

                    const roleInput = loginRoleDropdown.querySelector(
                        'input[type="hidden"]'
                    );

                    const roleLabel = loginRoleDropdown.querySelector(
                        "[data-role-label]"
                    );

                    const roleOptions = loginRoleDropdown.querySelectorAll(
                        "[data-role-value]"
                    );

                    if (roleInput) {

                        roleInput.value = role;

                    }

                    roleOptions.forEach(option => {

                        const selected =
                            (option.dataset.roleValue || "").toLowerCase() === role;

                        option.classList.toggle(
                            "selected",
                            selected
                        );

                        option.setAttribute(
                            "aria-selected",
                            String(selected)
                        );

                        if (selected && roleLabel) {

                            roleLabel.textContent =
                                option.textContent.trim();

                        }

                    });

                }


                /* RESET SIGNUP FORM */

                signupForm.reset();

                clearFormErrors(signupForm);

                closeAllDropdowns();


                /* SWITCH DIRECTLY TO LOGIN */

                switchAuth("login");


                /* SUCCESS MESSAGE ON LOGIN FORM */

                showStatus(
                    loginStatus,
                    "Signup successful! Please enter your password to login.",
                    "success"
                );


                /* FOCUS LOGIN PASSWORD */

                if (loginPassword) {

                    loginPassword.focus();

                }

            });

        }


        /* ==========================================
           14. FORGOT PASSWORD
        ========================================== */

        const forgotLink = document.querySelector(
            ".stackly-consult-auth-forgot"
        );

        if (forgotLink) {

            forgotLink.addEventListener("click", function (event) {

                if (!loginEmail || !loginEmail.value.trim()) {

                    event.preventDefault();

                    showStatus(
                        loginStatus,
                        "Please enter your email address first.",
                        "error"
                    );

                    if (loginEmail) {
                        loginEmail.focus();
                    }

                }

            });

        }


        /* ==========================================
           15. INITIALIZE
        ========================================== */

        closeAllDropdowns();

    });

})();
