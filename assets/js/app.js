import { displayPage, displaySignupError, displayToast } from "./display.js";
import { displayTaskList } from "./task-list.js";

let selectedTaskId;
let taskCategories = [];
let taskEditCategories = [];

export function fetchCategories() {
    taskCategories = [];
    fetch("./../src/getCategories.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Categories not found.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            const categoriesElement = document.querySelector("#taskCategory");
            categoriesElement.innerHTML = "";
            data.forEach((category) => {
                const inputId = `btn-check-${category.ID}`;
                const labelFor = `btn-check-${category.ID}`;
                const input = `<input type="checkbox" class="btn-check" id="${inputId}" autocomplete="off">`;
                const label = `<label class="btn" for="${labelFor}">${category.NAME}</label>`;
                categoriesElement.insertAdjacentHTML("beforeend", input);
                categoriesElement.insertAdjacentHTML("beforeend", label);

                const inputElement = document.querySelector(`#${inputId}`);

                inputElement.addEventListener("change", function () {
                    if (inputElement.checked) {
                        taskCategories.push(category.ID);
                    } else {
                        const index = taskCategories.indexOf(category.ID);
                        if (index > -1) {
                            taskCategories.splice(index, 1);
                        }
                    }
                });
            });
        });
}

function checkTaskForm() {
    const title = document.querySelector("#taskTitle").value;
    const description = document.querySelector("#taskDescription").value;

    if (title.length < 3 || title.length > 50) {
        displaySignupError("Title must be between 3 and 50 characters long.", "taskTitle");
        return false;
    }

    if (description.length < 3 || description.length > 50) {
        displaySignupError("Description must be between 3 and 50 characters long.", "taskDescription");
        return false;
    }
    if (document.getElementById("taskTitle-error-ctn")) {
        document.getElementById("taskTitle-error-ctn").classList.add("d-none");
    }

    if (document.getElementById("taskDescription-error-ctn")) {
        document.getElementById("taskDescription-error-ctn").classList.add("d-none");
    }

    return true;
}

export function addTask() {
    if (!checkTaskForm()) {
        return;
    } else {
        fetch("/src/addTask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: document.querySelector("#taskTitle").value,
                description: document.querySelector("#taskDescription").value,
                dueDate: document.querySelector("#taskDueDate").value,
                priority: document.querySelector("#taskPriority").value,
                categories: taskCategories,
            }),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw new Error("Backend response was not ok.");
                } else {
                    return response.text();
                }
            })
            .then((data) => {
                switch (data) {
                    case "Title length should be between 3 and 50 characters":
                        displayToast("Error", `${data}`, "error");
                        break;
                    case "Description length should be between 3 and 255 characters":
                        displayToast("Error", `${data}`, "error");
                        break;
                    case "A date is required":
                        displayToast("Error", `${data}`, "error");
                        break;
                    case "Please select a priority":
                        displayToast("Error", `${data}`, "error");
                        break;
                    case 'success':
                        displayToast("Task added", "A new task has been created.", "success");
                        break;
                    default:
                        displayToast("Error", "Something went wrong. Please try again later.", "error");
                        break;
                }
                displayTaskList();
            })
            .catch((error) => {
                console.error("Error:", error);
                displayToast("Error", "Something went wrong. Please try again later.", "error");
            });
    }
}

export function editTitle() {
    let titleField = document.getElementById("taskDetailsLabel");
    titleField.innerHTML = `
        <div class="mb-3">
            <label for="taskTitleEdit" class="form-label">Title</label>
            <input type="text" class="form-control" id="taskTitleEdit" placeholder="Task title here..." data-bs-theme="dark">
        </div>`;
}

export function editPriority() {
    let priorityField = document.getElementById("task-modal-priority");
    priorityField.innerHTML = `
        <div class="mb-3">
            <label for="taskPriorityEdit" class="form-label">Priority</label>
            <select class="form-control" id="taskPriorityEdit" data-bs-theme="dark">
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
            </select>
        </div>`;
}

export function editDate() {
    let dateField = document.getElementById("task-modal-dueDate");
    dateField.innerHTML = `
        <div class="mb-3">
            <label for="taskDueDateEdit" class="form-label">Due date</label>
            <input type="date" class="form-control" id="taskDueDateEdit" data-bs-theme="dark">
        </div>`;
}

export function editCategory() {
    let categoryField = document.getElementById("task-modal-categories");
    categoryField.innerHTML = `
        <div class="mb-3">
            <label for="taskCategoryEdit" class="form-label">Categories</label>
            <div class="mb-3 card-group flex-row flex-wrap" id="taskCategoryEdit"></div>
        </div>`;

    taskCategories = [];
    fetch("./../src/getCategories.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Categories not found.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            const categoriesElement = document.querySelector("#taskCategoryEdit");
            categoriesElement.innerHTML = "";
            data.forEach((category) => {
                const inputId = `btn-check-${category.ID + 100}`;
                const labelFor = `btn-check-${category.ID + 100}`;
                const input = `<input type="checkbox" class="btn-check" id="${inputId}" autocomplete="off">`;
                const label = `<label class="btn" for="${labelFor}">${category.NAME}</label>`;
                categoriesElement.insertAdjacentHTML("beforeend", input);
                categoriesElement.insertAdjacentHTML("beforeend", label);

                const inputElement = document.querySelector(`#${inputId}`);

                inputElement.addEventListener("change", function () {
                    if (inputElement.checked) {
                        taskCategories = [...taskCategories, category.ID];
                    } else {
                        const index = taskCategories.indexOf(category.ID);
                        if (index > -1) {
                            taskCategories.splice(index, 1);
                        }
                    }
                });
            });
        });
}

