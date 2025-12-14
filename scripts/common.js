document.addEventListener("DOMContentLoaded", function () {

    // Automatically determine base path for GitHub Pages
    let basePath = "";
    const pathSegments = window.location.pathname.split("/").filter(seg => seg.length > 0);

    // If page is inside a subfolder, adjust base path
    if (pathSegments.length > 1) {
        basePath = "../".repeat(pathSegments.length - 1);
    }

    // Fetch nav
    fetch(basePath + "nav.html")
        .then(response => response.text())
        .then(data => {
            const nav = document.getElementById("nav");
            nav.innerHTML = data;

            const currentPath = window.location.pathname; // full path of current page
            const navLinks = nav.querySelectorAll("a");

            navLinks.forEach(link => {
                const linkPath = new URL(link.getAttribute("href"), window.location.origin).pathname;
                if (linkPath === currentPath) {
                    link.remove(); // remove only the exact current page link
                }
            });
        });

    // Fetch footer
    fetch(basePath + "footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footerContent").innerHTML = data;
        });

});