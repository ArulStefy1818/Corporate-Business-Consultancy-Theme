
/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   ADMIN DASHBOARD JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* ==========================================
       ELEMENT REFERENCES
    ========================================== */

    const sidebar = document.getElementById(
        "stacklyConsultAdminSidebar"
    );

    const overlay = document.getElementById(
        "stacklyConsultAdminOverlay"
    );

    const menuButton = document.getElementById(
        "stacklyConsultAdminMenuButton"
    );

    const closeButton = document.getElementById(
        "stacklyConsultAdminClose"
    );

    const emailElement = document.getElementById(
        "stacklyConsultAdminEmail"
    );

    const yearElement = document.getElementById(
        "stacklyConsultAdminYear"
    );

    const logoutButton = document.getElementById(
        "stacklyConsultAdminLogout"
    );

    const profileName = document.querySelector(
        ".stackly-consult-admin-profile-info h3"
    );

    const welcomeHeading = document.querySelector(
        ".stackly-consult-admin-welcome-content h2"
    );

    const headerWelcome = document.querySelector(
        ".stackly-consult-admin-header-user-info > span"
    );

    const navigationLinks = document.querySelectorAll(
        ".stackly-consult-admin-nav-link"
    );


    /* ==========================================
       LOCAL STORAGE KEYS
    ========================================== */

    const STORAGE_KEYS = [
        "loginEmail",
        "loginRole",
        "stacklyConsultLoggedIn",
        "stacklyConsultRemember"
    ];


    /* ==========================================
       GET LOGGED-IN USER EMAIL
    ========================================== */

    function getLoggedInEmail() {

        const possibleKeys = [
            "loginEmail",
            "stacklyConsultLoginEmail",
            "stacklyConsultEmail"
        ];

        for (const key of possibleKeys) {

            const storedEmail = localStorage.getItem(key);

            if (
                storedEmail &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(storedEmail.trim())
            ) {
                return storedEmail.trim();
            }
        }

        return "admin@stacklyconsult.com";
    }


    /* ==========================================
       GENERATE NAME FROM EMAIL
       Example: john.doe@gmail.com -> John
    ========================================== */

    function getNameFromEmail(email) {

        if (!email || !email.includes("@")) {
            return "Administrator";
        }

        let firstPart = email
            .split("@")[0]
            .split(/[._+-]/)[0];

        firstPart = firstPart.replace(/[0-9]+/g, "");

        if (!firstPart) {
            return "Administrator";
        }

        return firstPart.charAt(0).toUpperCase() +
            firstPart.slice(1).toLowerCase();
    }


    /* ==========================================
       DISPLAY ADMIN EMAIL AND USERNAME
    ========================================== */

    function updateAdminProfile() {

        const email = getLoggedInEmail();
        const userName = getNameFromEmail(email);

        // Display email in top-right header
        if (emailElement) {
            emailElement.textContent = email;
            emailElement.title = email;
        }

        // Display generated username in sidebar
        if (profileName) {
            profileName.textContent = userName;
        }

        // Update header welcome text
        if (headerWelcome) {
            headerWelcome.textContent = "Welcome back, " + userName;
        }

        // Update welcome dashboard heading
        if (welcomeHeading) {

            welcomeHeading.innerHTML =
                'Welcome Back, <span>' +
                userName +
                '!</span>';
        }
    }


    /* ==========================================
       MOBILE SIDEBAR OPEN
    ========================================== */

    function openSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("active");
        overlay.classList.add("active");

        document.body.classList.add(
            "stackly-consult-admin-menu-active"
        );

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
            menuButton.setAttribute("aria-label", "Close navigation");
        }

        if (closeButton) {
            closeButton.setAttribute("aria-expanded", "true");
        }
    }


    /* ==========================================
       MOBILE SIDEBAR CLOSE
    ========================================== */

    function closeSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

        document.body.classList.remove(
            "stackly-consult-admin-menu-active"
        );

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        }

        if (closeButton) {
            closeButton.setAttribute("aria-expanded", "false");
        }
    }


    /* ==========================================
       HAMBURGER BUTTON
    ========================================== */

    if (menuButton) {

        menuButton.addEventListener("click", function () {

            const isOpen = sidebar &&
                sidebar.classList.contains("active");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }

        });

    }


    /* ==========================================
       CLOSE BUTTON
    ========================================== */

    if (closeButton) {

        closeButton.addEventListener("click", function () {
            closeSidebar();
        });

    }


    /* ==========================================
       OVERLAY CLICK
    ========================================== */

    if (overlay) {

        overlay.addEventListener("click", function () {
            closeSidebar();
        });

    }


    /* ==========================================
       CLOSE MENU AFTER NAVIGATION
    ========================================== */

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeSidebar();

        });

    });


    /* ==========================================
       ESCAPE KEY TO CLOSE SIDEBAR
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });


    /* ==========================================
       RESPONSIVE SIDEBAR RESET
    ========================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {
            closeSidebar();
        }

    });


    /* ==========================================
       AUTOMATIC ACTIVE NAVIGATION
    ========================================== */

    function setActiveNavigation() {

        const currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "admin.html";

        navigationLinks.forEach(function (link) {

            const linkPage = link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();

            link.classList.remove("active");

            if (linkPage === currentPage) {

                link.classList.add("active");

            }

        });

    }


    /* ==========================================
       LOGOUT FUNCTION
    ========================================== */

    if (logoutButton) {

        logoutButton.addEventListener("click", function (event) {

            event.preventDefault();

            const confirmLogout = window.confirm(
                "Are you sure you want to logout?"
            );

            if (!confirmLogout) return;

            // Remove login-related information
            STORAGE_KEYS.forEach(function (key) {
                localStorage.removeItem(key);
            });

            // Remove additional consultancy login keys
            localStorage.removeItem("stacklyConsultLoginEmail");
            localStorage.removeItem("stacklyConsultEmail");

            // Clear session information
            sessionStorage.removeItem("loginEmail");
            sessionStorage.removeItem("loginRole");
            sessionStorage.removeItem("stacklyConsultLoggedIn");

            // Redirect to login page
            window.location.href = "login.html";

        });

    }


    /* ==========================================
       COPYRIGHT YEAR
    ========================================== */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* ==========================================
       AOS ANIMATION INITIALIZATION
    ========================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 950,
            easing: "ease-out-cubic",
            once: true,
            offset: 70,
            delay: 0,
            mirror: false

        });

    }


    /* ==========================================
       REVENUE SELECT INTERACTION
    ========================================== */

    const revenueSelect = document.querySelector(
        ".stackly-consult-admin-select"
    );

    if (revenueSelect) {

        revenueSelect.addEventListener("change", function () {

            // Connect your chart data here when your backend is ready.
            console.log(
                "Selected revenue period:",
                this.value
            );

        });

    }


    /* ==========================================
       NOTIFICATION BUTTON
    ========================================== */

    const notificationButton = document.querySelector(
        ".stackly-consult-admin-icon-button"
    );

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            // Replace this demo notification with your notification panel.
            console.log("Notification button clicked.");

        });

    }


    /* ==========================================
       INITIALIZE DASHBOARD
    ========================================== */

    updateAdminProfile();

    setActiveNavigation();

    closeSidebar();

});



