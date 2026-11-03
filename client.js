
/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   CLIENT DASHBOARD JAVASCRIPT
========================================== */

(function () {
    "use strict";

    /* ==========================================
       DOM ELEMENTS
    ========================================== */

    const body = document.body;

    const sidebar = document.getElementById(
        "stacklyConsultClientSidebar"
    );

    const overlay = document.getElementById(
        "stacklyConsultClientOverlay"
    );

    const menuToggle = document.getElementById(
        "stacklyConsultClientMenuToggle"
    );

    const menuClose = document.getElementById(
        "stacklyConsultClientClose"
    );

    const emailElement = document.getElementById(
        "stacklyConsultClientEmail"
    );

    const welcomeName = document.getElementById(
        "stacklyConsultClientWelcomeName"
    );

    const sidebarName = document.getElementById(
        "stacklyConsultClientSidebarName"
    );


    /* ==========================================
       MOBILE SIDEBAR
    ========================================== */

    function openClientMenu() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("active");
        overlay.classList.add("active");

        body.classList.add(
            "stackly-consult-client-menu-active"
        );

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
        }

        if (menuClose) {
            menuClose.focus();
        }
    }


    function closeClientMenu() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

        body.classList.remove(
            "stackly-consult-client-menu-active"
        );

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    }


    if (menuToggle) {
        menuToggle.addEventListener("click", function () {

            const isOpen = sidebar &&
                sidebar.classList.contains("active");

            if (isOpen) {
                closeClientMenu();
            } else {
                openClientMenu();
            }

        });
    }


    if (menuClose) {
        menuClose.addEventListener("click", closeClientMenu);
    }


    if (overlay) {
        overlay.addEventListener("click", closeClientMenu);
    }


    /* ==========================================
       CLOSE MENU WITH ESCAPE KEY
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeClientMenu();
        }

    });


    /* ==========================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ========================================== */

    if (sidebar) {

        const sidebarLinks = sidebar.querySelectorAll(
            ".stackly-consult-client-nav-link"
        );

        sidebarLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeClientMenu();
            });

        });
    }


    /* ==========================================
       RESET MOBILE MENU ON DESKTOP
    ========================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {
            closeClientMenu();
        }

    });


    /* ==========================================
       DYNAMIC CLIENT INFORMATION
    ========================================== */

    function loadClientInformation() {

        let clientEmail = "";

        let clientName = "";

        try {

            clientEmail =
                localStorage.getItem("loginEmail") ||
                localStorage.getItem("stacklyConsultClientEmail") ||
                "";

            clientName =
                localStorage.getItem("stacklyConsultClientName") ||
                "";

        } catch (error) {

            console.warn(
                "Client information could not be accessed.",
                error
            );

        }


        // Use the email prefix if no saved name exists.

        if (!clientName && clientEmail.includes("@")) {

            clientName = clientEmail
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .replace(/\b\w/g, function (letter) {
                    return letter.toUpperCase();
                });

        }


        // Default information.

        if (!clientName) {
            clientName = "Client";
        }

        if (!clientEmail) {
            clientEmail = "client@example.com";
        }


        // Update welcome name.

        if (welcomeName) {
            welcomeName.textContent = clientName;
        }


        // Update sidebar name.

        if (sidebarName) {
            sidebarName.textContent = clientName;
        }


        // Update header email.

        if (emailElement) {
            emailElement.textContent = clientEmail;
            emailElement.title = clientEmail;
        }

    }


    loadClientInformation();


    /* ==========================================
       ACTIVE SIDEBAR NAVIGATION
    ========================================== */

    function setActiveNavigation() {

        const currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        const navigationLinks = document.querySelectorAll(
            ".stackly-consult-client-nav-link"
        );

        navigationLinks.forEach(function (link) {

            const linkPage = link.getAttribute("href")
                .split("/")
                .pop()
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


    setActiveNavigation();


    /* ==========================================
       AOS SCROLL ANIMATIONS
    ========================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 950,

            easing: "ease-out-cubic",

            once: true,

            offset: 70,

            delay: 0,

            mirror: false,

            anchorPlacement: "top-bottom"

        });

    }


    /* ==========================================
       ANIMATED STATISTICS
    ========================================== */

    function animateClientCounters() {

        const statNumbers = document.querySelectorAll(
            ".stackly-consult-client-stat-card h3"
        );

        statNumbers.forEach(function (number) {

            const target = parseInt(
                number.textContent.replace(/[^\d]/g, ""),
                10
            );

            if (isNaN(target)) return;

            const originalText = number.textContent.trim();

            const duration = 1200;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                // Smooth ease-out animation.

                const easedProgress = 1 - Math.pow(
                    1 - progress,
                    4
                );

                const currentValue = Math.floor(
                    easedProgress * target
                );

                number.textContent = String(currentValue)
                    .padStart(originalText.length, "0");

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    number.textContent = originalText;

                }

            }

            requestAnimationFrame(updateCounter);

        });

    }


    /* ==========================================
       COUNTER ANIMATION ON PAGE LOAD
    ========================================== */

    if ("requestAnimationFrame" in window) {

        window.addEventListener("load", function () {

            setTimeout(function () {
                animateClientCounters();
            }, 350);

        });

    }


    /* ==========================================
       PROJECT PROGRESS BAR ANIMATION
    ========================================== */

    function animateProjectProgress() {

        const progressBars = document.querySelectorAll(
            ".stackly-consult-client-progress-track span"
        );

        progressBars.forEach(function (bar) {

            const finalWidth = bar.style.width;

            bar.dataset.progress = finalWidth;

            bar.style.width = "0%";

            requestAnimationFrame(function () {

                setTimeout(function () {

                    bar.style.width = finalWidth;

                }, 250);

            });

        });

    }


    window.addEventListener("load", function () {

        animateProjectProgress();

    });


    /* ==========================================
       QUICK ACTION CARD ACCESSIBILITY
    ========================================== */

    const quickCards = document.querySelectorAll(
        ".stackly-consult-client-quick-card"
    );

    quickCards.forEach(function (card) {

        card.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                card.click();

            }

        });

    });


    /* ==========================================
       LOGOUT HANDLING
    ========================================== */

    const logoutLink = document.querySelector(
        ".stackly-consult-client-logout"
    );

    if (logoutLink) {

        logoutLink.addEventListener("click", function () {

            try {

                localStorage.removeItem("loginEmail");

                localStorage.removeItem(
                    "stacklyConsultClientEmail"
                );

                localStorage.removeItem(
                    "stacklyConsultClientName"
                );

            } catch (error) {

                console.warn(
                    "Unable to clear client information.",
                    error
                );

            }

            // Continue to the existing index.html link.

        });

    }


    /* ==========================================
       PREVENT UNWANTED DOUBLE-CLICK ZOOM
       ON MOBILE MENU BUTTON
    ========================================== */

    if (menuToggle) {

        menuToggle.addEventListener("dblclick", function (event) {
            event.preventDefault();
        });

    }


    /* ==========================================
       REFRESH AOS AFTER FULL PAGE LOAD
    ========================================== */

    window.addEventListener("load", function () {

        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }

    });


    /* ==========================================
       DASHBOARD INITIALIZED
    ========================================== */

    console.log(
        "Stackly Client Dashboard initialized successfully."
    );

})();



