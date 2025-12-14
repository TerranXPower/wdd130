// Set a base URL for GitHub Pages vs local
const repoName = "wdd130";
const base = document.createElement("base");

if (location.hostname.includes("github.io")) {
    base.href = `/${repoName}/`;
} else {
    base.href = `/`;
}

document.head.appendChild(base);

// Function to normalize paths (removes trailing slash)
function normalizePath(path) {
    return path.replace(/\/$/, "");
}

// Load navigation
fetch("nav.html")
    .then(response => {
        if (!response.ok) throw new Error("Nav not found");
        return response.text();
    })
    .then(data => {
        const nav = document.getElementById("nav");
        nav.innerHTML = data;

        // Determine current path for nav link removal
        let currentPath = normalizePath(window.location.pathname);

        // Treat blank repo root as index.html
        if (currentPath === `/${repoName}` || currentPath === `/${repoName}/`) {
            currentPath = `/${repoName}/index.html`;
        }

        const navLinks = nav.querySelectorAll("a");
        navLinks.forEach(link => {
            let linkPath = new URL(link.getAttribute("href"), window.location.href).pathname;
            linkPath = normalizePath(linkPath);
            if (linkPath === currentPath) {
                link.remove(); // remove current page link
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