/* =====================================================
   STACKLY CORPORATE CONSULTANCY
   ADMIN DASHBOARD - REVENUE & RECENT ACTIVITY
===================================================== */

(function () {
    "use strict";

    /* =====================================================
       REVENUE OVERVIEW ELEMENTS
    ===================================================== */

    const revenueDropdown = document.getElementById(
        "stacklyConsultRevenueDropdown"
    );

    const revenueCanvas = document.getElementById(
        "stacklyConsultRevenueChart"
    );

    let revenueChart = null;


    /* =====================================================
       REVENUE DEMO DATA
    ===================================================== */

    const revenueData = {

        week: {
            labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            values: [
                12000,
                18500,
                15000,
                24000,
                21000,
                28500,
                32000
            ]
        },

        month: {
            labels: [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4"
            ],
            values: [
                85000,
                125000,
                98000,
                145000
            ]
        },

        year: {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            values: [
                280000,
                320000,
                295000,
                410000,
                380000,
                450000,
                425000,
                490000,
                520000,
                480000,
                560000,
                620000
            ]
        }

    };


    /* =====================================================
       CURRENCY FORMATTER
    ===================================================== */

    function formatRevenue(value) {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(value);

    }


    /* =====================================================
       REVENUE CHART INITIALIZATION
    ===================================================== */

    function initializeRevenueChart() {

        if (!revenueCanvas) {
            console.warn("Revenue chart canvas not found.");
            return;
        }

        if (typeof Chart === "undefined") {
            console.error(
                "Chart.js is not loaded. Load Chart.js before admin.js."
            );
            return;
        }

        const context = revenueCanvas.getContext("2d");

        if (!context) return;


        /* CHART GRADIENT */

        const gradient = context.createLinearGradient(
            0,
            0,
            0,
            300
        );

        gradient.addColorStop(
            0,
            "rgba(255, 69, 41, 0.25)"
        );

        gradient.addColorStop(
            1,
            "rgba(255, 69, 41, 0.01)"
        );


        /* INITIAL DATA */

        const initialData = revenueData.month;


        /* CREATE CHART */

        revenueChart = new Chart(context, {

            type: "line",

            data: {

                labels: initialData.labels,

                datasets: [{

                    label: "Revenue",

                    data: initialData.values,

                    borderColor: "#ff4529",

                    backgroundColor: gradient,

                    borderWidth: 3,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 4,

                    pointHoverRadius: 7,

                    pointBackgroundColor: "#ffffff",

                    pointBorderColor: "#ff4529",

                    pointBorderWidth: 2,

                    pointHoverBackgroundColor: "#ff4529",

                    pointHoverBorderColor: "#ffffff",

                    pointHoverBorderWidth: 3

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: "index"
                },

                animation: {
                    duration: 1000,
                    easing: "easeOutQuart"
                },

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        backgroundColor: "#17191d",

                        titleColor: "#ffffff",

                        bodyColor: "#ffffff",

                        padding: 13,

                        cornerRadius: 9,

                        displayColors: false,

                        callbacks: {

                            label: function (context) {

                                return "Revenue: " +
                                    formatRevenue(context.parsed.y);

                            }

                        }

                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        border: {
                            display: false
                        },

                        ticks: {

                            color: "#777d84",

                            font: {
                                family: "DM Sans",
                                size: 11
                            },

                            maxRotation: 0,

                            autoSkip: true

                        }

                    },

                    y: {

                        beginAtZero: true,

                        border: {
                            display: false
                        },

                        grid: {

                            color: "rgba(120, 125, 132, 0.12)",

                            drawTicks: false

                        },

                        ticks: {

                            color: "#777d84",

                            padding: 10,

                            font: {
                                family: "DM Sans",
                                size: 11
                            },

                            callback: function (value) {

                                return "₹" +
                                    new Intl.NumberFormat("en-IN", {
                                        notation: "compact",
                                        maximumFractionDigits: 1
                                    }).format(value);

                            }

                        }

                    }

                }

            }

        });

    }


    /* =====================================================
       UPDATE REVENUE CHART
    ===================================================== */

    function updateRevenueChart(period) {

        if (!revenueChart || !revenueData[period]) {
            return;
        }

        const selectedData = revenueData[period];

        revenueChart.data.labels = selectedData.labels;

        revenueChart.data.datasets[0].data =
            selectedData.values;

        revenueChart.update();

    }


    /* =====================================================
       CUSTOM REVENUE DROPDOWN
    ===================================================== */

    function initializeRevenueDropdown() {

        if (!revenueDropdown) return;

        const trigger = revenueDropdown.querySelector(
            ".stackly-consult-admin-dropdown-trigger"
        );

        const valueDisplay = revenueDropdown.querySelector(
            ".stackly-consult-admin-dropdown-value"
        );

        const options = revenueDropdown.querySelectorAll(
            ".stackly-consult-admin-dropdown-option"
        );

        if (!trigger || !valueDisplay) return;


        /* OPEN DROPDOWN */

        trigger.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = revenueDropdown.classList.contains("open");

            closeRevenueDropdown();

            if (!isOpen) {

                revenueDropdown.classList.add("open");

                trigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });


        /* SELECT PERIOD */

        options.forEach(function (option) {

            option.addEventListener("click", function () {

                const selectedPeriod = option.dataset.value;

                if (!revenueData[selectedPeriod]) return;


                /* UPDATE SELECTED TEXT */

                valueDisplay.textContent = option.textContent.trim();


                /* UPDATE ACTIVE OPTION */

                options.forEach(function (item) {

                    item.classList.remove("active");

                    const oldIcon = item.querySelector("i");

                    if (oldIcon) {
                        oldIcon.remove();
                    }

                });


                option.classList.add("active");


                /* ADD CHECK ICON */

                const checkIcon = document.createElement("i");

                checkIcon.className = "fa-solid fa-check";

                checkIcon.setAttribute("aria-hidden", "true");

                option.appendChild(checkIcon);


                /* UPDATE CHART */

                updateRevenueChart(selectedPeriod);


                /* CLOSE DROPDOWN */

                closeRevenueDropdown();

            });

        });


        /* CLOSE DROPDOWN FUNCTION */

        function closeRevenueDropdown() {

            revenueDropdown.classList.remove("open");

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* OUTSIDE CLICK */

        document.addEventListener("click", function (event) {

            if (!revenueDropdown.contains(event.target)) {

                closeRevenueDropdown();

            }

        });


        /* ESCAPE KEY */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeRevenueDropdown();

            }

        });

    }


    /* =====================================================
       RECENT ACTIVITY ANIMATIONS
    ===================================================== */

    function initializeRecentActivity() {

        const activityList = document.querySelector(
            ".stackly-consult-admin-activity-list"
        );

        if (!activityList) return;

        const activityItems = activityList.querySelectorAll(
            ".stackly-consult-admin-activity-item"
        );

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


        activityItems.forEach(function (item, index) {

            if (prefersReducedMotion) return;

            item.style.opacity = "0";

            item.style.transform = "translateY(15px)";

            item.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";


            window.setTimeout(function () {

                item.style.opacity = "1";

                item.style.transform = "translateY(0)";

            }, 150 * index);

        });

    }


    /* =====================================================
       RECENT ACTIVITY HOVER EFFECT
    ===================================================== */

    function initializeActivityHover() {

        const activityItems = document.querySelectorAll(
            ".stackly-consult-admin-activity-item"
        );

        activityItems.forEach(function (item) {

            item.addEventListener("mouseenter", function () {

                item.classList.add("activity-hover");

            });

            item.addEventListener("mouseleave", function () {

                item.classList.remove("activity-hover");

            });

        });

    }


    /* =====================================================
       INITIALIZE DASHBOARD
    ===================================================== */

    function initializeDashboardOverview() {

        initializeRevenueChart();

        initializeRevenueDropdown();

        initializeRecentActivity();

        initializeActivityHover();

    }


    /* =====================================================
       DOM READY
    ===================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeDashboardOverview
        );

    } else {

        initializeDashboardOverview();

    }

})();



/* ==========================================
   STACKLY CONSULTANCY
   ADMIN PROJECTS SEARCH + FILTER
========================================== */

