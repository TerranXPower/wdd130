document.addEventListener("DOMContentLoaded", function () {

    // Set base for GitHub Pages or local
    const repoName = "wdd130";
    const base = document.createElement("base");

    if (location.hostname.includes("github.io")) {
        base.href = `/${repoName}/`;
    } else {
        base.href = `/`;
    }

    document.head.appendChild(base);

    // Load navigation relative to base.href
    fetch(base.href + "nav.html")
        .then(response => {
            if (!response.ok) throw new Error("Nav fetch failed");
            return response.text();
        })
        .then(data => {
            const nav = document.getElementById("nav");
            nav.innerHTML = data;

            const currentPath = window.location.pathname; // full path of current page
            const navLinks = nav.querySelectorAll("a");

            navLinks.forEach(link => {
                const linkPath = new URL(link.getAttribute("href"), window.location.origin).pathname;
                if (linkPath === currentPath) {
                    link.remove(); // remove only the current page link
                }
            });
        })
        .catch(err => console.error("Failed to load nav:", err));

    // Load footer relative to base.href
    fetch(base.href + "footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer fetch failed");
            return response.text();
        })
        .then(data => {
            document.getElementById("footerContent").innerHTML = data;
        })
        .catch(err => console.error("Failed to load footer:", err));

});