/* ==========================================
   STACKLY CORPORATE CONSULTANCY
   CLIENT PROJECT MANAGEMENT
   Professional Project Filter & Search
========================================== */

(function () {
    "use strict";

    /* ==========================================
       DOM ELEMENTS
    ========================================== */

    const projectSection = document.querySelector(
        ".stackly-consult-client-project-management"
    );

    if (!projectSection) return;

    const projectGrid = projectSection.querySelector(
        "#stacklyConsultClientProjectGrid"
    );

    const projectCards = Array.from(
        projectSection.querySelectorAll(
            ".stackly-consult-client-project-card"
        )
    );

    const filterButtons = Array.from(
        projectSection.querySelectorAll(
            ".stackly-consult-client-project-filter"
        )
    );

    const searchInput = projectSection.querySelector(
        "#stacklyConsultClientProjectSearch"
    );

    if (!projectGrid || !projectCards.length) return;


    /* ==========================================
       PROJECT STATE
    ========================================== */

    let activeFilter = "all";
    let searchQuery = "";

    const animationDuration = 250;


    /* ==========================================
       EMPTY STATE
    ========================================== */

    const emptyState = document.createElement("div");

    emptyState.className =
        "stackly-consult-client-project-empty";

    emptyState.innerHTML = `
        <div class="stackly-consult-client-project-empty-icon">
            <i class="fa-solid fa-folder-open"></i>
        </div>

        <h3>No Projects Found</h3>

        <p>
            We couldn't find any projects matching your search.
            Try another keyword or select a different category.
        </p>

        <button type="button"
            class="stackly-consult-client-project-reset">
            <i class="fa-solid fa-rotate-left"></i>
            Reset Filters
        </button>
    `;

    projectGrid.insertAdjacentElement("afterend", emptyState);


    /* ==========================================
       AUTOMATIC PROJECT COUNTS
    ========================================== */

    function updateProjectCounts() {

        const counts = {
            all: projectCards.length,
            progress: 0,
            completed: 0,
            review: 0
        };

        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (Object.prototype.hasOwnProperty.call(counts, category)) {
                counts[category]++;
            }

        });

        filterButtons.forEach(button => {

            const category = button.dataset.filter;
            const countElement = button.querySelector("span");

            if (countElement && counts[category] !== undefined) {
                countElement.textContent = String(
                    counts[category]
                ).padStart(2, "0");
            }

        });

    }


    /* ==========================================
       PROJECT FILTERING
    ========================================== */

    function filterProjects() {

        const normalizedSearch = searchQuery
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        projectCards.forEach((card, index) => {

            const category = card.dataset.category || "";

            const projectText = card.textContent
                .toLowerCase();

            const matchesCategory =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                normalizedSearch === "" ||
                projectText.includes(normalizedSearch);

            const shouldShow =
                matchesCategory && matchesSearch;

            if (shouldShow) {

                visibleCount++;

                card.hidden = false;

                card.style.display = "flex";

                card.classList.remove(
                    "stackly-project-hidden"
                );

                card.classList.remove(
                    "stackly-project-visible"
                );

                // Re-trigger animation
                void card.offsetWidth;

                card.classList.add(
                    "stackly-project-visible"
                );

                card.style.animationDelay =
                    `${Math.min(index % 3, 2) * 70}ms`;

            } else {

                card.classList.remove(
                    "stackly-project-visible"
                );

                card.classList.add(
                    "stackly-project-hidden"
                );

                card.hidden = true;

                card.style.display = "none";

            }

        });


        /* ==========================================
           EMPTY STATE VISIBILITY
        ========================================== */

        emptyState.classList.toggle(
            "active",
            visibleCount === 0
        );

        projectGrid.classList.toggle(
            "stackly-project-no-results",
            visibleCount === 0
        );

    }


    /* ==========================================
       FILTER BUTTON EVENTS
    ========================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            const selectedFilter = this.dataset.filter;

            if (!selectedFilter) return;

            activeFilter = selectedFilter;

            filterButtons.forEach(filterButton => {

                const isActive =
                    filterButton === this;

                filterButton.classList.toggle(
                    "active",
                    isActive
                );

                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            filterProjects();

        });

    });


    /* ==========================================
       LIVE PROJECT SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            searchQuery = this.value;

            filterProjects();

        });

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                this.value = "";

                searchQuery = "";

                filterProjects();

            }

        });

    }


    /* ==========================================
       RESET FILTERS
    ========================================== */

    const resetButton = emptyState.querySelector(
        ".stackly-consult-client-project-reset"
    );

    resetButton.addEventListener("click", function () {

        activeFilter = "all";
        searchQuery = "";

        if (searchInput) {
            searchInput.value = "";
        }

        filterButtons.forEach(button => {

            const isAll =
                button.dataset.filter === "all";

            button.classList.toggle("active", isAll);

            button.setAttribute(
                "aria-pressed",
                String(isAll)
            );

        });

        filterProjects();

    });


    /* ==========================================
       PROJECT CARD HOVER INTERACTION
    ========================================== */

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.classList.add(
                "stackly-project-card-hover"
            );

        });

        card.addEventListener("mouseleave", function () {

            this.classList.remove(
                "stackly-project-card-hover"
            );

        });

    });


    /* ==========================================
       ACCESSIBILITY
    ========================================== */

    filterButtons.forEach(button => {

        button.setAttribute(
            "aria-pressed",
            String(button.classList.contains("active"))
        );

    });

    projectCards.forEach(card => {

        card.setAttribute("tabindex", "0");

    });


    /* ==========================================
       INITIALIZE PROJECT MANAGEMENT
    ========================================== */

    updateProjectCounts();

    filterProjects();

    console.log(
        "Stackly Client Project Management initialized successfully."
    );

})();



