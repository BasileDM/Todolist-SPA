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
                '<button type="button" class="btn btn-secondary m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#settings-modal"">Settings</button><button type="button" class="btn btn-danger m-1">Log out</button>';
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