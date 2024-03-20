import {logout, login} from "./auth.js";
import {addTask} from "./app.js";
import {fetchCategories} from "./app.js";
import { displayTaskList } from "./taskList.js";
import {checkField, signup} from "./signup-form.js";

export function displayPage(page) {
    const mainElement = document.querySelector("main");
    const navbarContent = document.getElementById("navbarSupportedContent");
    let componentPath;
    let navbarButtons;

    // Switch component path
    switch (page) {
        case "app":
            componentPath = "./../components/app.php";
            navbarButtons =
                `<button type="button" class="btn btn-secondary m-1 ms-auto" data-bs-toggle="modal" data-bs-target="#settings-modal"">Settings</button>
                <button type="button" class="btn btn-danger m-1" id="log-out-button">Log out</button>`;
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
            if (page === "app") {
                document.getElementById("addTaskButton").addEventListener("click", addTask);
                document.getElementById("log-out-button").addEventListener("click", logout);
                document.getElementById("add-task-button").addEventListener("click", fetchCategories);
                displayTaskList();
            } else if (page === "home") {
                document.getElementById("login-button").addEventListener("click", login);
                document.getElementById("signup-button").addEventListener("click", signup);
                document.getElementById("inputLastName").addEventListener("change", function () {
                    console.log("hello");
                    checkField("inputLastName");
                });
            }
        });
}

export function displayError(message, errorContainer) {
    let errorElement = document.getElementById(errorContainer);
    errorElement.classList.remove("d-none");
    errorElement.textContent = message;

    let loginModalElement = document.getElementById("login-modal");
    loginModalElement.addEventListener("hidden.bs.modal", function () {
        document.getElementById("login-modal-error-ctn").classList.add("d-none");
    })
}

export function displaySignupError(message, fieldId) {
    if (!document.getElementById(`${fieldId}-error-ctn`)) {
        const errorContainer = `<div class="alert alert-danger p-2 mt-2" role="alert" id="${fieldId}-error-ctn"></div>`;
        document.getElementById(fieldId).insertAdjacentHTML("afterend", errorContainer);
    }
    document.getElementById(`${fieldId}-error-ctn`).textContent = message;
}

export function displayToast(title, message, type) {
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
