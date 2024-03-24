import { modifySelectedTaskId } from "./../app.js";
import { displayToast } from "../display.js";
import { resetTaskCategories } from "./../app.js";

export class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #categories;
    #html;
    #priorityHtml;

    constructor(id, title, description, dueDate, priority, categories) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.categories = categories;
        this.deletionConfirmModalHtml = `
            <div class="modal fade" id="delete-task-modal${this.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete a task</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this task?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" id="delete-task-confirm-btn${this.id}">Yes</button>
                    </div>
                    </div>
                </div>
            </div>`;
        this.html = `
                <div class="d-flex">
                    <button id="task-${this.id}" type="button" class="d-inline list-group-item list-group-item-action d-flex justify-content-between" aria-current="true"  
                    data-bs-toggle="modal" data-bs-target="#task-details-modal">
                        <div id="task${this.id}-priority"></div>
                        <div id="task${this.id}-title" class="me-auto ms-2">${this.title}</div>
                        <div id="task${this.id}-date" class="ms-auto">${this.dueDate}</div>
                    </button>
                    <div class="d-inline ms-2 mt-2" id="reverseCheck${this.id}-ctn">
                        <span data-bs-toggle="tooltip" data-bs-title="Delete this task">
                            <img id="reverseCheck${this.id}" src="./../assets/imgs/trash.svg" alt="Delete icon" width="20px" height="20px" class="d-inline" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#delete-task-modal${this.id}">
                        </span>
                    </div>
                </div>
            `;
        if (this.priority == 1) {
            this.priorityHtml = `<span class="badge text-bg-success">Normal</span>`;
        } else if (this.priority == 2) {
            this.priorityHtml = `<span class="badge text-bg-warning">Important</span>`;
        } else if (this.priority == 3) {
            this.priorityHtml = `<span class="badge text-bg-danger">Urgent</span>`;
        }
        this.displayTask();
        document.getElementById(`task-${this.id}`).addEventListener("click", () => {
            resetTaskCategories();
            this.modifyModal();
            modifySelectedTaskId(this.id);
        });
        document.body.insertAdjacentHTML("beforeend", this.deletionConfirmModalHtml);
        document.getElementById(`delete-task-confirm-btn${this.id}`).addEventListener("click", () => {
            this.deleteTask();
        });
        
        // Tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
    //#region Getters and Setters

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    get priority() {
        return this.#priority;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    get categories() {
        return this.#categories;
    }

    set categories(categories) {
        this.#categories = categories;
    }

    get html() {
        return this.#html;
    }

    set html(html) {
        this.#html = html;
    }

    get priorityHtml() {
        return this.#priorityHtml;
    }

    set priorityHtml(priorityHtml) {
        this.#priorityHtml = priorityHtml;
    }

    //#endregion

    displayTask() {
        let taskContainer = document.getElementById("taskContainer");
        taskContainer.insertAdjacentHTML("beforeend", this.html);
        document.getElementById(`task${this.id}-priority`).innerHTML = this.priorityHtml;
    }

    modifyModal() {
        let modal = document.getElementById("task-details-modal");
        modal.querySelector("#taskDetailsLabel").textContent = `Task : ${this.title}`;
        modal.querySelector("#task-modal-priority").innerHTML = `Priority : ${this.priorityHtml}`;
        modal.querySelector("#task-modal-dueDate").textContent = `Due date : ${this.dueDate}`;
        modal.querySelector("#task-modal-categories").textContent = `Categories : ${this.categories}`;
        modal.querySelector("#task-modal-description").textContent = `Description : ${this.description}`;
    }

    displayDeleteConfirmation() {
        let modalElement = document.getElementById("delete-task-modal");
        modalElement.show();
    }

    deleteTask() {
        fetch("./../../../src/deleteTask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                id: this.id,
            }),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw new Error("Backend response was not ok");
                } else {
                    return response.text();
                }
            })
            .then((data) => {
                document.getElementById(`task-${this.id}`).remove();
                document.getElementById(`reverseCheck${this.id}-ctn`).remove();
                displayToast("Task deleted", "The task has been deleted.", "success");
            })
            .catch((error) => {
                console.error("Error:", error);
                // displayToast("Backend error", "Please try again later.", "error");
            });

        let deleteModalElement = document.getElementById(`delete-task-modal${this.id}`);
        let deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
        deleteModal.hide();
    }
}
