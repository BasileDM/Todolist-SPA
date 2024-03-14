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

function login() {
    const email = document.getElementById("inputLoginEmail").value;
    const password = document.getElementById("inputLoginPassword").value;
    fetch("/src/authentication.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email,
        password: password,
        }),
    })
        .then((response) => {
            if (!response.ok || response.status !== 200) {
                throw new Error("Backend response failed.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// App initialization
document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});