/* ==========================================
   STACKLY CLIENT - MEETING CALENDAR
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const calendarGrid = document.getElementById(
        "stacklyClientCalendarGrid"
    );

    const monthLabel = document.getElementById(
        "stacklyClientCalendarMonth"
    );

    const selectedDateLabel = document.getElementById(
        "stacklyClientSelectedDate"
    );

    const previousButton = document.getElementById(
        "stacklyClientCalendarPrev"
    );

    const nextButton = document.getElementById(
        "stacklyClientCalendarNext"
    );

    if (
        !calendarGrid ||
        !monthLabel ||
        !selectedDateLabel ||
        !previousButton ||
        !nextButton
    ) {
        console.warn("Meeting calendar elements not found.");
        return;
    }

    let currentDate = new Date(2026, 10, 1);
    let selectedDate = new Date(2026, 10, 5);

    const meetingDates = [
        "2026-11-05",
        "2026-11-10",
        "2026-11-15",
        "2026-11-20"
    ];

    function formatDate(date) {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    function renderCalendar() {

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        monthLabel.textContent = currentDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );

        calendarGrid.querySelectorAll(".calendar-date").forEach(
            date => date.remove()
        );

        // Empty spaces before the first day.

        for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement("span");
            emptyDate.className = "calendar-date empty";
            calendarGrid.appendChild(emptyDate);
        }

        // Calendar dates.

        for (let day = 1; day <= totalDays; day++) {

            const date = new Date(year, month, day);
            const dateString = formatDate(date);

            const dateButton = document.createElement("button");

            dateButton.type = "button";
            dateButton.className = "calendar-date";
            dateButton.textContent = day;
            dateButton.setAttribute(
                "aria-label",
                date.toDateString()
            );

            const today = new Date();

            if (dateString === formatDate(today)) {
                dateButton.classList.add("today");
            }

            if (dateString === formatDate(selectedDate)) {
                dateButton.classList.add("selected");
            }

            if (meetingDates.includes(dateString)) {
                dateButton.classList.add("has-meeting");
            }

            dateButton.addEventListener("click", function () {

                selectedDate = new Date(year, month, day);

                selectedDateLabel.textContent =
                    selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric"
                    });

                renderCalendar();

            });

            calendarGrid.appendChild(dateButton);
        }
    }

    previousButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    selectedDateLabel.textContent =
        selectedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        });

    renderCalendar();

});

/* ==========================================
   STACKLY CLIENT - MEETING CALENDAR
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const calendarGrid = document.getElementById(
        "stacklyClientCalendarGrid"
    );

    const monthLabel = document.getElementById(
        "stacklyClientCalendarMonth"
    );

    const selectedDateLabel = document.getElementById(
        "stacklyClientSelectedDate"
    );

    const previousButton = document.getElementById(
        "stacklyClientCalendarPrev"
    );

    const nextButton = document.getElementById(
        "stacklyClientCalendarNext"
    );

    if (
        !calendarGrid ||
        !monthLabel ||
        !selectedDateLabel ||
        !previousButton ||
        !nextButton
    ) {
        console.warn("Meeting calendar elements not found.");
        return;
    }

    let currentDate = new Date(2026, 10, 1);
    let selectedDate = new Date(2026, 10, 5);

    const meetingDates = [
        "2026-11-05",
        "2026-11-10",
        "2026-11-15",
        "2026-11-20"
    ];

    function formatDate(date) {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    function renderCalendar() {

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        monthLabel.textContent = currentDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );

        calendarGrid.querySelectorAll(".calendar-date").forEach(
            date => date.remove()
        );

        // Empty spaces before the first day.

        for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement("span");
            emptyDate.className = "calendar-date empty";
            calendarGrid.appendChild(emptyDate);
        }

        // Calendar dates.

        for (let day = 1; day <= totalDays; day++) {

            const date = new Date(year, month, day);
            const dateString = formatDate(date);

            const dateButton = document.createElement("button");

            dateButton.type = "button";
            dateButton.className = "calendar-date";
            dateButton.textContent = day;
            dateButton.setAttribute(
                "aria-label",
                date.toDateString()
            );

            const today = new Date();

            if (dateString === formatDate(today)) {
                dateButton.classList.add("today");
            }

            if (dateString === formatDate(selectedDate)) {
                dateButton.classList.add("selected");
            }

            if (meetingDates.includes(dateString)) {
                dateButton.classList.add("has-meeting");
            }

            dateButton.addEventListener("click", function () {

                selectedDate = new Date(year, month, day);

                selectedDateLabel.textContent =
                    selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric"
                    });

                renderCalendar();

            });

            calendarGrid.appendChild(dateButton);
        }
    }

    previousButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    selectedDateLabel.textContent =
        selectedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        });

    renderCalendar();

});



/* ==========================================
   STACKLY CLIENT - INVOICE SEARCH & FILTER
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById(
        "stacklyConsultInvoiceSearch"
    );

    const filterSelect = document.getElementById(
        "stacklyConsultInvoiceFilter"
    );

    const resetButton = document.getElementById(
        "stacklyConsultInvoiceReset"
    );

    const tableBody = document.getElementById(
        "stacklyConsultInvoiceTableBody"
    );

    const emptyMessage = document.getElementById(
        "stacklyConsultInvoiceEmpty"
    );

    if (!searchInput || !filterSelect || !tableBody) return;

    const invoiceRows = Array.from(
        tableBody.querySelectorAll("tr")
    );

    function filterInvoices() {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        const selectedStatus = filterSelect.value;

        let visibleCount = 0;

        invoiceRows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();

            const rowStatus = row.dataset.status;

            const matchesSearch = rowText.includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;

            const visible = matchesSearch && matchesStatus;

            row.style.display = visible ? "" : "none";

            if (visible) {
                visibleCount++;
            }

        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }

    }

    searchInput.addEventListener("input", filterInvoices);

    filterSelect.addEventListener("change", filterInvoices);

    if (resetButton) {

        resetButton.addEventListener("click", function () {

            searchInput.value = "";
            filterSelect.value = "all";

            filterInvoices();

        });

    }

});



/* =====================================================
   STACKLY CORPORATE CONSULTANCY
   CLIENT INVOICES - MANAGEMENT SYSTEM
   Search + Custom Dropdown + Status Filter + Reset
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* ==========================================
       ELEMENT REFERENCES
    ========================================== */

    const invoiceSearch = document.getElementById(
        "stacklyConsultInvoiceSearch"
    );

    const invoiceDropdown = document.getElementById(
        "stacklyConsultInvoiceDropdown"
    );

    const dropdownToggle = document.getElementById(
        "stacklyConsultInvoiceDropdownToggle"
    );

    const dropdownMenu = document.getElementById(
        "stacklyConsultInvoiceDropdownMenu"
    );

    const selectedText = document.getElementById(
        "stacklyConsultInvoiceSelected"
    );

    const resetButton = document.getElementById(
        "stacklyConsultInvoiceReset"
    );

    const invoiceTableBody = document.getElementById(
        "stacklyConsultInvoiceTableBody"
    );

    const emptyState = document.getElementById(
        "stacklyConsultInvoiceEmpty"
    );

    const invoiceFooter = document.querySelector(
        ".stackly-consult-invoice-table-footer span"
    );

    /* ==========================================
       ELEMENT VALIDATION
    ========================================== */

    if (
        !invoiceSearch ||
        !invoiceDropdown ||
        !dropdownToggle ||
        !dropdownMenu ||
        !selectedText ||
        !resetButton ||
        !invoiceTableBody ||
        !emptyState
    ) {
        return;
    }

    /* ==========================================
       INVOICE DATA ELEMENTS
    ========================================== */

    const invoiceRows = Array.from(
        invoiceTableBody.querySelectorAll("tr[data-status]")
    );

    const dropdownOptions = Array.from(
        dropdownMenu.querySelectorAll("button[data-value]")
    );

    const totalInvoices = invoiceRows.length;

    let activeStatus = "all";

    /* ==========================================
       DROPDOWN ACCESSIBILITY
    ========================================== */

    dropdownToggle.setAttribute(
        "aria-controls",
        dropdownMenu.id
    );

    dropdownToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    dropdownMenu.setAttribute(
        "role",
        "group"
    );

    dropdownOptions.forEach(function (option) {

        option.setAttribute("type", "button");

    });

    /* ==========================================
       OPEN DROPDOWN
    ========================================== */

    function openDropdown() {

        dropdownMenu.hidden = false;

        dropdownToggle.classList.add("active");

        dropdownToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    /* ==========================================
       CLOSE DROPDOWN
    ========================================== */

    function closeDropdown() {

        dropdownMenu.hidden = true;

        dropdownToggle.classList.remove("active");

        dropdownToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    /* ==========================================
       DROPDOWN TOGGLE
    ========================================== */

    dropdownToggle.addEventListener("click", function () {

        const isExpanded =
            dropdownToggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {

            closeDropdown();

        } else {

            openDropdown();

        }

    });

    /* ==========================================
       SELECT DROPDOWN OPTION
    ========================================== */

    dropdownOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            activeStatus = option.dataset.value;

            selectedText.textContent =
                option.textContent.trim();

            /* Update active option */

            dropdownOptions.forEach(function (item) {

                item.classList.remove("active");

                item.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });

            option.classList.add("active");

            option.setAttribute(
                "aria-pressed",
                "true"
            );

            /* Close dropdown */

            closeDropdown();

            /* Apply filters */

            filterInvoices();

        });

    });

    /* ==========================================
       INVOICE SEARCH
    ========================================== */

    invoiceSearch.addEventListener("input", function () {

        filterInvoices();

    });

    /* ==========================================
       FILTER INVOICES
    ========================================== */

    function filterInvoices() {

        const searchValue = invoiceSearch.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        invoiceRows.forEach(function (row) {

            const invoiceStatus = (
                row.dataset.status || ""
            ).toLowerCase();

            const invoiceContent = row.textContent
                .toLowerCase();

            /* Status matching */

            const matchesStatus =
                activeStatus === "all" ||
                invoiceStatus === activeStatus;

            /* Search matching */

            const matchesSearch =
                invoiceContent.includes(searchValue);

            /* Final visibility */

            const shouldShow =
                matchesStatus && matchesSearch;

            row.hidden = !shouldShow;

            if (shouldShow) {

                visibleCount++;

            }

        });

        /* Update empty state */

        emptyState.hidden = visibleCount !== 0;

        /* Update invoice count */

        updateInvoiceCount(visibleCount);

    }

    /* ==========================================
       UPDATE INVOICE COUNT
    ========================================== */

    function updateInvoiceCount(visibleCount) {

        if (!invoiceFooter) return;

        const invoiceLabel =
            totalInvoices === 1 ? "invoice" : "invoices";

        invoiceFooter.textContent =
            `Showing ${visibleCount} of ${totalInvoices} ${invoiceLabel}`;

    }

    /* ==========================================
       RESET ALL FILTERS
    ========================================== */

    resetButton.addEventListener("click", function () {

        /* Clear search */

        invoiceSearch.value = "";

        /* Reset status */

        activeStatus = "all";

        selectedText.textContent = "All Invoices";

        /* Reset dropdown options */

        dropdownOptions.forEach(function (option) {

            const isDefault =
                option.dataset.value === "all";

            option.classList.toggle("active", isDefault);

            option.setAttribute(
                "aria-pressed",
                String(isDefault)
            );

        });

        /* Close dropdown */

        closeDropdown();

        /* Show all invoices */

        filterInvoices();

        /* Return focus to search */

        invoiceSearch.focus();

    });

    /* ==========================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ========================================== */

    document.addEventListener("click", function (event) {

        if (!invoiceDropdown.contains(event.target)) {

            closeDropdown();

        }

    });

    /* ==========================================
       ESCAPE KEY SUPPORT
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            const isExpanded =
                dropdownToggle.getAttribute("aria-expanded") === "true";

            if (isExpanded) {

                closeDropdown();

                dropdownToggle.focus();

            }

        }

    });

    /* ==========================================
       INITIALIZE INVOICE SYSTEM
    ========================================== */

    dropdownOptions.forEach(function (option) {

        const isDefault =
            option.dataset.value === "all";

        option.setAttribute(
            "aria-pressed",
            String(isDefault)
        );

    });

    filterInvoices();

});


