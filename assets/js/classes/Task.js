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
        this.html = `
            <button id="myButton" type="button" class="list-group-item list-group-item-action d-flex justify-content-between" aria-current="true">
                <div id="task${this.id}-priority">
                </div>
                <div class="form-check form-check-reverse form-check-inline">
                    <input class="form-check-input" type="checkbox" value="" id="reverseCheck1">
                    <label class="form-check-label" for="reverseCheck1">Validate :</label>
                </div>
            </button>`;
        if (this.priority == 1) {
            this.priorityHtml = `<span class="badge text-bg-success">Normal</span>${this.title} ${this.id}`;
        } else if (this.priority == 2) {
            this.priorityHtml = `<span class="badge text-bg-warning">Important</span>${this.title} ${this.id}`;
        } else if (this.priority == 3) {
            this.priorityHtml = `<span class="badge text-bg-danger">Urgent</span>${this.title} ${this.id}`;
        }   
        this.displayTask();
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

    //#endregion

    displayTask() {
        let taskContainer = document.getElementById("taskContainer");
        taskContainer.innerHTML += this.html;
        document.getElementById(`task${this.id}-priority`).innerHTML = this.priorityHtml;
    }
}