(function () {
    "use strict";

    const searchInput = document.getElementById(
        "stacklyConsultProjectsSearch"
    );

    const filterSelect = document.getElementById(
        "stacklyConsultProjectsFilter"
    );

    const projectCards = document.querySelectorAll(
        ".stackly-consult-admin-project-card"
    );

    const emptyMessage = document.getElementById(
        "stacklyConsultProjectsEmpty"
    );

    if (!searchInput || !filterSelect || !projectCards.length) {
        return;
    }

    function filterProjects() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        const filterValue = filterSelect.value;

        let visibleCount = 0;

        projectCards.forEach((card) => {

            const text = card.textContent.toLowerCase();

            const status = card.dataset.projectStatus;

            const matchesSearch = text.includes(searchValue);

            const matchesFilter =
                filterValue === "all" ||
                status === filterValue;

            const isVisible = matchesSearch && matchesFilter;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }

        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    }

    searchInput.addEventListener("input", filterProjects);
    filterSelect.addEventListener("change", filterProjects);

})();


/* ==========================================
   STACKLY CONSULTANCY
   CUSTOM PROJECT FILTER DROPDOWN
========================================== */

(function () {
    "use strict";

    const dropdown = document.getElementById(
        "stacklyConsultProjectsDropdown"
    );

    if (!dropdown) return;

    const button = document.getElementById(
        "stacklyConsultProjectsDropdownBtn"
    );

    const selectedText = document.getElementById(
        "stacklyConsultProjectsSelected"
    );

    const hiddenInput = document.getElementById(
        "stacklyConsultProjectsFilter"
    );

    const options = dropdown.querySelectorAll(
        ".stackly-consult-admin-projects-dropdown-option"
    );

    // OPEN / CLOSE DROPDOWN
    button.addEventListener("click", function () {

        const isOpen = dropdown.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

    // SELECT DROPDOWN OPTION
    options.forEach(function (option) {

        option.addEventListener("click", function () {

            const value = this.dataset.value;
            const label = this.querySelector("span").textContent;

            // Update selected text
            selectedText.textContent = label;

            // Update hidden input
            hiddenInput.value = value;

            // Update active option
            options.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            // Close dropdown
            dropdown.classList.remove("open");

            button.setAttribute("aria-expanded", "false");

            // Trigger existing project filter
            hiddenInput.dispatchEvent(
                new Event("change", { bubbles: true })
            );

        });

    });

    // CLOSE WHEN CLICKING OUTSIDE
    document.addEventListener("click", function (event) {

        if (!dropdown.contains(event.target)) {

            dropdown.classList.remove("open");

            button.setAttribute("aria-expanded", "false");

        }

    });

    // CLOSE WITH ESCAPE KEY
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            dropdown.classList.remove("open");

            button.setAttribute("aria-expanded", "false");

            button.focus();

        }

    });

})();