export function editDescription() {
    let descriptionField = document.getElementById("task-modal-description");
    descriptionField.innerHTML = `
        <div class="mb-3">
            <label for="taskDescriptionEdit" class="form-label">Description</label>
            <input type="text" class="form-control" id="taskDescriptionEdit" placeholder="Task description here..." data-bs-theme="light">
        </div>`;
}

export function saveChanges() {
    // Get form values if they exist or set them to null
    let titleValue = document.querySelector("#taskTitleEdit") ? document.querySelector("#taskTitleEdit").value : null;
    let descriptionValue = document.querySelector("#taskDescriptionEdit")
        ? document.querySelector("#taskDescriptionEdit").value
        : null;
    let dueDateValue = document.querySelector("#taskDueDateEdit")
        ? document.querySelector("#taskDueDateEdit").value
        : null;
    let priorityValue = document.querySelector("#taskPriorityEdit")
        ? document.querySelector("#taskPriorityEdit").value
        : null;

    fetch("/../../src/editTask.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            id: selectedTaskId,
            title: titleValue,
            description: descriptionValue,
            dueDate: dueDateValue,
            priority: priorityValue,
            categories: taskCategories,
        }),
    })
        .then((response) => {
            if (!response.ok || response.status !== 200) {
                throw new Error("Backend response was not ok.");
            } else {
                return response.text();
            }
        })
        .then((data) => {
            switch (data) {
                case "Title must be between 3 and 50 characters":
                    displayToast("Error", `${data}`, "error");
                    break;
                case "Description must be between 3 and 255 characters":
                    displayToast("Error", `${data}`, "error");
                    break;
                case "success":
                    displayTaskList();
                    displayToast("Task edited", "The task has been edited.", "success");
                    closeEditTaskModal();
                    break;
                default:
                    displayToast("Error", "Something went wrong. Please try again later.", "error");
                    break;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            displayToast("Error", "Something went wrong. Please try again later.", "error");
        });
}

export function restoreAccountModal() {
    const originalHtml = `
    <div class="modal fade" id="settings-modal" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="settingsModalLabel">Account settings</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-settings-modal-cross"></button>
                </div>
                <div class="modal-body">
                    <div class="list-group list-group-flush" id="task-modal-details-ctn">
                        <div class="list-group-item" id="task-modal-priority-ctn">
                            <span data-bs-toggle="tooltip" data-bs-title="Edit last name">
                                <img id="edit-last-name" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                            </span>
                            <p id="settings-modal-last-name" class="d-inline">Last name : </p>
                        </div>
                        <div class="list-group-item">
                            <span data-bs-toggle="tooltip" data-bs-title="Edit first name">
                                <img id="edit-first-name" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                            </span>
                            <p id="settings-modal-first-name" class="d-inline">First name : </p>
                        </div>
                        <div class="list-group-item">
                            <span data-bs-toggle="tooltip" data-bs-title="Edit mail">
                                <img id="edit-mail" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                            </span>
                            <p id="settings-modal-mail" class="d-inline">Mail : </p>
                        </div>
                        <div class="list-group-item">
                            <span data-bs-toggle="tooltip" data-bs-title="Modify your password">
                                <img id="edit-password" src="./../assets/imgs/edit.svg" alt="Edit icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;">
                            </span>
                            <p id="settings-modal-password" class="d-inline">Change password</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="delete-account" type="button" class="btn btn-danger me-auto" data-bs-toggle="modal" data-bs-target="#delete-account-confirm-modal">Delete account</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-settings-modal">Close</button>
                    <button id="save-account-changes" type="button" class="btn btn-success">Save changes</button>
                </div>
            </div>
        </div>
    </div>`;
    let modal = document.getElementById("settings-modal");
    modal.outerHTML = originalHtml;
    modifyAccountModal();
    document.getElementById("edit-last-name").addEventListener("click", editLastName);
    document.getElementById("edit-first-name").addEventListener("click", editFirstName);
    document.getElementById("edit-mail").addEventListener("click", editEmail);
    document.getElementById("edit-password").addEventListener("click", editPassword);
    document.getElementById("save-account-changes").addEventListener("click", saveAccountChanges);
    displayPage("app");
}

export function modifySelectedTaskId(taskId) {
    selectedTaskId = taskId;
}

export function resetTaskCategories() {
    taskCategories = [];
}

function closeEditTaskModal() {
    const editTaskModalElement = document.getElementById("task-details-modal");
    const editTaskModal = bootstrap.Modal.getInstance(editTaskModalElement);
    editTaskModal.hide();
}