/* ==========================================
   STACKLY CLIENT PROFILE
   DYNAMIC USER NAME AND EMAIL
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Get logged-in email from localStorage
    const email = (
        localStorage.getItem("loginEmail") ||
        localStorage.getItem("stacklyLoginEmail") ||
        localStorage.getItem("userEmail") ||
        ""
    ).trim().toLowerCase();

    // Check email availability
    if (!email) {
        console.warn("Client email not found in localStorage.");
        return;
    }

    // Extract username before @
    const emailUsername = email.split("@")[0];

    // Split username using dot, underscore, hyphen
    const nameParts = emailUsername
        .split(/[._-]+/)
        .filter(Boolean)
        .map(part => part.replace(/[^a-zA-Z]/g, ""))
        .filter(Boolean);

    // Format name
    function capitalizeName(value) {
        return value
            ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            : "";
    }

    // Get first and last name
    const firstName = capitalizeName(nameParts[0]) || "Client";
    const lastName = capitalizeName(nameParts[1]) || "";

    // Full display name
    const fullName = [firstName, lastName]
        .filter(Boolean)
        .join(" ");

    // Update profile heading name
    const profileName = document.getElementById(
        "stacklyConsultProfileName"
    );

    if (profileName) {
        profileName.textContent = fullName;
    }

    // Update first name
    const profileFirstName = document.getElementById(
        "stacklyConsultProfileFirstName"
    );

    if (profileFirstName) {
        profileFirstName.textContent = firstName;
    }

    // Update last name
    const profileLastName = document.getElementById(
        "stacklyConsultProfileLastName"
    );

    if (profileLastName) {
        profileLastName.textContent = lastName || "Not provided";
    }

    // Update overview email
    const overviewEmail = document.getElementById(
        "stacklyConsultProfileOverviewEmail"
    );

    if (overviewEmail) {
        overviewEmail.textContent = email;
    }

    // Update personal information email
    const profileEmail = document.getElementById(
        "stacklyConsultProfileEmail"
    );

    if (profileEmail) {
        profileEmail.textContent = email;
    }

});