/* ==========================================
   STACKLY CONSULTANCY
   APPOINTMENTS TABLE - FILTER & SEARCH
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    const appointmentsSection = document.querySelector(
        ".stackly-consult-appointments-list"
    );

    if (!appointmentsSection) return;


    /* ==========================================
       ELEMENTS
    ========================================== */

    const searchInput = appointmentsSection.querySelector(
        ".stackly-consult-appointments-search input"
    );

    const tableBody = appointmentsSection.querySelector(
        ".stackly-consult-appointments-table tbody"
    );

    const tableRows = Array.from(
        tableBody.querySelectorAll("tr")
    );

    const dropdowns = Array.from(
        appointmentsSection.querySelectorAll("[data-dropdown]")
    );

    const tableFooter = appointmentsSection.querySelector(
        ".stackly-consult-appointments-table-footer span"
    );

    const totalAppointments = Number(
        appointmentsSection.dataset.totalCount || 248
    );

    let selectedStatus = "";
    let selectedType = "";


    /* ==========================================
       EMPTY STATE
    ========================================== */

    const emptyRow = document.createElement("tr");

    emptyRow.className = "stackly-consult-appointments-empty";

    emptyRow.innerHTML = `
        <td colspan="6">
            <div class="stackly-consult-appointments-empty-content">
                <i class="fa-solid fa-calendar-xmark"></i>

                <h3>No Appointments Found</h3>

                <p>
                    Try changing your search or filter options.
                </p>
            </div>
        </td>
    `;

    emptyRow.style.display = "none";

    tableBody.appendChild(emptyRow);


    /* ==========================================
       TEXT NORMALIZATION
    ========================================== */

    function normalizeText(value) {

        return (value || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");

    }


    /* ==========================================
       GET ROW STATUS
    ========================================== */

    function getRowStatus(row) {

        const statusElement = row.querySelector(
            ".stackly-consult-appointment-status"
        );

        return statusElement
            ? normalizeText(statusElement.textContent)
            : "";

    }


    /* ==========================================
       GET ROW APPOINTMENT TYPE
    ========================================== */

    function getRowType(row) {

        const typeElement = row.querySelector(
            ".stackly-consult-appointment-type"
        );

        const type = typeElement
            ? normalizeText(typeElement.textContent)
            : "";

        // Match Project Review with Review Meeting.
        if (type === "review meeting") {
            return "project review";
        }

        return type;

    }


    /* ==========================================
       DROPDOWN FILTERS
    ========================================== */

    dropdowns.forEach((dropdown, index) => {

        const toggle = dropdown.querySelector(
            ".stackly-consult-appointment-dropdown-toggle"
        );

        const valueElement = dropdown.querySelector(
            ".stackly-consult-appointment-dropdown-value"
        );

        const menu = dropdown.querySelector(
            ".stackly-consult-appointment-dropdown-menu"
        );

        const options = menu.querySelectorAll(
            "button[data-value]"
        );

        if (!toggle || !menu || !valueElement) return;


        // Initial accessibility state.
        toggle.setAttribute("aria-expanded", "false");

        menu.setAttribute("aria-hidden", "true");


        /* OPEN / CLOSE DROPDOWN */

        toggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = dropdown.classList.contains("open");

            closeAllDropdowns();

            if (!isOpen) {

                dropdown.classList.add("open");

                toggle.setAttribute("aria-expanded", "true");

                menu.setAttribute("aria-hidden", "false");

            }

        });


        /* SELECT DROPDOWN OPTION */

        options.forEach(option => {

            option.addEventListener("click", function () {

                const selectedValue = this.dataset.value || "";

                const selectedLabel = this.querySelector("span")
                    ?.textContent.trim() || "";

                // Update selected label.
                valueElement.textContent = selectedLabel;

                // Update active option.
                options.forEach(item => {
                    item.classList.remove("active");
                });

                this.classList.add("active");


                // Identify the dropdown.
                const filterType = dropdown.dataset.filter ||
                    (index === 0 ? "status" : "type");


                if (filterType === "status") {

                    selectedStatus = selectedValue;

                } else if (filterType === "type") {

                    selectedType = selectedValue;

                }


                closeAllDropdowns();

                filterAppointments();


                // Notify other scripts if required.
                appointmentsSection.dispatchEvent(
                    new CustomEvent("appointmentFilterChange", {
                        bubbles: true,
                        detail: {
                            status: selectedStatus,
                            type: selectedType
                        }
                    })
                );

            });

        });

    });


    /* ==========================================
       CLOSE ALL DROPDOWNS
    ========================================== */

    function closeAllDropdowns() {

        dropdowns.forEach(dropdown => {

            dropdown.classList.remove("open");

            const toggle = dropdown.querySelector(
                ".stackly-consult-appointment-dropdown-toggle"
            );

            const menu = dropdown.querySelector(
                ".stackly-consult-appointment-dropdown-menu"
            );

            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
            }

            if (menu) {
                menu.setAttribute("aria-hidden", "true");
            }

        });

    }


    /* ==========================================
       OUTSIDE CLICK
    ========================================== */

    document.addEventListener("click", function (event) {

        if (!event.target.closest("[data-dropdown]")) {
            closeAllDropdowns();
        }

    });


    /* ==========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeAllDropdowns();

        }

    });


    /* ==========================================
       SEARCH INPUT
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            filterAppointments();

        });

    }


    /* ==========================================
       FILTER APPOINTMENTS
    ========================================== */

    function filterAppointments() {

        const searchValue = normalizeText(
            searchInput?.value
        );

        let visibleCount = 0;


        tableRows.forEach(row => {

            const rowText = normalizeText(
                row.textContent
            );

            const rowStatus = getRowStatus(row);

            const rowType = getRowType(row);


            // Search matching.
            const matchesSearch = !searchValue ||
                rowText.includes(searchValue);


            // Status matching.
            const matchesStatus = !selectedStatus ||
                rowStatus === normalizeText(selectedStatus);


            // Appointment type matching.
            const matchesType = !selectedType ||
                rowType === normalizeText(selectedType);


            // Final result.
            const shouldDisplay =
                matchesSearch &&
                matchesStatus &&
                matchesType;


            row.style.display = shouldDisplay ? "" : "none";


            if (shouldDisplay) {
                visibleCount++;
            }

        });


        /* EMPTY STATE */

        emptyRow.style.display =
            visibleCount === 0 ? "" : "none";


        /* UPDATE FOOTER */

        if (tableFooter) {

            tableFooter.textContent =
                `Showing ${visibleCount} of ${totalAppointments} appointments`;

        }

    }


    /* ==========================================
       INITIALIZE
    ========================================== */

    filterAppointments();


});



/* ==========================================
   STACKLY CONSULTANCY
   APPOINTMENT CALENDAR - INTERACTIVE JS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    const calendar = document.querySelector(
        ".stackly-consult-appointments-calendar"
    );

    if (!calendar) return;


    /* ==========================================
       ELEMENTS
    ========================================== */

    const monthHeading = calendar.querySelector(
        ".stackly-consult-appointments-calendar-header h3"
    );

    const weekContainer = calendar.querySelector(
        ".stackly-consult-appointments-week"
    );

    const navigationButtons = calendar.querySelectorAll(
        ".stackly-consult-appointments-calendar-navigation button"
    );

    if (!monthHeading || !weekContainer || navigationButtons.length < 2) {
        return;
    }

    const previousButton = navigationButtons[0];
    const nextButton = navigationButtons[1];


    /* ==========================================
       APPOINTMENT DATA
       Replace with your actual appointment data.
    ========================================== */

    const appointmentEvents = {

        "2026-11-04": [
            { type: "consultation", status: "completed" },
            { type: "consultation", status: "ongoing" },
            { type: "business", status: "confirmed" }
        ],

        "2026-11-05": [
            { type: "consultation", status: "pending" },
            { type: "review", status: "confirmed" }
        ],

        "2026-11-06": [
            { type: "business", status: "confirmed" }
        ],

        "2026-11-09": [
            { type: "consultation", status: "confirmed" }
        ],

        "2026-11-10": [
            { type: "business", status: "confirmed" }
        ],

        "2026-11-12": [
            { type: "review", status: "completed" }
        ]

    };


    /* ==========================================
       DATE SETTINGS
    ========================================== */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric"
    });

    const dayNames = [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"
    ];


    /* ==========================================
       GET MONDAY OF THE WEEK
    ========================================== */

    function getMonday(date) {

        const result = new Date(date);

        result.setHours(0, 0, 0, 0);

        const day = result.getDay();

        const difference = day === 0 ? -6 : 1 - day;

        result.setDate(result.getDate() + difference);

        return result;

    }


    /* ==========================================
       INITIAL CALENDAR DATE
       Uses the existing HTML active date.
    ========================================== */

    const existingActiveDay = weekContainer.querySelector(
        ".stackly-consult-appointments-day.active strong"
    );

    const existingMonth = monthHeading.textContent.trim();

    const parsedMonth = new Date(
        existingMonth + " 1"
    );

    const initialDate = new Date(
        parsedMonth.getFullYear(),
        parsedMonth.getMonth(),
        Number(existingActiveDay?.textContent || 4)
    );

    let weekStart = getMonday(initialDate);

    let selectedDate = new Date(initialDate);


    /* ==========================================
       FORMAT DATE KEY
    ========================================== */

    function getDateKey(date) {

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    /* ==========================================
       CHECK SAME DATE
    ========================================== */

    function isSameDate(date1, date2) {

        return getDateKey(date1) === getDateKey(date2);

    }


    /* ==========================================
       CREATE EVENT DOTS
    ========================================== */

    function createEventDots(date) {

        const events = appointmentEvents[getDateKey(date)] || [];

        if (!events.length) return "";

        const colors = [];

        events.forEach(event => {

            let colorClass = "";

            if (event.status === "completed") {

                colorClass = "green-dot";

            } else if (event.type === "business") {

                colorClass = "blue-dot";

            } else {

                colorClass = "orange-dot";

            }

            if (!colors.includes(colorClass)) {
                colors.push(colorClass);
            }

        });


        return colors.map(color => {

            return `
                <span class="stackly-consult-calendar-event-dot ${color}">
                </span>
            `;

        }).join("");

    }


    /* ==========================================
       RENDER WEEK
    ========================================== */

    function renderCalendar() {

        // Update month and year.
        monthHeading.textContent = dateFormatter.format(weekStart);

        const fragment = document.createDocumentFragment();


        for (let index = 0; index < 7; index++) {

            const currentDate = new Date(weekStart);

            currentDate.setDate(
                weekStart.getDate() + index
            );

            const dateKey = getDateKey(currentDate);

            const events = appointmentEvents[dateKey] || [];

            const isSelected = isSameDate(
                currentDate,
                selectedDate
            );

            const isToday = isSameDate(
                currentDate,
                today
            );

            const isSunday = currentDate.getDay() === 0;


            /* CREATE DAY CARD */

            const dayCard = document.createElement("button");

            dayCard.type = "button";

            dayCard.className =
                "stackly-consult-appointments-day";

            dayCard.setAttribute(
                "aria-label",
                currentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                })
            );

            dayCard.setAttribute(
                "aria-pressed",
                String(isSelected)
            );


            if (isSelected) {
                dayCard.classList.add("active");
            }

            if (isToday) {
                dayCard.classList.add("today");
            }

            if (events.length) {
                dayCard.classList.add("has-events");
            }

            if (isSunday) {
                dayCard.classList.add("muted");
            }


            /* DAY CONTENT */

            dayCard.innerHTML = `

                <span>${dayNames[index]}</span>

                <strong>${String(
                    currentDate.getDate()
                ).padStart(2, "0")}</strong>

                <small>
                    ${createEventDots(currentDate)}
                </small>

            `;


            /* DATE CLICK */

            dayCard.addEventListener("click", function () {

                selectedDate = new Date(currentDate);

                renderCalendar();

                calendar.dispatchEvent(
                    new CustomEvent("appointmentDateChange", {
                        bubbles: true,
                        detail: {
                            date: dateKey,
                            selectedDate: new Date(currentDate),
                            appointments: appointmentEvents[dateKey] || []
                        }
                    })
                );

            });


            fragment.appendChild(dayCard);

        }


        // Replace previous week.
        weekContainer.replaceChildren(fragment);


        /* ==========================================
           NAVIGATION BUTTON STATES
        ========================================== */

        previousButton.setAttribute(
            "aria-label",
            "Previous week"
        );

        nextButton.setAttribute(
            "aria-label",
            "Next week"
        );

    }


    /* ==========================================
       PREVIOUS WEEK
    ========================================== */

    previousButton.addEventListener("click", function () {

        weekStart.setDate(
            weekStart.getDate() - 7
        );

        selectedDate = new Date(weekStart);

        renderCalendar();

    });


    /* ==========================================
       NEXT WEEK
    ========================================== */

    nextButton.addEventListener("click", function () {

        weekStart.setDate(
            weekStart.getDate() + 7
        );

        selectedDate = new Date(weekStart);

        renderCalendar();

    });


    /* ==========================================
       INITIAL RENDER
    ========================================== */

    renderCalendar();


    /* ==========================================
       CUSTOM EVENT FOR OTHER COMPONENTS
    ========================================== */

    calendar.addEventListener(
        "appointmentDateChange",
        function (event) {

            console.log(
                "Selected appointment date:",
                event.detail.date
            );

            console.log(
                "Appointments:",
                event.detail.appointments
            );

        }
    );


});


