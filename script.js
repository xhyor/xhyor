document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
    const pages = document.querySelectorAll(".page");
    const themeBtn = document.getElementById("theme-toggle");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenuClose = document.getElementById("mobile-menu-close");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const mobileNav = document.getElementById("mobile-nav");

    /**
     * Navigation Logic
     */
    function navigate(id) {
        const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
        const activeMobileLink = document.querySelector(`.mobile-nav-item[href="#${id}"]`);

        // 1. Update Navigation UI (desktop)
        navItems.forEach(item => item.classList.remove("active"));
        if (activeLink) activeLink.classList.add("active");

        // 2. Update Navigation UI (mobile)
        mobileNavItems.forEach(item => item.classList.remove("active"));
        if (activeMobileLink) activeMobileLink.classList.add("active");

        // 3. Switch Pages with Animation
        pages.forEach(page => page.classList.remove("active"));
        const targetPage = document.getElementById(id);
        if (targetPage) {
            targetPage.classList.add("active");
            // 独立滚动条复位
            targetPage.scrollTop = 0;
        } else {
            // Fallback to home if page not found
            const homePage = document.getElementById("home");
            if (homePage) homePage.classList.add("active");
            return;
        }

        // 4. Update Title
        const categoryName = activeLink ? activeLink.getAttribute("data-name") : (activeMobileLink ? activeMobileLink.getAttribute("data-name") : "Home");
        document.title = `${categoryName} - xhyor`;
    }

    // Click Events (desktop)
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const id = item.getAttribute("href").substring(1);
            navigate(id);
            window.location.hash = id;
        });
    });

    // Click Events (mobile)
    mobileNavItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const id = item.getAttribute("href").substring(1);
            navigate(id);
            window.location.hash = id;
            closeMobileMenu();
        });
    });

    // Theme Toggle
    themeBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
    });

    // Mobile Menu Functions
    function openMobileMenu() {
        mobileMenuOverlay.classList.add("active");
        mobileNav.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
    }

    mobileMenuToggle.addEventListener("click", openMobileMenu);
    mobileMenuClose.addEventListener("click", closeMobileMenu);
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);

    // Works 图片变量处理
    document.querySelectorAll('.grid-item').forEach(item => {
        const bgVar = getComputedStyle(item).getPropertyValue('--bg');
        if (bgVar && bgVar.trim() !== "") {
            item.style.backgroundImage = bgVar;
        }
    });

    // Initial Load
    const initialId = window.location.hash.substring(1) || "home";
    navigate(initialId);
});