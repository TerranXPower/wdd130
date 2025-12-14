if (window.location.pathname === "/wdd130/" || window.location.pathname === "/wdd130") {
    window.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", function () {

    // Set a base URL for GitHub Pages vs local
    const repoName = "wdd130";
    const base = document.createElement("base");

    if (location.hostname.includes("github.io")) {
        base.href = `/${repoName}/`;
    } else {
        base.href = `/`;
    }

    document.head.appendChild(base);

    // Load navigation
    fetch("nav.html")
        .then(response => {
            if (!response.ok) throw new Error("Nav not found");
            return response.text();
        })
        .then(data => {
            const nav = document.getElementById("nav");
            nav.innerHTML = data;

            // Remove link for current page
            const currentPath = window.location.pathname.replace(/\/$/, ""); // remove trailing slash
            const navLinks = nav.querySelectorAll("a");

            navLinks.forEach(link => {
                const linkPath = new URL(link.getAttribute("href"), window.location.href).pathname.replace(/\/$/, "");
                if (linkPath === currentPath) {
                    link.remove();
                }
            });
        })
        .catch(err => console.error(err));

    // Load footer
    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer not found");
            return response.text();
        })
        .then(data => {
            document.getElementById("footerContent").innerHTML = data;
        })
        .catch(err => console.error(err));

});