/* =====================================================
   STACKLY CORPORATE CONSULTANCY
   TEAM DIRECTORY - PROFESSIONAL JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ==========================================
       ELEMENT REFERENCES
    ========================================== */

    const directory = document.querySelector(
        ".stackly-consult-team-directory"
    );

    if (!directory) return;

    const searchInput = directory.querySelector(
        "#stacklyConsultTeamSearch"
    );

    const memberGrid = directory.querySelector(
        "#stacklyConsultTeamMemberGrid"
    );

    const memberCards = Array.from(
        directory.querySelectorAll(
            ".stackly-consult-team-member-card"
        )
    );

    const emptyState = directory.querySelector(
        "#stacklyConsultTeamEmpty"
    );

    const memberCount = directory.querySelector(
        "#stacklyConsultTeamCount"
    );

    const dropdowns = Array.from(
        directory.querySelectorAll(
            ".stackly-consult-team-custom-dropdown"
        )
    );

    if (!memberGrid || !memberCards.length) return;


    /* ==========================================
       FILTER STATE
    ========================================== */

    const filters = {
        department: "",
        status: "",
        search: ""
    };


    /* ==========================================
       DROPDOWN HELPERS
    ========================================== */

    function getDropdownType(dropdown) {
        return dropdown.dataset.dropdown;
    }

    function getDropdownOptions(dropdown) {
        return Array.from(
            dropdown.querySelectorAll(
                ".stackly-consult-team-dropdown-option"
            )
        );
    }

    function closeDropdown(dropdown, returnFocus = false) {

        if (!dropdown) return;

        dropdown.classList.remove("open");

        const trigger = dropdown.querySelector(
            ".stackly-consult-team-dropdown-trigger"
        );

        if (trigger) {
            trigger.setAttribute("aria-expanded", "false");

            if (returnFocus) {
                trigger.focus();
            }
        }
    }

    function closeAllDropdowns(except = null) {

        dropdowns.forEach(dropdown => {

            if (dropdown !== except) {
                closeDropdown(dropdown);
            }

        });

    }

    function openDropdown(dropdown) {

        closeAllDropdowns(dropdown);

        dropdown.classList.add("open");

        const trigger = dropdown.querySelector(
            ".stackly-consult-team-dropdown-trigger"
        );

        if (trigger) {
            trigger.setAttribute("aria-expanded", "true");
        }
    }


    /* ==========================================
       DROPDOWN INITIALIZATION
    ========================================== */

    dropdowns.forEach((dropdown, dropdownIndex) => {

        const trigger = dropdown.querySelector(
            ".stackly-consult-team-dropdown-trigger"
        );

        const valueText = dropdown.querySelector(
            ".stackly-consult-team-dropdown-value"
        );

        const options = getDropdownOptions(dropdown);

        const type = getDropdownType(dropdown);

        if (!trigger || !valueText || !options.length) return;

        // Accessibility attributes
        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");

        // Set a unique menu identifier
        const menu = dropdown.querySelector(
            ".stackly-consult-team-dropdown-menu"
        );

        if (menu) {

            const menuId = `stacklyConsultTeamMenu${dropdownIndex + 1}`;

            menu.id = menuId;

            trigger.setAttribute("aria-controls", menuId);
        }

        // Restore default selected option
        let selectedOption = options.find(option =>
            option.classList.contains("active")
        ) || options[0];

        options.forEach(option => {

            const isSelected = option === selectedOption;

            option.classList.toggle("active", isSelected);

            option.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        });

        valueText.textContent = selectedOption.textContent.trim();

        filters[type] = selectedOption.dataset.value || "";

        // Open and close dropdown
        trigger.addEventListener("click", () => {

            const isOpen = dropdown.classList.contains("open");

            if (isOpen) {
                closeDropdown(dropdown);
            } else {
                openDropdown(dropdown);
            }

        });

        // Handle option selection
        options.forEach((option, optionIndex) => {

            option.addEventListener("click", () => {

                const selectedValue = option.dataset.value || "";

                // Update selected value
                filters[type] = selectedValue;

                valueText.textContent =
                    option.textContent.trim();

                // Update active option
                options.forEach(item => {

                    const isSelected = item === option;

                    item.classList.toggle(
                        "active",
                        isSelected
                    );

                    item.setAttribute(
                        "aria-pressed",
                        String(isSelected)
                    );

                });

                // Close dropdown
                closeDropdown(dropdown, true);

                // Apply filters
                applyTeamFilters();

            });

        });

        // Keyboard navigation
        trigger.addEventListener("keydown", event => {

            if (
                event.key === "ArrowDown" ||
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                openDropdown(dropdown);

                const activeOption = options.findIndex(option =>
                    option.classList.contains("active")
                );

                const nextIndex = event.key === "ArrowDown"
                    ? Math.min(activeOption + 1, options.length - 1)
                    : Math.max(activeOption - 1, 0);

                options[nextIndex].focus();
            }

        });

        options.forEach((option, index) => {

            option.addEventListener("keydown", event => {

                let nextIndex = index;

                if (event.key === "ArrowDown") {
                    nextIndex = Math.min(index + 1, options.length - 1);
                }

                else if (event.key === "ArrowUp") {
                    nextIndex = Math.max(index - 1, 0);
                }

                else if (event.key === "Home") {
                    nextIndex = 0;
                }

                else if (event.key === "End") {
                    nextIndex = options.length - 1;
                }

                else if (event.key === "Escape") {

                    event.preventDefault();

                    closeDropdown(dropdown, true);

                    return;
                }

                else {
                    return;
                }

                event.preventDefault();

                options[nextIndex].focus();

            });

        });

    });


    /* ==========================================
       NORMALIZE SEARCH TEXT
    ========================================== */

    function normalizeText(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    /* ==========================================
       TEAM MEMBER FILTER ENGINE
    ========================================== */

    function applyTeamFilters() {

        let visibleMembers = 0;

        const searchTerm = normalizeText(filters.search);

        memberCards.forEach(card => {

            const name = normalizeText(card.dataset.name);
            const role = normalizeText(card.dataset.role);
            const email = normalizeText(card.dataset.email);
            const department = normalizeText(
                card.dataset.department
            );
            const status = normalizeText(card.dataset.status);

            // Department filter
            const matchesDepartment =
                !filters.department ||
                department === normalizeText(filters.department);

            // Status filter
            const matchesStatus =
                !filters.status ||
                status === normalizeText(filters.status);

            // Search filter
            const searchableContent = [
                name,
                role,
                email,
                department
            ].join(" ");

            const matchesSearch =
                !searchTerm ||
                searchableContent.includes(searchTerm);

            // Final result
            const shouldDisplay =
                matchesDepartment &&
                matchesStatus &&
                matchesSearch;

            // Update card visibility
            card.hidden = !shouldDisplay;

            if (shouldDisplay) {
                visibleMembers++;
            }

        });

        // Update member count
        updateMemberCount(visibleMembers);

        // Update empty state
        updateEmptyState(visibleMembers);

    }


    /* ==========================================
       DYNAMIC MEMBER COUNT
    ========================================== */

    function updateMemberCount(visibleMembers) {

        if (!memberCount) return;

        const totalMembers = memberCards.length;

        if (visibleMembers === totalMembers) {

            memberCount.textContent =
                `Showing ${totalMembers} team ${totalMembers === 1 ? "member" : "members"}`;

        } else {

            memberCount.textContent =
                `Showing ${visibleMembers} of ${totalMembers} team members`;

        }

    }


    /* ==========================================
       EMPTY SEARCH STATE
    ========================================== */

    function updateEmptyState(visibleMembers) {

        if (!emptyState) return;

        emptyState.hidden = visibleMembers !== 0;

        if (visibleMembers === 0) {

            emptyState.setAttribute("aria-live", "polite");

        }

    }


    /* ==========================================
       LIVE SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            filters.search = searchInput.value;

            applyTeamFilters();

        });

    }


    /* ==========================================
       CLICK OUTSIDE TO CLOSE
    ========================================== */

    document.addEventListener("click", event => {

        const clickedInsideDropdown = event.target.closest(
            ".stackly-consult-team-custom-dropdown"
        );

        if (!clickedInsideDropdown) {
            closeAllDropdowns();
        }

    });


    /* ==========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeAllDropdowns();

        }

    });


    /* ==========================================
       RESET FILTERS
    ========================================== */

    function resetTeamFilters() {

        filters.department = "";
        filters.status = "";
        filters.search = "";

        if (searchInput) {
            searchInput.value = "";
        }

        dropdowns.forEach(dropdown => {

            const type = getDropdownType(dropdown);

            const options = getDropdownOptions(dropdown);

            const valueText = dropdown.querySelector(
                ".stackly-consult-team-dropdown-value"
            );

            const defaultOption = options.find(option =>
                option.dataset.value === ""
            );

            if (!defaultOption) return;

            options.forEach(option => {

                const selected = option === defaultOption;

                option.classList.toggle("active", selected);

                option.setAttribute(
                    "aria-pressed",
                    String(selected)
                );

            });

            if (valueText) {
                valueText.textContent =
                    defaultOption.textContent.trim();
            }

            filters[type] = "";

            closeDropdown(dropdown);

        });

        applyTeamFilters();

    }


    /* ==========================================
       OPTIONAL GLOBAL RESET FUNCTION
    ========================================== */

    window.stacklyConsultResetTeamFilters = resetTeamFilters;

    window.stacklyConsultFilterTeamMembers = applyTeamFilters;


    /* ==========================================
       INITIALIZE DIRECTORY
    ========================================== */

    applyTeamFilters();

});



