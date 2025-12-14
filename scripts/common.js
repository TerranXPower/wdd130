document.addEventListener("DOMContentLoaded", function () {

    fetch("/nav.html")
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

    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footerContent").innerHTML = data;
        });

});