export function modifyAccountModal() {
    const settingsModal = document.getElementById("settings-modal");

    fetch("/../../src/getUser.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok || response.status !== 200) {
                throw new Error("Backend response was not ok.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            settingsModal.querySelector("#settings-modal-last-name").textContent = `Last name : ${data.LAST_NAME}`;
            settingsModal.querySelector("#settings-modal-first-name").innerHTML = `First name : ${data.FIRST_NAME}`;
            settingsModal.querySelector("#settings-modal-mail").textContent = `Email : ${data.MAIL}`;
            settingsModal.querySelector("#settings-modal-password").textContent = `Change Password`;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export function editLastName() {
    let titleField = document.getElementById("settings-modal-last-name");
    titleField.innerHTML = `
        <div class="mb-3">
            <label for="lastNameEdit" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastNameEdit" placeholder="Last name here..." data-bs-theme="dark">
        </div>`;
}

export function editFirstName() {
    let titleField = document.getElementById("settings-modal-first-name");
    titleField.innerHTML = `
        <div class="mb-3">
            <label for="firstNameEdit" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstNameEdit" placeholder="First name here..." data-bs-theme="dark">
        </div>`;
}

export function editEmail() {
    let titleField = document.getElementById("settings-modal-mail");
    titleField.innerHTML = `
        <div class="mb-3">
            <label for="emailEdit" class="form-label">Email</label>
            <input type="email" class="form-control" id="emailEdit" placeholder="Email here..." data-bs-theme="dark">
        </div>`;
}

export function editPassword() {
    let titleField = document.getElementById("settings-modal-password");
    titleField.innerHTML = `
        <div class="mb-3">
            <label for="passwordEditCurrent" class="form-label">Current Password</label>
            <input type="password" class="form-control" id="passwordEditCurrent" placeholder="Current Password..." data-bs-theme="dark">
        </div>
        <div class="mb-3">
            <label for="passwordEditNew" class="form-label">New Password</label>
            <input type="password" class="form-control" id="passwordEditNew" placeholder="New Password here..." data-bs-theme="dark">
        </div>
        <div class="mb-3">
            <label for="passwordEditConfirm" class="form-label">Confirm password</label>
            <input type="password" class="form-control" id="passwordEditConfirm" placeholder="Confirm new password..." data-bs-theme="dark">
        </div>`;
}

export function saveAccountChanges() {
    let lastNameValue = document.querySelector("#lastNameEdit") ? document.querySelector("#lastNameEdit").value : null;
    let firstNameValue = document.querySelector("#firstNameEdit")
        ? document.querySelector("#firstNameEdit").value
        : null;
    let emailValue = document.querySelector("#emailEdit") ? document.querySelector("#emailEdit").value : null;
    let currentPassValue = document.querySelector("#passwordEditCurrent")
        ? document.querySelector("#passwordEditCurrent").value
        : null;
    let newPassValue = document.querySelector("#passwordEditNew")
        ? document.querySelector("#passwordEditNew").value
        : null;
    let confirmPassValue = document.querySelector("#passwordEditConfirm")
        ? document.querySelector("#passwordEditConfirm").value
        : null;

    fetch("/../../src/editUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lastName: lastNameValue,
            firstName: firstNameValue,
            email: emailValue,
            currentPass: currentPassValue,
            newPass: newPassValue,
            confirmPass: confirmPassValue,
        }),
    })
        .then((response) => {
            if (!response.ok || response.status !== 200) {
                throw new Error("Backend response was not ok.");
            } else {
                return response.text();
            }
        })
        .then((data) => {
            if (data == "success") {
                displayToast("Account edited", "Your account has been edited.", "success");
            } else if (data == "Wrong password") {
                displayToast("Account not edited", "Wrong password.", "error");
            } else if (data == "Passwords do not match") {
                displayToast("Account not edited", "Passwords don't match.", "error");
            } else if (data == 'First name must be between 3 and 50 characters') {
                displayToast("Account not edited", `${data}`, "error");
            } else if (data == 'Last name must be between 3 and 50 characters') {
                displayToast("Account not edited", `${data}`, "error");
            } else if (data == 'Invalid email format') {
                displayToast("Account not edited", `${data}`, "error");
            } else {
                displayToast("An error occurred", "Please try again later.", "error");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    const settingsModal =  document.getElementById("settings-modal");
    const settingsModalInstance = bootstrap.Modal.getInstance(settingsModal);
    restoreAccountModal();
    settingsModalInstance.hide();
}

export function deleteAccount() {
    fetch("../../src/deleteUser.php", {
        method: "GET",
        headers: {
            "Content-Type": "x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok || response.status !== 200) {
                throw new Error("Backend response was not ok.");
            } else {
                return response.text();
            }
        })
        .then((data) => {
            if (data === "success") {
                displayToast("Account deleted", "Your account has been deleted.", "success");
                displayPage("home");
            } else if (data === 'error') {
                displayToast("Account not deleted", "Please try again later.", "error");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

window.onload = function () {
    taskCategories = [];
};
