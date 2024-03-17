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
    const loginModalElement = document.getElementById("login-modal");
    const loginModal = bootstrap.Modal.getInstance(loginModalElement);

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
                return response.text();
            }
        })
        .then((data) => {
            if (data === "true") { 
                loginModal.hide();
                displayPage("app");
                displayToast('Connection successful !', 'You are now logged in.', 'success')
            } else {
                displayError("Wrong mail or password.", 'login-modal-error-ctn');
                displayToast('Connection failed !', 'An error has occured.', 'error')
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function logout() {
    fetch("/../src/disconnect.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }).then((response) => {
        if (!response.ok || response.status !== 200) {
            throw new Error("Backend response failed.");
            displayToast('Backend error', 'Please try again later.', 'error')
        } else {
            displayPage("home");
            displayToast('Logout successful', 'You are now logged out.', 'success')
            return response.text();
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