/* ==========================================
   STACKLY REPORTS & ANALYTICS
   CHART.JS CONFIGURATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    if (typeof Chart === "undefined") return;

    Chart.defaults.font.family = "'DM Sans', sans-serif";
    Chart.defaults.color = "#737b88";

    const orange = "#ff4529";
    const blue = "#4c82e8";
    const purple = "#9270df";
    const green = "#24ad83";

    const revenueCanvas = document.getElementById(
        "stacklyConsultRevenueChart"
    );

    const projectCanvas = document.getElementById(
        "stacklyConsultProjectChart"
    );

    const clientCanvas = document.getElementById(
        "stacklyConsultClientChart"
    );


    /* ==========================================
       REVENUE ANALYTICS
    ========================================== */

    let revenueChart;

    if (revenueCanvas) {

        revenueChart = new Chart(revenueCanvas, {

            type: "line",

            data: {

                labels: [
                    "Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"
                ],

                datasets: [{

                    label: "Revenue",

                    data: [
                        2.8, 3.2, 3.0, 4.1,
                        3.8, 4.5, 4.2, 5.1,
                        4.8, 5.7, 5.3, 6.2
                    ],

                    borderColor: orange,
                    backgroundColor: "rgba(255,69,41,0.10)",

                    borderWidth: 3,

                    fill: true,

                    tension: 0.42,

                    pointRadius: 3,

                    pointHoverRadius: 7,

                    pointBackgroundColor: "#ffffff",

                    pointBorderColor: orange,

                    pointBorderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: "index"
                },

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        backgroundColor: "#171b24",

                        padding: 13,

                        cornerRadius: 9,

                        callbacks: {

                            label: context =>
                                " Revenue: ₹" +
                                context.parsed.y.toFixed(2) +
                                "L"

                        }

                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        border: {
                            display: false
                        }

                    },

                    y: {

                        beginAtZero: true,

                        border: {
                            display: false
                        },

                        grid: {
                            color: "rgba(30,40,60,0.07)"
                        },

                        ticks: {

                            callback: value =>
                                "₹" + value + "L"

                        }

                    }

                }

            }

        });

    }


    /* ==========================================
       PROJECT DISTRIBUTION
    ========================================== */

    if (projectCanvas) {

        new Chart(projectCanvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Completed",
                    "In Progress",
                    "Pending"
                ],

                datasets: [{

                    data: [76, 38, 14],

                    backgroundColor: [
                        orange,
                        blue,
                        purple
                    ],

                    borderWidth: 0,

                    hoverOffset: 8,

                    spacing: 4,

                    borderRadius: 5

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "76%",

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {
                        padding: 12,
                        cornerRadius: 8
                    }

                }

            }

        });

    }


    /* ==========================================
       CLIENT ACQUISITION
    ========================================== */

    if (clientCanvas) {

        new Chart(clientCanvas, {

            type: "bar",

            data: {

                labels: [
                    "Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"
                ],

                datasets: [{

                    label: "New Clients",

                    data: [
                        28, 34, 31, 42,
                        38, 47, 43, 51,
                        46, 58, 53, 65
                    ],

                    backgroundColor: [
                        "#ffd0c8", "#ffb9ad",
                        "#ff9d8c", "#ff806b",
                        "#ff7058", "#ff624a",
                        "#ff7058", "#ff624a",
                        "#ff806b", "#ff624a",
                        "#ff5037", orange
                    ],

                    borderRadius: 7,

                    maxBarThickness: 28

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {
                        padding: 12,
                        cornerRadius: 8
                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        border: {
                            display: false
                        }

                    },

                    y: {

                        beginAtZero: true,

                        border: {
                            display: false
                        },

                        grid: {
                            color: "rgba(30,40,60,0.07)"
                        },

                        ticks: {
                            precision: 0
                        }

                    }

                }

            }

        });

    }


    /* ==========================================
       REPORT PERIOD FILTER
    ========================================== */

    const periodSelect = document.getElementById(
        "stacklyConsultReportPeriod"
    );

    if (periodSelect && revenueChart) {

        const revenueData = {

            7: [0.7, 0.9, 0.8, 1.1, 1.0, 1.2, 1.4],

            30: [
                2.8, 3.2, 3.0, 4.1,
                3.8, 4.5, 4.2, 5.1,
                4.8, 5.7, 5.3, 6.2
            ],

            90: [8.2, 9.1, 10.4, 11.8, 12.5, 14.2],

            365: [
                18, 21, 24, 27, 31, 34,
                37, 40, 42, 45, 47, 48.72
            ]

        };

        const revenueLabels = {

            7: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

            30: [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],

            90: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],

            365: [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ]

        };

        periodSelect.addEventListener("change", function () {

            const period = this.value;

            revenueChart.data.labels = revenueLabels[period];

            revenueChart.data.datasets[0].data =
                revenueData[period];

            revenueChart.update("active");

        });

    }


    /* ==========================================
       EXPORT REPORT
    ========================================== */

    const exportButton = document.getElementById(
        "stacklyConsultExportReport"
    );

    if (exportButton) {

        exportButton.addEventListener("click", function () {

            const reportData = [
                ["Stackly Corporate Consultancy - Analytics Report"],
                ["Generated Date", new Date().toLocaleDateString("en-IN")],
                [],
                ["Metric", "Value"],
                ["Total Revenue", "₹48.72L"],
                ["Active Projects", "128"],
                ["Total Clients", "1246"],
                ["Project Success Rate", "94.8%"],
                [],
                ["Department", "Performance"],
                ["Strategy & Consulting", "96%"],
                ["Finance & Accounts", "89%"],
                ["Marketing", "92%"],
                ["Technology", "85%"]
            ];

            const csvContent = reportData
                .map(row => row.map(value => {
                    const safeValue = String(value ?? "")
                        .replace(/"/g, '""');
                    return `"${safeValue}"`;
                }).join(","))
                .join("\r\n");

            const blob = new Blob(
                ["\uFEFF" + csvContent],
                { type: "text/csv;charset=utf-8;" }
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download =
                "Stackly-Analytics-Report.csv";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

        });

    }

});


