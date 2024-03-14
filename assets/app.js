const mainElement = document.querySelector("main");
const navbarContent = document.getElementById("navbarSupportedContent");

function checkAuthStatus() {
    fetch("./../src/checkAuth.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Backend response was not ok.");
            } else {
                return response.text();
            }
        })
        .then((data) => {
            if (data === "true") {
                displayPage("app");
            } else {
                displayPage("home");
            }
        });
}

function displayPage(page) {
    // Switch component path
    let componentPath;
    let navbarButtons;

    switch (page) {
        case "app":
            componentPath = "./../components/app.php";
            navbarButtons =
                '<button type="button" class="btn btn-secondary m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#settings-modal"">Settings</button><button type="button" class="btn btn-danger m-1">Log out</button>';
            break;
        case "home":
            componentPath = "./../components/signup-section.html";
            navbarButtons =
                '<button type="button" class="btn btn-success m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#login-modal">Log in</button>';
            break;
    }
    navbarContent.innerHTML = navbarButtons;

    // Fetch component
    fetch(componentPath, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("app component not found.");
            } else {
                return response.text();
            }
        })
        .then((data) => {
            mainElement.innerHTML = data;
        });
}

// App initialization
document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});
