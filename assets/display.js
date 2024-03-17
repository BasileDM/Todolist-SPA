function displayPage(page) {
    const mainElement = document.querySelector("main");
    const navbarContent = document.getElementById("navbarSupportedContent");
    let componentPath;
    let navbarButtons;

    // Switch component path
    switch (page) {
        case "app":
            componentPath = "./../components/app.php";
            navbarButtons =
                '<button type="button" class="btn btn-secondary m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#settings-modal"">Settings</button><button type="button" class="btn btn-danger m-1" onclick="logout()">Log out</button>';
            break;
        case "home":
            componentPath = "./../components/signup-section.html";
            navbarButtons =
                '<button type="button" class="btn btn-success m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#login-modal">Log in</button>';
            break;
    }
    navbarContent.innerHTML = navbarButtons;

    // Fetch component for main
    fetch(componentPath, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("App component not found.");
            } else {
                return response.text();
            }
        })
        .then((data) => {
            mainElement.innerHTML = data;
        });
}

function displayError(message, errorContainer) {
    const errorElement = document.getElementById(errorContainer);
    errorElement.textContent = message;
}

function displayToast(title, message, type) {
    const toastElement = document.getElementById("toast");
    switch (type) {
        case "success":
            toastElement.classList.remove("bg-danger");
            toastElement.classList.add("bg-success");
            break;
        case "error":
            toastElement.classList.remove("bg-success");
            toastElement.classList.add("bg-danger");
            break;
        default:
            break;
    }
    const toastHeader = document.querySelector(".toast-header>strong");
    toastHeader.textContent = title;
    const toastBody = document.querySelector(".toast-body");
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(document.getElementById("toast"));
    toast.show();
}