/* ==========================================
   STACKLY CONSULTANCY - CLIENT ACQUISITION CHART
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const clientCanvas = document.getElementById(
        "stacklyConsultClientChart"
    );

    if (!clientCanvas) {
        console.warn("Client chart canvas not found.");
        return;
    }

    if (typeof Chart === "undefined") {
        console.error("Chart.js library is not loaded.");
        return;
    }

    // Prevent duplicate chart initialization
    const existingChart = Chart.getChart(clientCanvas);

    if (existingChart) {
        existingChart.destroy();
    }

    new Chart(clientCanvas, {

        type: "line",

        data: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],

            datasets: [{
                label: "New Clients",

                data: [
                    25, 32, 38, 35, 45, 52,
                    48, 60, 65, 72, 80, 95
                ],

                borderColor: "#ff4529",

                backgroundColor: "rgba(255, 69, 41, 0.12)",

                borderWidth: 3,

                fill: true,

                tension: 0.4,

                pointRadius: 4,

                pointHoverRadius: 7,

                pointBackgroundColor: "#ff4529",

                pointBorderColor: "#ffffff",

                pointBorderWidth: 2
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: "#080a0b",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    padding: 12,
                    displayColors: false
                }
            },

            scales: {

                x: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#777d84",
                        font: {
                            size: 12
                        }
                    }
                },

                y: {
                    beginAtZero: true,

                    grid: {
                        color: "rgba(120, 120, 120, 0.12)"
                    },

                    ticks: {
                        color: "#777d84",
                        precision: 0
                    }
                }
            }
        }
    });

});



/* ==========================================
   STACKLY CONSULTANCY - PAYMENT CHARTS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // REVENUE CHART

    const revenueCanvas = document.getElementById(
        "stacklyConsultPaymentsRevenueChart"
    );

    if (revenueCanvas && typeof Chart !== "undefined") {

        const revenueData = {
            year: {
                labels: [
                    "Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"
                ],
                values: [
                    65000, 78000, 72000, 95000,
                    88000, 110000, 105000, 125000,
                    118000, 145000, 152000, 175000
                ]
            },

            month: {
                labels: [
                    "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov"
                ],
                values: [
                    110000, 105000, 125000,
                    118000, 145000, 152000
                ]
            }
        };

        const revenueChart = new Chart(revenueCanvas, {

            type: "bar",

            data: {
                labels: revenueData.year.labels,

                datasets: [{
                    label: "Revenue",
                    data: revenueData.year.values,

                    backgroundColor: "#ff4529",
                    hoverBackgroundColor: "#e9341a",

                    borderRadius: 7,
                    borderSkipped: false,
                    barPercentage: 0.58
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        backgroundColor: "#080a0b",
                        padding: 12,

                        callbacks: {
                            label: function (context) {
                                return " Revenue: ₹" +
                                    context.parsed.y.toLocaleString("en-IN");
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        grid: {
                            display: false
                        },

                        ticks: {
                            color: "#777d84"
                        }
                    },

                    y: {
                        beginAtZero: true,

                        grid: {
                            color: "rgba(120,120,120,0.12)"
                        },

                        ticks: {
                            color: "#777d84",

                            callback: function (value) {
                                return "₹" + (value / 1000) + "k";
                            }
                        }
                    }
                }
            }

        });

        // REVENUE FILTER

        const revenueFilter = document.getElementById(
            "stacklyConsultRevenueFilter"
        );

        if (revenueFilter) {

            revenueFilter.addEventListener("change", function () {

                const selected = revenueData[this.value];

                revenueChart.data.labels = selected.labels;
                revenueChart.data.datasets[0].data = selected.values;

                revenueChart.update();

            });

        }

    }


    // PAYMENT STATUS DOUGHNUT CHART

    const statusCanvas = document.getElementById(
        "stacklyConsultPaymentsStatusChart"
    );

    if (statusCanvas && typeof Chart !== "undefined") {

        new Chart(statusCanvas, {

            type: "doughnut",

            data: {
                labels: [
                    "Completed",
                    "Pending",
                    "Failed"
                ],

                datasets: [{
                    data: [72, 20, 8],

                    backgroundColor: [
                        "#16a36a",
                        "#f2a93b",
                        "#ef5350"
                    ],

                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "76%",

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        backgroundColor: "#080a0b",
                        padding: 12,

                        callbacks: {
                            label: function (context) {
                                return " " + context.label +
                                    ": " + context.parsed + "%";
                            }
                        }
                    }
                }
            }

        });

    }

});



/* ==========================================
   STACKLY CONSULTANCY - SETTINGS NAVIGATION
   Profile | Account | Security | Notifications
   Appearance | Privacy
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* ==========================================
       ELEMENT SELECTORS
    ========================================== */

    const settingsNavLinks = document.querySelectorAll(
        ".stackly-consult-settings-nav-link"
    );

    const settingsCards = document.querySelectorAll(
        ".stackly-consult-settings-content > .stackly-consult-settings-card"
    );

    const settingsContent = document.querySelector(
        ".stackly-consult-settings-content"
    );

    if (
        !settingsNavLinks.length ||
        !settingsCards.length ||
        !settingsContent
    ) {
        console.warn("Settings navigation elements not found.");
        return;
    }


    /* ==========================================
       SHOW SELECTED SETTINGS SECTION
    ========================================== */

    function showSettingsSection(targetId) {

        let selectedCard = document.getElementById(targetId);

        // Fallback to Profile Settings if target is invalid
        if (
            !selectedCard ||
            !selectedCard.classList.contains(
                "stackly-consult-settings-card"
            )
        ) {
            targetId = "stacklyConsultProfileSettings";

            selectedCard = document.getElementById(targetId);
        }

        if (!selectedCard) return;


        // Hide all settings cards
        settingsCards.forEach(function (card) {

            card.classList.remove("active");

            card.hidden = true;

        });


        // Remove active state from all navigation links
        settingsNavLinks.forEach(function (link) {

            link.classList.remove("active");

            link.setAttribute("aria-current", "false");

        });


        // Show selected card
        selectedCard.hidden = false;

        selectedCard.classList.add("active");


        // Activate matching navigation link
        settingsNavLinks.forEach(function (link) {

            const linkTarget = link.getAttribute("href");

            if (linkTarget === "#" + targetId) {

                link.classList.add("active");

                link.setAttribute("aria-current", "page");

            }

        });


        // Refresh AOS animations when available
        if (typeof AOS !== "undefined") {

            AOS.refreshHard();

        }

    }


    /* ==========================================
       NAVIGATION CLICK EVENTS
    ========================================== */

    settingsNavLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);

            showSettingsSection(targetId);

            // Update URL hash without jumping the page
            if (history.replaceState) {

                history.replaceState(
                    null,
                    "",
                    "#" + targetId
                );

            }

        });

    });


    /* ==========================================
       INITIAL SETTINGS SECTION
    ========================================== */

    const initialSection = window.location.hash
        ? window.location.hash.substring(1)
        : "stacklyConsultProfileSettings";

    showSettingsSection(initialSection);


    /* ==========================================
       HANDLE BROWSER BACK / FORWARD
    ========================================== */

    window.addEventListener("hashchange", function () {

        const targetId = window.location.hash.substring(1);

        showSettingsSection(targetId);

    });


    /* ==========================================
       SAVE SETTINGS BUTTON
    ========================================== */

    const saveButton = document.getElementById(
        "stacklyConsultSettingsSave"
    );

    if (saveButton) {

        saveButton.addEventListener("click", function () {

            const activeCard = document.querySelector(
                ".stackly-consult-settings-card.active"
            );

            if (!activeCard) return;

            // Save the current section's form values locally
            const settingsData = {};

            activeCard.querySelectorAll(
                "input, select, textarea"
            ).forEach(function (field) {

                if (!field.id && !field.name) return;

                const key = field.id || field.name;

                if (field.type === "checkbox") {

                    settingsData[key] = field.checked;

                } else if (field.type === "radio") {

                    if (field.checked) {
                        settingsData[key] = field.value;
                    }

                } else {

                    settingsData[key] = field.value;

                }

            });

            try {

                const savedSettings = JSON.parse(
                    localStorage.getItem(
                        "stacklyConsultAdminSettings"
                    ) || "{}"
                );

                Object.assign(savedSettings, settingsData);

                localStorage.setItem(
                    "stacklyConsultAdminSettings",
                    JSON.stringify(savedSettings)
                );

                const originalText = saveButton.innerHTML;

                saveButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Saved Successfully';

                saveButton.disabled = true;

                setTimeout(function () {

                    saveButton.innerHTML = originalText;

                    saveButton.disabled = false;

                }, 1800);

            } catch (error) {

                console.error("Unable to save settings:", error);

            }

        });

    }

});


/* ==========================================
   STACKLY CONSULTANCY - AUTO PROFILE DETAILS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const emailInput = document.getElementById(
        "stacklyConsultEmail"
    );

    const usernameInput = document.getElementById(
        "stacklyConsultUsername"
    );

    const profileName = document.querySelector(
        ".stackly-consult-settings-profile h4"
    );

    if (!emailInput || !usernameInput) return;


    // Get logged-in user's email
    const userEmail = localStorage.getItem("loginEmail") || "";

    // Display email
    emailInput.value = userEmail;


    // Extract username from email
    if (userEmail.includes("@")) {

        const username = userEmail
            .split("@")[0]
            .trim();

        usernameInput.value = username;

        // Update profile heading
        if (profileName) {

            profileName.textContent = username;

        }

    } else {

        usernameInput.value = "";

        if (profileName) {
            profileName.textContent = "Administrator";
        }

    }

});