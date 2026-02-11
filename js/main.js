// add class active to header on scroll

let header = document.querySelector("header")

// theme toggle
const body = document.body;
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
    if (theme === "light") {
        body.classList.add("light-theme");
    } else {
        body.classList.remove("light-theme");
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const icon = btn.querySelector("i");
    if (!icon) return;
    if (body.classList.contains("light-theme")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

function toggleTheme() {
    const isLight = body.classList.toggle("light-theme");
    const theme = isLight ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon();
}

// init theme from storage
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    updateThemeIcon();
}

// header on scroll
window.onscroll = function(){
    if (this.scrollY >= 50) {
        header.classList.add("active")
    }else{
        header.classList.remove("active")
    }
}

let nav_links = document.getElementById("links");

function Open_colose_Menu() {
    nav_links.classList.toggle("active")
}

// scroll reveal animation
const revealElements = document.querySelectorAll(
    ".about .container, .education .education-timeline, .skills .skills-grid, .services .boxs .box, .projects .project_box, .follow .container, .contact .container"
);

const observerOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");

            // animate Follow Me social links when follow section appears
            if (entry.target.matches(".follow .container")) {
                const socialLinks = entry.target.querySelectorAll(".soial_contact .links a");
                socialLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.classList.add("show");
                    }, index * 120);
                });
            }

            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});
