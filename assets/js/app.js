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
        })
        .catch((error) => {
            console.error("Error:", error);
            displayToast("Error", "Something went wrong. Please try again later.", "error");
        });
}

export function modifySelectedTaskId(taskId) {
    selectedTaskId = taskId;
}

window.onload = function () {
    taskCategories = [];
};
