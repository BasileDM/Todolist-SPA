import { displaySignupError, displayToast } from "./display";
import { displayTaskList } from "./taskList";

let selectedTaskId;
let taskCategories = [];

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
                        console.log(taskCategories);
                    } else {
                        const index = taskCategories.indexOf(category.ID);
                        if (index > -1) {
                            taskCategories.splice(index, 1);
                            console.log(taskCategories);
                        }
                    }
                });
            });
        });
}

function checkTaskForm() {
    const title = document.querySelector("#taskTitle").value;
    const description = document.querySelector("#taskDescription").value;
    const dueDate = document.querySelector("#taskDueDate").value;
    const priority = document.querySelector("#taskPriority").value;

    if (title.length < 3 || title.length > 50) {
        displaySignupError("Title must be between 3 and 50 characters long.", "taskTitle");
        return false;
    }

    if (description.length < 3 || description.length > 50) {
        displaySignupError("Description must be between 3 and 50 characters long.", "taskDescription");
        return false;
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
                console.log(`Result of adding task : ${data}`);
                displayTaskList();
                displayToast("Task added", "A new task has been created.", "success");
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
                        console.log(taskCategories);
                    } else {
                        const index = taskCategories.indexOf(category.ID);
                        if (index > -1) {
                            taskCategories.splice(index, 1);
                            console.log(taskCategories);
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
    let titleValue = document.querySelector("#taskTitleEdit") ? document.querySelector("#taskTitleEdit").value : null;
    let descriptionValue = document.querySelector("#taskDescriptionEdit") ? document.querySelector("#taskDescriptionEdit").value : null;
    let dueDateValue = document.querySelector("#taskDueDateEdit") ? document.querySelector("#taskDueDateEdit").value : null;
    let priorityValue = document.querySelector("#taskPriorityEdit") ? document.querySelector("#taskPriorityEdit").value : null;
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
            console.log(`Result of editing task : ${data}`);
            displayTaskList();
            displayToast("Task edited", "The task has been edited.", "success");
            closeEditTaskModal();
        })
        .catch((error) => {
            console.error("Error:", error);
            displayToast("Error", "Something went wrong. Please try again later.", "error");
        });
}

export function modifySelectedTaskId(taskId) {
    selectedTaskId = taskId;
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
    let firstNameValue = document.querySelector("#firstNameEdit") ? document.querySelector("#firstNameEdit").value : null;
    let emailValue = document.querySelector("#emailEdit") ? document.querySelector("#emailEdit").value : null;
    let currentPassValue = document.querySelector("#passwordEditCurrent") ? document.querySelector("#passwordEditCurrent").value : null;
    let newPassValue = document.querySelector("#passwordEditNew") ? document.querySelector("#passwordEditNew").value : null;
    let confirmPassValue = document.querySelector("#passwordEditConfirm") ? document.querySelector("#passwordEditConfirm").value : null;
}

window.onload = function () {
    taskCategories = [];
};
