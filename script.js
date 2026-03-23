document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const themeBtn = document.getElementById("theme-toggle");

    /**
     * Navigation Logic
     */
    function navigate(id) {
        const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
        if (!activeLink) return;

        // 1. Update Navigation UI
        navItems.forEach(item => item.classList.remove("active"));
        activeLink.classList.add("active");

        // 2. Switch Pages with Animation
        pages.forEach(page => page.classList.remove("active"));
        const targetPage = document.getElementById(id);
        if (targetPage) {
            targetPage.classList.add("active");
            // 独立滚动条复位
            targetPage.scrollTop = 0;
        }

        // 3. Update Title
        const categoryName = activeLink.getAttribute("data-name");
        document.title = `${categoryName} - xhyor`;
    }

    // Click Events
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const id = item.getAttribute("href").substring(1);
            navigate(id);
            window.location.hash = id;
        });
    });

    // Theme Toggle
    themeBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
    });

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